const User = require("../../models/user");
const getFriends = async (req, res) => {
  try {
      const friends = await User.find({}).select('-password')
      const currentUser = req.user.user
      const filter = friends.filter( user => user._id != currentUser._id)
      return res.status(200).send({ friends : filter});
  } catch (e) {
      console.log(e);
  }
};

module.exports = getFriends;