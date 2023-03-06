const Reply = require("../../models/reply");
const replyToMessage = async (req, res) => {
  const senderId = req.user.user._id;
  const { message,  conversationId,  messageId, type, imageUrl } = req.body;
  try {
    const getReply = async (_id) => {
      
    };
   const newReply = new Reply({
    type,
    imageUrl,
    senderId,
    message,
    messageId,
    conversationId
   })


const saved = await newReply.save()
if(saved) {
  const reply = await Reply.findOne({
    _id: newReply._id,
  }).populate({ path: "messageId", populate: { path: "receiverId" } })
    .populate("senderId").populate('conversationId');

  return res.status(200).send({ message: reply });
}
  } catch (e) {
    console.log(e);
  }
};

module.exports = replyToMessage;
