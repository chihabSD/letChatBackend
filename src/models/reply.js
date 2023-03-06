const mongoose = require("mongoose");

const replySchema = mongoose.Schema(
  {
    messageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      required: true,
    },
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
    contentType: {
      type: String,
      default: "reply",
    },
    message: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
    },
    type: {
      type: String,
      enum: ["text", "image"],
      default: "text",
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reply", replySchema);
