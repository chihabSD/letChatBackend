const Conversation = require("../../models/conversation");
const Message = require("../../models/message");

const getConversation = async (req, res) => {
  const senderId = req.user.user._id;
  try {

    // load all conversaation for current user 
    const chats = await Conversation.find({}).populate("users");
    
    // get all messages associated with the conversation Id
    let messagesForFirstConversation = await Message.find({conversationId:chats[0]._id})
    let messages = await Message.find({conversationId:chats[0]._id}).populate('conversationId').populate('senderId').populate('receiverId').populate('reactions.reactions.by');
          let sortedMessages = []
      messages.find(message => {
        if(message.conversationId.equals(chats[0]._id)) {

          sortedMessages.push(message) 
        }
      })
  

      console.log(messagesForFirstConversation.length);

   
    return res.status(200).send({ chats, messages });
  } catch (e) {
    console.log(e);
  }
};

module.exports = getConversation;
