const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const validateRegister = require("../../validations/register");
const findUser = require("../../helpers/findUser");
const register = async (req, res, next) => {
  const form = formidable();
  form.parse(req, async (err, fileds, files) => {
    const { username, email, password, confirmPassword } = fileds;
    const error = [];

    const Validation = await validateRegister(fileds);

    if (Validation.error) {
      return res
        .status(403)
        .send({ message: Validation.error.details[0].message });
    }

    if (Object.keys(files).length === 0) {
      error.push("Please provide your profile photo");
    }
    if (error.length > 0) {
      console.log("error length");
      res.status(400).json({ message: error[0] });
    } else {
      const getImageName = files.image.originalFilename;
      const randomNumber = Math.floor(Math.random() * 99999);
      const newImageName = randomNumber + getImageName;
      files.image.originalFilename = newImageName;

      const newPath = path.join(
        __dirname,
        `/../../../images/${files.image.originalFilename}`
      );

      try {
        const check = await findUser(email);
        if (check)
          return res.status(400).json({
            message:
              "This email address already exists,try with a different email address",
          });

        const cryptedPassword = await bcrypt.hash(password, 12);
        fs.copyFile(files.image.filepath, newPath, async (error) => {
          if (error) {
            console.log(newPath);
          } else {
            const user = await new User({
              username,
              email,
              password: cryptedPassword,
              image: files.image.originalFilename,
            }).save();

            return res.status(200).send({ user });
          }
        });
      } catch (error) {}
    }
  });
};

module.exports = register;
