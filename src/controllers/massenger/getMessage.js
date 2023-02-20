const Message = require("../../models/message");
const getMessage = async (req, res) => {
  const senderId = req.user.user._id;
  const fdId = req.params.id;
  try {
    let getAllMessages = await Message.find({});
    getAllMessages = getAllMessages.filter(
      (message) =>
        (message.senderId == senderId && message.receiverId == fdId) ||
        (message.receiverId == senderId && message.senderId == fdId)
    );

    return res.status(200).send({ messages: getAllMessages });
  } catch (e) {
    console.log(e);
  }
};

module.exports = getMessage;
