

const Message = require("../../models/message");
const deleteMessage = async (req, res) => {
  const senderId = req.user.user._id;
  const { messageId } = req.params;
  try {
    // When we want to delete
    // user wants to delete message
    // we have user id, and the message he wants to delete
    // find the message we want to delete
    // insert the user id into the deletedBy array
    // return the message

    //  when we want to restore message
    // we have message id, user id
    // we find message,
    // check if user is in the deleted by list
    // if , remove him and return the messag

    // deletedBy: [
    //     {
    //       by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    //       on:  {type: Date, default: Date.now},
    //     },
    //   ],

    // DELETE MESSAGE FROM CURRENT USER
    console.log(messageId);
    const messsage = await Message.findOne({ _id: messageId });
    if (!messsage) return console.log("No message found");

    messsage.deletedBy.push({ by: senderId });
    messsage.save()


    console.log(message);
  return res.status(200).send({ message });
  } catch (e) {
    console.log(e);
  }
};

module.exports = deleteMessage;
