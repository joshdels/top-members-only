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

async function logoutGet(req, res, next) {
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

async function clubSecretPost(req, res) {
  const { secrets } = req.body;
  const userId = req.user.id;

  if (secrets === "secret?") {
    await db.postUpdateUserStatus(userId, "active");
  } else if (secrets === "admin?") {
    await db.postUpdateUserStatus(userId, "admin");
  }

  res.redirect("/club");
}

module.exports = {
  signupGet,
  signupPost,
  loginGet,
  loginPost,
  logoutGet,
  clubSecretPost,
};
