const { Router } = require("express");
const {
  signupGet,
  signupPost,
  loginPost,
  loginGet,
} = require("../controllers/authControllers");

const authRouter = Router();

authRouter.get("/sign-up", signupGet);
authRouter.post("/sign-up", signupPost);
authRouter.get("/log-in", loginGet);
authRouter.post("/log-in", loginPost);

module.exports = authRouter;
