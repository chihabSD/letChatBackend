const Conversation = require("../../models/conversation");
const addToChatList = async (req, res) => {
  const senderId = req.user.user._id;

  const { users, groupName, isGroup } = req.body;
  try {
    if (isGroup) {
      const group = new Conversation({
        type: "group",
        groupName,
        users: users.map((user) => user._id),
        startBy: senderId,
      });

      group.users.push(senderId);
      group.admins.push(senderId);
      const saved = await group.save();
      if (saved) {
        const chat = await Conversation.findOne({ _id: saved._id })
          .populate("users")
          .populate("latestMessage")
          .populate("startBy")
          .populate("admins");
        console.log("The chat", chat);
        return res.status(200).send({ chat });
      }
    }
    const chats = await Conversation.find({ users: [senderId, receiverId] });
    if (chats === undefined || chats.length == 0) {
      const chats = await new Conversation({
        senderId,
        receiverId,
        startBy: senderId,
      });
      chats.users.push(senderId, receiverId);
      chats.save();
      return res.status(200).send({ chats });
    } else {
      return res.status(200).send({ chats });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = addToChatList;
