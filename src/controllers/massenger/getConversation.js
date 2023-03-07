const Conversation = require("../../models/conversation");
const Message = require("../../models/message");
const Reply = require("../../models/reply");

const getConversation = async (req, res) => {
  const senderId = req.user.user._id;
  try {
   
    const chats = await Conversation.find({'users':senderId}).populate("users").populate('latestMessage').populate('startBy').populate('admins')
    let messages = await Message.find({ conversationId: chats[0]._id })
      .populate("conversationId")
      .populate("senderId")
      .populate("receiverId")
      .populate("reactions.reactions.by");

      let replies = await Reply.find({}).populate({path:'messageId', populate:{path:'receiverId'}}).populate('senderId').populate('conversationId')

     

    return res.status(200).send({ chats, messages, replies});
    // return res.status(200).send({ chats:[]});
  } catch (e) {
    console.log(e);
  }
};

module.exports = getConversation;
