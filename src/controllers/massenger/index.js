const addToChatList = require("./addToChatList");
const getChatsList = require("./getChats");
const getFriends = require("./getFriends");
const getMessage = require("./getMessage");
const sendImage = require("./sendImage");
const sendMessage = require("./sendMessage");

module.exports = {
  getFriends,
  sendMessage,
  getMessage,
  sendImage,
  addToChatList,
  getChatsList,
};
