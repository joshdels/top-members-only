const db = require("../db/queries");

async function signupGet(req, res) {
  res.render("forms/signup-form");
}

async function signupPost(req, res) {
  const { full_name, userame, password } = req.body;

  await db.postNewUsers(full_name, userame, password);
}

async function loginGet(req, res) {
  res.render("forms/login-form");
}

async function loginPost(req, res) {
  const { userame, password } = req.body;

  //passport.js :)
}

module.exports = {
  signupGet,
  signupPost,
  loginGet,
  loginPost,
};
