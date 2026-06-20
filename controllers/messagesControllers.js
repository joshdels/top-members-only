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
    user: req.user,
    messages: messages,
  });
}

async function sendNewMessagePost(req, res) {
  const { message } = req.body;
  const user_id = req.user.id;

  await db.postNewMessage(user_id, message);
  res.redirect("club");
}

async function deleteMessagePost(req, res) {
  const { id } = req.params;
  await db.deleteMessage(id);

  res.redirect("/club");
}

module.exports = {
  publicMessagesGet,
  privateMessagesGet,
  sendNewMessagePost,
  deleteMessagePost,
};
