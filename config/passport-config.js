const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const users = require("../public/users.json");

const getUserByEmail = (email) => {
  return users.find((user) => {
    return user.email === email;
  });
};

async function authenticateUser(req, email, password, done) {
  const findUser = getUserByEmail(email);
  req.flash("inputBack", { email });
  if (!findUser) {
    req.flash("validationErrors", "The email entered is not registred");
    return done(null, false);
  }

  // Compare the provided password with the stored user password
  const passwordMatch = await bcrypt.compare(password, findUser.password);
  if (!passwordMatch) {
    req.flash("validationErrors", "Wrong password");
    return done(null, false);
  }
  return done(null, findUser);
}

function initializePassport(passport) {
  passport.use(
    "local-login",
    new localStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      authenticateUser
    )
  );
  // Configure serialization and deserialization of user data
  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    const findUserById = users.find((user) => {
      return user.id === id;
    });
    return done(null, findUserById);
  });
}

module.exports = initializePassport;
