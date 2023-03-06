const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
     username : {
          type : String,
          required : true
     },
     email : {
          type: String,
          required : true
     },
     password : {
          type: String,
          required : true,
     },
     image : {
          type: String,
          // required : true
     }
}, {timestamps:true});

// userSchema.set("toJSON", {
//   transform: function (doc, ret, opt) {
//     // ret["id"] = ret["_id"];
//     delete ret["password"];
//     delete ret["__v"];
//     return ret;
//   },
// });

module.exports = mongoose.model("User", userSchema);
