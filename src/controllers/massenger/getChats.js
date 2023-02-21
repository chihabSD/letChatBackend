const Chat = require("../../models/chat");

const getChatsList = async (req, res) => {
  const senderId = req.user.user._id;
  try {
    const chats = await Chat.find({})
     return res.status(200).send({ chats});
  } catch (e) {
    console.log(e);
  }
};

module.exports = getChatsList;
