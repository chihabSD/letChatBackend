const User = require("../../models/user");

const findUserByUserName = async (req, res) => {
  const senderId = req.user.user._id;
  try {
    const { keyword } = req.params;
console.log(keyword);
    let payload = keyword.trim()
    let data = await User.find({username:{$regex:new RegExp('^' + payload+'.*', 'i')}}).exec()

    console.log(data);
    return res.status(200).send({ users:data });
    
  } catch (e) {
    // console.log(e.error);
  }
};

module.exports = findUserByUserName;
