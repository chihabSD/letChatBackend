const express = require("express");
const { getFriends, sendMessage } = require("../controllers/massenger");

const verifyToken = require("../middleware/verifyToken");

const router = express.Router();


router.get("/messanger/get-friends", verifyToken, getFriends);
router.post("/messanger/send-message", verifyToken, sendMessage);
module.exports = router;

