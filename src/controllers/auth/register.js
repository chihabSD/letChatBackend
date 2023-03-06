const { AvatarGenerator } = require("random-avatar-generator");
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const validateRegister = require("../../validations/register");
const findUser = require("../../helpers/findUser");
const register = async (req, res, next) => {
  const { username, email, password, gender, phone} = req.body;
  const generator = new AvatarGenerator();
  const Validation = await validateRegister(req.body);

  if (Validation.error) {
    console.log(Validation.error.details[0].message);
    return res
      .status(403)
      .send({ message: Validation.error.details[0].message });
  } else {
    try {
      const check = await findUser(email);
      if (check)
        return res.status(400).json({
          message:
            "This email address already exists,try with a different email address",
        });

      const cryptedPassword = await bcrypt.hash(password, 12);
      const user = await new User({
        username,
        email,
        password: cryptedPassword,
        image: generator.generateRandomAvatar(),
      }).save()

      return res.status(200).send({ user });
     
    } catch (error) {
      
    }
  }
};

module.exports = register;
