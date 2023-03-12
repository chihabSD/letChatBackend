const User = require("../models/user");
const findUser = async (details) => {
  return await User.findOne({ email: details }).select("-password");
};

module.exports = findUser;