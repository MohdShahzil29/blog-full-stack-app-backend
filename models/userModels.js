const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    unique: true,
    trim: true,
    min: 5,
    max: 25,
  },
  role:{
    type:String,
    default: 'user'
  }
}, {timestamps: true});

module.exports = mongoose.model("User", userSchema);
