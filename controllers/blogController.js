// this is the blog controller

const blogController = {
  index: (req, res) => {
    res.render("app.ejs");
  },
};

module.exports = blogController;
