const formidable = require("formidable");
const Joi = require("@hapi/joi");
const fs = require("fs");
const path = require("path");
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const register = async (req, res, next) => {
  const form = formidable();
  form.parse(req, async (err, fileds, files) => {
    const { username, email, password, confirmPassword } = fileds;
    const error = [];
    const schema = Joi.object()
      .keys({
        username: Joi.string()
          .required()
          .empty()
          .min(5)
          .max(20)
          .error((errors) => {
            errors.forEach((err) => {
              switch (err.code) {
                case "string.empty":
                  err.message = "Username is required";
                  break;
                case "string.required":
                  err.message = "Username is required";
                  break;
                case "string.min":
                  err.message = "Username must be at least 5 characters long";
                  break;

                case "string.max":
                  err.message = "Username cannot be empty";
                  break;
              }
            });
            return errors;
          }),
        email: Joi.string().min(6).required().email(),

        password: Joi.string().min(3).max(15).required().label("Password"),
        confirmPassword: Joi.any()
          .equal(Joi.ref("password"))
          .required()
          .label("Confirm password")
          .options({ messages: { "any.only": "{{#label}} does not match" } }),
      })
      .options({ allowUnknown: true });

    const Validation = schema.validate(fileds);

    if (Validation.error) {
      return res
        .status(403)
        .send({ message: Validation.error.details[0].message });
    }

    if (Object.keys(files).length === 0) {
       error.push("Please provide your profile photo");
    }
    if (error.length > 0) {
        console.log('error length');
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
        const check = await User.findOne({ email });
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
