const Conversation = require("../../models/conversation");
const existConversation = async (req, res) => {
  const user = req.user.user._id;
  const { _id } = req.params;

  try {

    const conversation = await Conversation.findOne({ _id });

    // check numbers of admins
    let isOnlyAdmin = conversation.members.filter(
      (member) => member.role === "admin"
    ).length;

    // if only admin
    if (conversation.type === "group" && isOnlyAdmin === 1) {
      // filter requestor
      let filteredArray = conversation.members.filter((i) => i.user != user);

      // pick a random user
      const randomIndex = Math.floor(Math.random() * filteredArray.length);

      // assign admin roel
      filteredArray[randomIndex].role = "admin";

      // shif admins to the top of array
      // filteredArray.some((item, index) => {
      //   item.role == 'admin' && filteredArray.unshift(filteredArray.splice(index, 1)[0])
      // })

      // add the new users to the origianl array
      conversation.members = [...filteredArray];
      conversation.members.unshift({ user, isLeft: true });
      let saved = await conversation.save();
      if (saved) {
        const chat = await Conversation.findOne({ _id: saved._id })
          .populate("users")
          .populate("latestMessage")
          .populate("startBy")
          .populate("admins")
          .populate("members.user");
        return res.status(200).send({ chat });
      }

      return;
    }

    // if more than on admin
    if (conversation.type === "group" && isOnlyAdmin > 1) {
      // Get the index of the user you want to update
      objIndex = conversation.members.findIndex((obj) => obj.user == user);
      conversation.members[objIndex].isLeft = true;
      conversation.members[objIndex].role = "user";

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

    // FOR NORMAL CONVERSATIONS
    objIndex = conversation.members.findIndex((obj) => obj.user == user);
    conversation.members[objIndex].isLeft = true;

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
  } catch (e) {
    console.log(e);
  }
};

module.exports = existConversation;
