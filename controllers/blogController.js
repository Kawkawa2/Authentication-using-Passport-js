// this is the blog controller
var User = require("../models/userModel");

const blogController = {
  index: (req, res) => {
    res.render("app.ejs", { user: req.user });
  },
};

module.exports = blogController;
