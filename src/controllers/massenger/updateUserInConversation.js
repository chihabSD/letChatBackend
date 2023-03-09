const Conversation = require("../../models/conversation");
var mongoose = require("mongoose");

const udpateUserInConversation = async (req, res) => {
  const senderId = req.user.user._id;
  const { _id } = req.params;
  const { makeAdmin, user, users, updateType } = req.body;
  // updateType:'addBack',

  try {
    const conversation = await Conversation.findOne({ _id });

    const getResult = async () => {
      const updatedConversation = await Conversation.findOne({ _id })
        .populate("users")
        .populate("latestMessage")
        .populate("startBy")
        .populate("admins")
        .populate("members.user");

      return res.status(200).send({ conversation: updatedConversation });
    };

    // Remove user from the group
    if (updateType === "removeUser") {
  
      var id = mongoose.Types.ObjectId(user);
    // let removed =   conversation.members.map((user) => user.user != id);
    var id = mongoose.Types.ObjectId(user);
    let oldMembers = conversation.members

    let objIndex = conversation.members.findIndex((obj) => obj.user == user);
 


    conversation.members.splice(objIndex, 1);
    
      console.log(objIndex);
      const saved = await conversation.save();

      if (saved) {
        const r = await Conversation.findOne({ _id })
          .populate("users")
          .populate("latestMessage")
          .populate("startBy")
          .populate("admins")
          .populate("members.user");

        return res.status(200).send({ conversation: r });
      }

      return;
    }
    // add user to the group
    if (updateType === "addUsers") {
      let members = [];
      users.map((user) => {
        var id = mongoose.Types.ObjectId(user._id);
        members.push({ user: id, role: "user" });
      });
      let oldConversationMember = conversation.members;
      conversation.members = [...members, ...oldConversationMember];

      const saved = await conversation.save();

      if (saved) {
        const r = await Conversation.findOne({ _id })
          .populate("users")
          .populate("latestMessage")
          .populate("startBy")
          .populate("admins")
          .populate("members.user");

        return res.status(200).send({ conversation: r });
      }

      return;
    }

    // user add himself back
    if (updateType === "addBack") {
      objIndex = conversation.members.findIndex((obj) => obj.user == senderId);
      conversation.members[objIndex].isLeft = false;

      let saved = await conversation.save();
      if (saved) {
        const chat = await Conversation.findOne({ _id: saved._id })
          .populate("users")
          .populate("latestMessage")
          .populate("startBy")
          .populate("admins")
          .populate("members.user");
        return res.status(200).send({ conversation: chat });
      }

      return;
    }

    // Make user admin
    if (updateType === "makeAdmin") {
      conversation.admins.splice(1, 0, user);

      const oldMembers = conversation.members.filter((m) => {
        return m.user != user;
      });

      // conversation.save()
      conversation.members = [...oldMembers];
      // message.reactions.reactions.push(newObject);
      conversation.members.splice(1, 0, { role: "admin", user });
      conversation.save((err, result) => {
        if (err) return console.log(err);
        if (result) {
          getResult();
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = udpateUserInConversation;
