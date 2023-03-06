const Message = require("../../models/message");
const Conversation = require("../../models/conversation");
const sendMessage = async (req, res) => {
  const senderId = req.user.user._id;
  const { senderName,conversationId,  receiverId, message, type, imageUrl } = req.body;
  try {
    const insertMessage = await Message.create({
      senderName,
      type, imageUrl, 
      senderId,
      message, 
      receiverId,
      conversationId
    });


    // add this message to conversation

    const conversation  = await Conversation.findOne({ _id:  conversationId });
    // latestMessage: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Message",
    // },
    conversation.latestMessage = insertMessage._id

    conversation.save()

    return res.status(200).send({ message:insertMessage });
  } catch (e) {
    console.log(e);
  }
};

module.exports = sendMessage;
