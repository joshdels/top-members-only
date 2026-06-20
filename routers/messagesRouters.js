const { Router } = require("express");
const {
  publicMessagesGet,
  privateMessagesGet,
  sendNewMessagePost,
  deleteMessagePost,
} = require("../controllers/messagesControllers");
const { ensureAuthenticated } = require("../middleware/authMiddleware");

const messagesRouter = Router();

messagesRouter.get("/", publicMessagesGet);
messagesRouter.get("/club", ensureAuthenticated, privateMessagesGet);
messagesRouter.post("/club-message", ensureAuthenticated, sendNewMessagePost);
messagesRouter.post(
  "/delete-message/:id",
  ensureAuthenticated,
  deleteMessagePost,
);

module.exports = messagesRouter;
