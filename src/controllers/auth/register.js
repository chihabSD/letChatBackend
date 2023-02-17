const formidable = require("formidable");
const validator = require("validator");

const register = async (req, res, next) => {
  const form = formidable();
  form.parse(req, async (err, fileds, files) => {
    // validate fields
    const { username, email, password, confirmPassword } = fileds;
    const { image } = files;
    const error = [];

    if (!username) {
      error.push("Please provide your user name");
    }
    if (!email) {
      error.push("Please provide your Email");
    }
    if (email && !validator.isEmail(email)) {
      error.push("This is not valid email");
    }
    if (!password) {
      error.push("Please provide your password");
    }
    if (!confirmPassword) {
      error.push("Please confirm your password");
    }
    if (password && confirmPassword && password !== confirmPassword) {
      error.push("Password does not match");
    }
    if (password && password.length < 6) {
      error.push("Password is too short");
    }
    if (Object.keys(files).length === 0) {
      error.push("Please provide your profile photo");
    }
    if (error.length > 0) {
      res.status(400).json({ error: { errorMessage: error } });
    } else {
      const getImageName = files.image.originalFilename;
      res.send({
        message: getImageName,
      });
    }
  });
};

module.exports = register;
