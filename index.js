if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./config/.env" });
}

const express = require("express");
const session = require("express-session");
const { check, validationResult } = require("express-validator");
const csruf = require("csurf");
const xss = require("xss");
const overrideMethod = require("method-override");
const path = require("path");
const cookieParser = require("cookie-parser");
const flash = require("express-flash");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

// configuration
const PORT = process.env.PORT;
const URI = process.env.URI;

// middlewares
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser);
app.use(express.static(path.join(__dirname, "public")));

// ejs configuration
app.set("view engine", "ejs");
app.set("views", "src");

app.listen(PORT, () => {
  console.log("Application listening at :", PORT);
});
