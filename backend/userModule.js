const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
    lName: {
      type: String,
      required: [true, "Please enter last name "],
    },
    age: {
      type: String,
      required: [true, "Please enter age"],
    },
    phone: {
      type: String,
      required: [true, "Please enter phone number"],
    },
    address: {
      type: String,
      required: [true, "Please enter address"],
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
