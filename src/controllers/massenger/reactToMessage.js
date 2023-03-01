const Message = require("../../models/message");
const { ObjectId } = require("mongodb");
const reactToMessage = async (req, res) => {
  const {
    Types: { ObjectId: ObjectId },
  } = require("mongoose");

  const { reaction, reactionId, reactedBy, current, replace } = req.body;
  const id = ObjectId(reactionId);

  try {

    // Get data after update
    const getData = async () => {
      const message = await Message.findOne({
        _id: req.params.messageId,
      }).populate("reactions.reactions.by");
      console.log(message.reactions);
      return res.status(200).send({ message });
    };
    const message = await Message.findOne({
      _id: req.params.messageId,
    }).populate("reactions.reactions.by");


     // Remove curren treaaction
    if (current && !replace) {
      console.log("current but not replace");

      const newS = message.reactions.reactions.filter((reaction) => {
        return reaction.by._id != reactedBy;
      });
      message.reactions.reactions = [...newS];

      message.save((err, result) => {
        if (err) return console.log(err);
        if (result) return getData();
      });
      
      return;
    }

    // replace current reaction
    if (current && replace) {
      let newObject = {
        _id: id,
        by: reactedBy,
        reaction,
      };
      const oldMessage = message.reactions.reactions.filter((reaction) => {
        return reaction.by._id != reactedBy;
      });

      message.reactions.reactions = [...oldMessage];
      message.reactions.reactions.push(newObject);
      message.save((err, result) => {
        if (err) return console.log(err);
        if (result) return getData();
      });

      return;
    }

    // Insert new Item 
    if (!current && !replace) {
      message.reactions.reactions.push({ by: reactedBy, reaction });
      message.save((err, result) => {
        if (err) return console.log(err);
        if (result) return getData();
      });

      return;
    }

    
  } catch (e) {
    console.log(e);
  }
};

module.exports = reactToMessage;
