const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    senderName: {
      type: String,
      required: true,
    },
    receiverId: {
      type: String,
      required: true,
    },
    message: {
      text: {
        type: String,
        required: true,
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
