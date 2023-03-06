const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["private", "group"],
      default: "private",
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    groupPic: {
      type:String, 
    }, 
    groupName: {
      type:String, 
    }, 
    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    startBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);

