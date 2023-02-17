const { comparePasswords } = require("../../helpers/comparePasswords");
const findUser = require("../../helpers/findUser");
const assigneToken = require("../../middleware/assignToken");

require("dotenv").config();

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let incorrect_email_password = " Incorrect email or password";
  try {
    // check if user exist
    const user = await findUser(email);

    if (!user) {
      return res.status(403).send({ error: incorrect_email_password });
    }

    //Compare Passwords using comparePassword helper
    const validPass = comparePasswords(password, user.password);
    if (!validPass) {
      return res.status(403).send({ error: incorrect_email_password });
    }
    
    const token = assigneToken.generateToken({ user, expire: "5d" });
    user.save();
    return res.status(200).send({ token, user });
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

module.exports = login;
