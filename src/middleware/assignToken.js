const jwt = require("jsonwebtoken");
const assigneToken = {};

assigneToken.generateToken = ({ user, expire }) => {
  const secret = process.env.SECRET;
  const token = jwt.sign({ user }, secret, {
    expiresIn: expire,
  });
  return token;
};

module.exports = assigneToken;
