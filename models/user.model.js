const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firebase_uid : String,
  displayName: String,
  email: String,
  admin: {
    type: Boolean,
    default: false,
  },
},{
  timestamps : true
});

const User = mongoose.model("users", userSchema);

module.exports = User;
