const Chat = require("../../models/chat");
const addToChatList = async (req, res) => {
  const senderId = req.user.user._id;

  const { receiverId } = req.body;
  try {
    const chats = await Chat.find({ users: [senderId, receiverId] });
    if (chats === undefined || chats.length == 0) {
      const chats = await new Chat({
        senderId,
        receiverId,
      });
      chats.users.push(senderId, receiverId);
      chats.save();
      return res.status(200).send({ chats});
    } else {
      return res.status(200).send({ chats});
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = addToChatList;
