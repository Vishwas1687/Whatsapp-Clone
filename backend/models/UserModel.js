const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  about: {
    type: String,
    required: false,
  },
});

const userModel = model("User", UserSchema);
module.exports = userModel;
