const User = require("../../models/user");

const findUserByUserName = async (req, res) => {
  const senderId = req.user.user._id;
  try {
    const { keyword } = req.params;
    let payload = keyword.trim();
    let data = await User.find({
      username: { $regex: new RegExp("^" + payload + ".*", "i") },
    }).exec();

    // filter current user
    let users = data.filter((user) => user._id != senderId);

    return res.status(200).send({ users });
  } catch (e) {
    // console.log(e.error);
  }
};

module.exports = findUserByUserName;
