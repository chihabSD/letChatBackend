const bcrypt = require("bcrypt");
const comparePasswords = async (password, accountPassword) => {
  const result =  await bcrypt.compare(password, accountPassword);
 
  return result
  // const isPasswordMatch = await bcrypt.compare(password, user.password)
};
const saltPassword = async (newPassword) => {
  const salt = await bcrypt.genSalt(11);
  const hashPassword = await bcrypt.hash(newPassword, salt);
  return hashPassword;
};
module.exports = { comparePasswords, saltPassword };
