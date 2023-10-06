const express = require("express");
var router = express.Router();

// middlewares
const { guess } = require("../middleware/authMiddleware");

// controllers
const blogController = require("../controllers/blogController");

router.get("/", guess, blogController.index);

module.exports = router;
