const Conversation = require("../../models/conversation");

const getConversation = async (req, res) => {
  const senderId = req.user.user._id;
  try {
    const chats = await Conversation.find({})
     return res.status(200).send({ chats});
  } catch (e) {
    console.log(e);
  }
};

module.exports = getConversation;
