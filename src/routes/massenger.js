const express = require("express");
const { getFriends, sendMessage, getMessage, sendImage, addToChatList, getChatsList } = require("../controllers/massenger");

const verifyToken = require("../middleware/verifyToken");

const router = express.Router();


router.get("/messanger/get-friends", verifyToken, getFriends);
router.post("/messanger/send-message", verifyToken, sendMessage);
router.get("/messanger/get-message/:id", verifyToken, getMessage);
router.post("/messanger/send-image", verifyToken, sendImage);
router.post("/messanger/add-to-chatlist", verifyToken, addToChatList);
router.get("/messanger/get-chatlist", verifyToken, getChatsList);
module.exports = router;

