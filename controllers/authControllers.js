const db = require("../db/queries");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

async function signupGet(req, res) {
  res.render("forms/signup-form");
}

async function signupPost(req, res) {
  const { full_name, username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.postNewUsers(full_name, username, hashedPassword);
  res.redirect("/club");
}

async function loginGet(req, res) {
  res.render("forms/login-form");
}

async function logoutPost(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

async function loginPost(req, res) {
  const { username, password } = req.body;
}

module.exports = {
  signupGet,
  signupPost,
  loginGet,
  loginPost,
  logoutPost,
};
