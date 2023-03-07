const Conversation = require("../../models/conversation");
const User = require("../../models/user");

const updateUsersGroup = async (req, res) => {
  const { isAdd, isRemove } = req.body;
  const senderId = req.user.user._id;
  try {
    return res.status(200).send({ user: null });
  } catch (e) {
    // console.log(e.error);
  }
};

module.exports = updateUsersGroup;
