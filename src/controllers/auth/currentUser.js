const findUser = require("../../helpers/findUser");
const currentUser = async (req, res) => {
  try {
    const { user } = req.user;
    let userFound = await findUser(user.email)
    const handleReturn = () => {
      return res.status(200).send({ user: userFound });
    };
    userFound ? handleReturn() : handleReturn();
  } catch (e) {
    console.log(e);
  }
};

module.exports = currentUser;