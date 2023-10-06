const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const initializePassport = require("./config/passport-config");
const middlewares = require("./middleware/authMiddleware");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");

var app = express();

// configuration
const PORT = process.env.PORT;
const URI = process.env.URI;

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// adding static files
app.use(express.static("public"));
app.use(express.static("dist"));
app.use(express.static("node_modules"));

// ejs configuration
app.set("view engine", "ejs");
app.set("views", "src");

//configuring session management
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // also this problem it secure the app i was making it true
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
  })
);
app.use(flash());

// middlewares
app.use(middlewares.glbalVariables);

// initializing passport
app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport);

// routes
app.use("/", require("./routes/userRoute"));
app.use("/", require("./routes/indexRoute"));

// listening
app.listen(PORT, () => {
  console.log("Application listening at :", PORT);
});
