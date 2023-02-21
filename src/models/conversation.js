const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema(
  {

    users:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:'User'
  }],
    startBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      
      latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Message', 
      }
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

module.exports = mongoose.model("Conversation", conversationSchema);

// const mongoose = require("mongoose");

// const chatSchema = mongoose.Schema(
//   {
//     senderId: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     receiverId: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
   
//     latestMessage: {
//       type: Schema.Types.ObjectId,
//       ref: "Message",
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Chat", chatSchema);
