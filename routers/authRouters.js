const passport = require("passport");
const { Router } = require("express");
const {
  signupGet,
  signupPost,
  loginPost,
  loginGet,
  logoutPost,
} = require("../controllers/authControllers");

const authRouter = Router();

authRouter.get("/sign-up", signupGet);
authRouter.post("/sign-up", signupPost);
authRouter.get("/log-in", loginGet);

authRouter.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/club",
    failureRedirect: "/log-in",
    failureMessage: true,
  }),
);

authRouter.get("/log-out", logoutPost);

module.exports = authRouter;
