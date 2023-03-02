const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageUrl: {
      type: String,
    },
    message: {
      type: String,
      default: "",
    },
    status: {
      type: Boolean,
      default: false,
    },
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
    contentType: {
      type: String,
      default: "message",
    },
    delivered: {
      type: Boolean,
      default: false,
    },

    type: {
      type: String,
      enum: ["text", "image"],
      default: "text",
    },
    deletedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    reactions: {
      reactions: [
        {
          by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          reaction: { type: String, default: "" },
        },
      ],
    },
    // reactions: {
    //   reactions :[
    //     by:{}
    //   ]
    //   reactedBy: [
    //     {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "User",
    //     },
    //   ],
    //   reactionType: {
    //     reactions:[{ type: String,
    //       default: "",}]

    //   },
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
