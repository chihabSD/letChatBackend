const Conversation = require("../../models/conversation");
const udpateUserInConversation = async (req, res) => {
  const senderId = req.user.user._id;
  const { _id } = req.params;
  const { makeAdmin, user } = req.body;

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
    }
    if (makeAdmin) {
      conversation.admins.splice(1, 0, user);

      // let newObject = {
      //     user,
      //     role:'admin'
      //   };
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

            getResult()
        }
      });


    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = udpateUserInConversation;
