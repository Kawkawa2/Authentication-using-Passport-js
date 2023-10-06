// Middleware to check if the user is authenticated

function guess(req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash("redirectMsg", "You need to log in to access  that ressource");
    return res.redirect("/login");
  }
  next();
}

// setting global variables for redirecting messages after login and logout
function glbalVariables(req, res, next) {
  res.locals.redirectMsg = req.flash("redirectMsg") || "";
  res.locals.sanitizationErrors = req.flash("sanitizationErrors") || "";
  res.locals.validationErrors = req.flash("validationErrors")[0] || "";
  res.locals.successRedirect = req.flash("success_redirect") || "";
  res.locals.inputBack = req.flash("inputBack")[0] || "";
  next();
}

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}
module.exports = {
  guess: guess,
  glbalVariables: glbalVariables,
  isAuthenticated: isAuthenticated,
};
