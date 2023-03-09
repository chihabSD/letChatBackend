const express = require("express");
const {
  getFriends,
  sendMessage,
  getMessage,
  sendImage,
  addToChatList,
  getConversation,
  reactToMessage,
  replyToMessage,
  deleteMessage,
  findUserByUserName,
  removeConversation,
  udpateUserInConversation,
  existConversation,
} = require("../controllers/massenger");

const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.get("/messanger/get-friends", verifyToken, getFriends);
router.post("/messanger/send-message", verifyToken, sendMessage);
router.put(
  "/messanger/react-to-message/:messageId",
  verifyToken,
  reactToMessage
);
router.get("/messanger/chat/:conversationId", verifyToken, getMessage);
router.post("/messanger/send-image", verifyToken, sendImage);
router.post("/messanger/add-to-chatlist", verifyToken, addToChatList);
router.get("/messanger/get-chatlist", verifyToken, getConversation);

// REPLIES
router.post(
  "/messanger/reply-to-message/:messageId",
  verifyToken,
  replyToMessage
);
router.put("/messanger/delete-message/:messageId", verifyToken, deleteMessage);

// USERS

router.get("/messanger/search-user/:keyword", verifyToken, findUserByUserName);

// CONVERSATION
router.put("/messanger/conversation/update-user/:_id", verifyToken, udpateUserInConversation);
router.put("/messanger/conversation/exist-conversation/:_id", verifyToken, existConversation);

router.delete(
  "/messanger/delete-conversation/:_id",
  verifyToken,
  removeConversation
);

// CONVERSATION
module.exports = router;
