const express = require("express");

const {currentUser,  register, login } = require("../controllers/auth");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/profile", verifyToken, currentUser);
module.exports = router;

