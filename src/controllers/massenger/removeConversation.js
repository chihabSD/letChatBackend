const Conversation = require("../../models/conversation");
const User = require("../../models/user");

const removeConversation = async (req, res) => {
  const senderId = req.user.user._id;
  const { _id } = req.params;
 
  try {
    const conversation = await Conversation.deleteOne({ _id });
    console.log(conversation);
    return res.status(200).send({ conversation });
  } catch (e) {
    // console.log(e.error);
  }
};

module.exports = removeConversation;
