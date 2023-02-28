const addToChatList = require("./addToChatList");
const getConversation = require("./getConversation");
const getFriends = require("./getFriends");
const getMessage = require("./getMessage");
const reactToMessage = require("./reactToMessage");
const sendImage = require("./sendImage");
const sendMessage = require("./sendMessage");

module.exports = {
  getFriends,
  sendMessage,
  getMessage,
  sendImage,
  addToChatList,
  getConversation,
reactToMessage
};
