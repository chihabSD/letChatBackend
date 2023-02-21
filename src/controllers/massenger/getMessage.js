const Message = require("../../models/message");
const getMessage = async (req, res) => {
  const senderId = req.user.user._id;
  const conversationId = req.params.conversationId;
  try {
    let messages = await Message.find({conversationId}).populate('conversationId').populate('senderId').populate('receiverId');
    // getAllMessages = getAllMessages.filter(
    //   (message) =>
    //     (message.senderId == senderId && message.receiverId == fdId) ||
    //     (message.receiverId == senderId && message.senderId == fdId)
    // );

    return res.status(200).send({ messages });
  } catch (e) {
    console.log(e);
  }
};

module.exports = getMessage;
