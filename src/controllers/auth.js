const formidable = require("formidable");
const userController = {};

userController.register = (req, res, next) => {
  const form = formidable();
  form.parse(req, async (err, fileds, files) => {
    console.log("res", fileds);
    console.log("res", files);
    // console.log(`files JSON: ${JSON.stringify(files)}`);
    res.send({
      message: "sign up",
    });
  });
};

module.exports = userController;
