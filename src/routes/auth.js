const express = require("express");
const router = express.Router();

const userController = require("../controllers/auth");

//Auth and signup
router.post("/register", userController.register);

module.exports = router;