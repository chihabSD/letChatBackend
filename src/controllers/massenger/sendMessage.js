const Message = require("../../models/message");
const Conversation = require("../../models/conversation");
const sendMessage = async (req, res) => {
  const senderId = req.user.user._id;
  const {
    conversationId,
    receivers,
    message,
    type,
    conversationsType,
    imageUrl,
  } = req.body;
  try {
    if (conversationsType === "group") {
      const newMessage = new Message({
        type,
        imageUrl,
        senderId,
        message,
        isGroupMessage: conversationsType === 'group' && true,
        conversationId,
      });

      let members = [];
      receivers.map((user) => {
        members.push({ user: user._id });
      });
      newMessage.receivers = [...members];

      const saved = await newMessage.save();

      if (saved) {
        const conversation = await Conversation.findOne({
          _id: conversationId,
        });
        conversation.latestMessage = saved._id;

        conversation.save();

        return res.status(200).send({ message: saved });
      }

    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = sendMessage;
