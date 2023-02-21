const Chat = require("../../models/chat");

const addToChatList = async (req, res) => {
  const senderId = req.user.user._id;
  try {
     return res.status(200).send({ messages: 'add to chat'});
  } catch (e) {
    console.log(e);
  }
};

module.exports = addToChatList;
