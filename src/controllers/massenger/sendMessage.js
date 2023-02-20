const User = require("../../models/user");
const sendMessage = async (req, res) => {
  try {
    //   const friends = await User.find({}).select('-password')
    //   const currentUser = req.user.user
    //   const filter = friends.filter( user => user._id != currentUser._id)
      return res.status(200).send({ friends : req.body});
  } catch (e) {
      console.log(e);
  }
};

module.exports = sendMessage;