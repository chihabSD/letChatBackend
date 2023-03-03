const addToChatList = require("./addToChatList");
const deleteMessage = require("./deleteMessage");
const getConversation = require("./getConversation");
const getFriends = require("./getFriends");
const getMessage = require("./getMessage");
const reactToMessage = require("./reactToMessage");
const replyToMessage = require("./replyToMessage");
const sendImage = require("./sendImage");
const sendMessage = require("./sendMessage");

module.exports = {
  getFriends,
  sendMessage,
  getMessage,
  sendImage,
  addToChatList,
  deleteMessage,
  replyToMessage,
  getConversation,
  reactToMessage,
};
