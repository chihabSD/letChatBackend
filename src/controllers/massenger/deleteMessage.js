const Message = require("../../models/message");
const deleteMessage = async (req, res) => {
  const senderId = req.user.user._id;
  const { restore } = req.body;
  const { messageId } = req.params;
  try {
   


    const message = await Message.findOne({ _id: messageId });
    
    if (!message) return console.log("No message found");
    // Restore
    if (restore) {
      const deletionRemoved = message.deletedBy.filter((user) => {
        return user.by != senderId;
      });

      message.deletedBy = [...deletionRemoved];
      message.save();
      return res.status(200).send({ message });
    }


    // Insert user into delete array and mark it as deleted
    const isUserExist = message.deletedBy.find((user) => user.by == senderId);
    if (isUserExist) {
      return res.status(200).send({ message });
    }

    // No user
    message.deletedBy.push({ by: senderId });
    message.save();

    return res.status(200).send({ message });
  } catch (e) {
    console.log(e);
  }
};

module.exports = deleteMessage;
