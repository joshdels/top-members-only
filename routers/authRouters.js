const passport = require("passport");
const { Router } = require("express");
const {
  signupGet,
  signupPost,
  loginPost,
  loginGet,
  logoutGet,
  clubSecretPost,
} = require("../controllers/authControllers");
const {
  ensureGuest,
  ensureAuthenticated,
} = require("../middleware/authMiddleware");

const authRouter = Router();

authRouter.get("/sign-up", ensureGuest, signupGet);
authRouter.post("/sign-up", ensureGuest, signupPost);
authRouter.get("/log-in", ensureGuest, loginGet);

authRouter.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/club",
    failureRedirect: "/log-in",
    failureMessage: true,
  }),
);

authRouter.get("/log-out", logoutGet);
authRouter.post("/club-secret", ensureAuthenticated, clubSecretPost);

module.exports = authRouter;
