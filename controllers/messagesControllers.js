const db = require("../db/queries");

async function publicMessagesGet(req, res) {
  const messages = await db.getPublicMessages();

  console.log(messages);

  res.render("index", {
    messages: messages,
  });
}

async function privateMessagesGet(req, res) {
  const messages = await db.getPrivateMessages();

  console.log(messages);

  res.render("club", {
    messages: messages,
  });
}

async function sendNewMessagePost(req, res) {
  const { message } = req.body;

  db.postNewMessage(user_id, message);

  res.render("club", {
    messages: messages,
  });
}

module.exports = {
  publicMessagesGet,
  privateMessagesGet,
  sendNewMessagePost,
};
