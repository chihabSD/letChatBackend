const express = require("express");
const { getFriends, sendMessage, getMessage, sendImage, addToChatList,  getConversation, reactToMessage } = require("../controllers/massenger");

const verifyToken = require("../middleware/verifyToken");

const router = express.Router();


router.get("/messanger/get-friends", verifyToken, getFriends);
router.post("/messanger/send-message", verifyToken, sendMessage);
router.put("/messanger/react-to-message/:messageId", verifyToken, reactToMessage);
router.get("/messanger/chat/:conversationId", verifyToken, getMessage);
router.post("/messanger/send-image", verifyToken, sendImage);
router.post("/messanger/add-to-chatlist", verifyToken, addToChatList);
router.get("/messanger/get-chatlist", verifyToken, getConversation);
module.exports = router;

