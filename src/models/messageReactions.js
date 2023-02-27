const mongoose = require("mongoose");

const messageReaction = mongoose.Schema(
  {
    reactedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    message: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },

    reaction: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reaction", messageReaction);
