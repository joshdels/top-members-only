const db = require("../db/queries");

async function publicMessagesGet(req, res) {
  const messages = await db.getPublicMessages();
  res.render("index", {
    messages: messages,
  });
}

async function privateMessagesGet(req, res) {
  const messages = await db.getPrivateMessages();
  res.render("club", {
    messages: messages,
  });
}

async function sendNewMessagePost(req, res) {
  const { message } = req.body;
  const user_id = req.user.id;

  console.log("user_id", user_id);
  console.log("message", message);

  db.postNewMessage(user_id, message);
  res.redirect("club");
}

module.exports = {
  publicMessagesGet,
  privateMessagesGet,
  sendNewMessagePost,
};
