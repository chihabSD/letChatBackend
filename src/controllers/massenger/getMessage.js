const Message = require("../../models/message");
const getMessage = async (req, res) => {
  const senderId = req.user.user._id;
  const conversationId = req.params.conversationId;
  try {
    let messages = await Message.find({conversationId}).populate('conversationId').populate('senderId').populate('receiverId');

console.log(messages.length);
    return res.status(200).send({ messages });
  } catch (e) {
    console.log(e);
  }
};

module.exports = getMessage;
