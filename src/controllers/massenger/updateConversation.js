const Conversation = require("../../models/conversation");
const updateConversation = async (req, res) => {
  const senderId = req.user.user._id;
  const { _id } = req.params;
  const { isNameChange, newName } = req.body;
  try {
    // add this message to conversation

    const conversation = await Conversation.findOne({ _id });

    conversation.groupName = newName;
    const newConversaton = await conversation.save();

    const updateConversation = await Conversation.findOne({
      _id: newConversaton,
    });
    return res.status(200).send({ conversation: updateConversation });
  } catch (e) {
    console.log(e);
  }
};

module.exports = updateConversation;
