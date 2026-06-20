const { Router } = require("express");
const {
  publicMessagesGet,
  privateMessagesGet,
  sendNewMessagePost,
} = require("../controllers/messagesControllers");

const messagesRouter = Router();

messagesRouter.get("/", publicMessagesGet);
messagesRouter.get("/club", privateMessagesGet);
messagesRouter.post("/club-message", sendNewMessagePost);

module.exports = messagesRouter;
