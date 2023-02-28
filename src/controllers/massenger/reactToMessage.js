const Message = require("../../models/message");
const { ObjectId } = require("mongodb");
const reactToMessage = async (req, res) => {
  const { reaction, reactedBy } = req.body;
  //   messageId:message._id, reactedBy:_id , reaction:emoji
  const _id = ObjectId(req.params.messageId);
  console.log(req.params.messageId);
  //   reaction: {
  //     reactedBy: [
  //       {
  //         type: mongoose.Schema.Types.ObjectId,
  //         ref: "User",
  //       },
  //     ],
  //     reactionType: {
  //       type: String,
  //       default: "text",
  //     },
  //   },

  try {
    // insert new react for user
    // if user exist with a reactionn and update new reaction

    const message = await Message.findOne({ _id: req.params.messageId });

    // find user with reaction
    // if user wants to change
   const userFound =  message.reactions.reactions.find(user => user.by == reactedBy);
   if (userFound) {
    console.log(userFound);
    return res.status(200).send({ message });
  } else {
    message.reactions.reactions.push({ by: reactedBy, reaction });
    message.save();

    // let messages = await Message.find({conversationId}).populate('conversationId').populate('senderId').populate('receiverId');

    // getAllMessages = getAllMessages.filter(
    //   (message) =>
    //     (message.senderId == senderId && message.receiverId == fdId) ||
    //     (message.receiverId == senderId && message.senderId == fdId)
    // );
    // return res.status(200).send({ messages });
    return res.status(200).send({ message });
  }

    // console.log(message.reactions);
    // message.save()
    // await Message.findOne({_id}).then((err, message) => {
    //     if(err){

    //     console.log(err);
    //     return res.status(400).send({ err });
    //     }
    // })
  } catch (e) {
    console.log(e);
  }
};

module.exports = reactToMessage;
