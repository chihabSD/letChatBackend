const { comparePasswords } = require("../../helpers/comparePasswords");
const bcrypt = require('bcrypt');

const findUser = require("../../helpers/findUser");
const assigneToken = require("../../middleware/assignToken");
const validateLogin = require("../../validations/login");

require("dotenv").config();

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let incorrect_email_password = " Incorrect email or password";
  try {
    const Validation = await validateLogin(req.body);

    if (Validation.error) {
      return res
        .status(403)
        .send({ message: Validation.error.details[0].message });
    }
    const user = await findUser(email);

    if (!user) {
      return res.status(403).send({ message: incorrect_email_password });
    }

    // Compare Passwords using comparePassword helper
    const validPass = await comparePasswords(password, user.password);
    if (!validPass) {
      return res.status(403).send({ message: incorrect_email_password });
    }
    
    const token = assigneToken.generateToken({ user, expire: "5d" });
    return res.status(200).send({ token,   user });
  
  } catch (e) {
    console.log("error occurred", e);
    return next(e);
  }
};

module.exports = login;
