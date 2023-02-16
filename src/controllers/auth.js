
const userController = {};

userController.register = (req, res, next) => {
  console.log('res', req.body);
  res.send({
    message: "sign up"
  });
};

module.exports = userController;