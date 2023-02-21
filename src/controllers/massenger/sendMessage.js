const Message = require("../../models/message");
const sendMessage = async (req, res) => {
  const senderId = req.user.user._id;
  const { senderName,conversationId,  receiverId, message } = req.body;
  try {
    const insertMessage = await Message.create({
      senderName,
      senderId,
      message: {
        text: message,
        image: "",
      },
      receiverId,
      conversationId
    });


    return res.status(200).send({ message:insertMessage });
  } catch (e) {
    console.log(e);
  }
};

module.exports = sendMessage;
