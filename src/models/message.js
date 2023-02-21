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
    message: {
      text: {
        type: String,
      },
      image: {
        type: String,
        default: "",
      },
    },
    status: {
      type: String,
      default: "unseen",
    },
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
  },
  { timestamps: true }
);

// messageSchema.set("toJSON", {
//   transform: function (doc, ret, opt) {
//     // ret["id"] = ret["_id"];
//     delete ret["password"];
//     delete ret["__v"];
//     return ret;
//   },
// });

module.exports = mongoose.model("Message", messageSchema);
