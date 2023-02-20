const express = require("express");
const { getFriends, sendMessage, getMessage } = require("../controllers/massenger");

const verifyToken = require("../middleware/verifyToken");

const router = express.Router();


router.get("/messanger/get-friends", verifyToken, getFriends);
router.post("/messanger/send-message", verifyToken, sendMessage);
router.get("/messanger/get-message/:id", verifyToken, getMessage);
module.exports = router;

