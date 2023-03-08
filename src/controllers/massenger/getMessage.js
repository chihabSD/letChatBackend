const Message = require("../../models/message");
const Reply = require("../../models/reply");
const getMessage = async (req, res) => {
  const senderId = req.user.user._id;
  const conversationId = req.params.conversationId;
  try {
    let messages = await Message.find({ conversationId })
      .populate("conversationId")
      .populate("senderId")
      .populate("receiverId")
      .populate("receivers")
      .populate("reactions.reactions.by");

    // let replies = await Reply.find({})
    //   .populate({ path: "messageId", populate: { path: "receiverId" } })
    //   .populate("senderId")
    //   .populate("conversationId");

    const replies = await Reply.find({ conversationId })
      .populate({ path: "messageId", populate: { path: "receiverId" } })
      .populate("senderId")
      .populate("receivers")
      .populate("conversationId");

    // return res.status(200).send({ message: reply });

    // let messages = await Message.find({conversationId}).populate('conversationId').populate('senderId').populate('receiverId');

    console.log("get message", replies.length);
    return res.status(200).send({ messages, replies });
  } catch (e) {
    console.log(e);
  }
};

module.exports = getMessage;
