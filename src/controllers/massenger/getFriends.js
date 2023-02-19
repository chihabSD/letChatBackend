const User = require("../../models/user");
const getFriends = async (req, res) => {
  try {
      const friends = await User.find({}).select('-password')
      return res.status(200).send({ friends });
  } catch (e) {
      // return res.status(500).send({ message:erro });
      console.log(e);
  }
};

module.exports = getFriends;