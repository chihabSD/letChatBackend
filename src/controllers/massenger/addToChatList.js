const Conversation = require("../../models/conversation");
const addToChatList = async (req, res) => {
  const senderId = req.user.user._id;

  const { users, groupName, isGroup, receiverId } = req.body;
  try {
    if (isGroup) {
      const group = new Conversation({
        type: "group",
        groupName,
        users: users.map((user) => user._id),
        admins: users.map((user) => user._id),

        startBy: senderId,
      });

      let members = [];
      users.map((user) => {
        members.push({ user: user._id, role: "user" });
      });
      group.members = [...members];

      group.members.unshift({ user: senderId, role: "admin" });
      group.users.unshift(senderId);
      group.admins.unshift(senderId);
      const saved = await group.save();
      if (saved) {
        const chat = await Conversation.findOne({ _id: saved._id })
          .populate("users")
          .populate("latestMessage")
          .populate("startBy")
          .populate("admins")
          .populate("members.user");
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
      chats.members.push({ user: senderId }, { user: receiverId });


      const saved = await chats.save();
      if (saved) {
        const chat = await Conversation.findOne({ _id: saved._id })
          .populate("users")
          .populate("latestMessage")
          .populate("startBy")
          .populate("admins")
          .populate("members.user");
        return res.status(200).send({ chat });
      }

      // return res.status(200).send({ chat: chats });
    } else {
      return res.status(200).send({ chat: chats });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = addToChatList;
