const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Хэрэглэгчийн нэрийг заавал оруулна уу."],
  },
  profileImg: String,
  email: {
    type: String,
    unique: true,
  },
  role: {
    type: String,
    enum: ["User", "Admin"],
    default: "User",
  },
  password: String,
  phone: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const user = mongoose.model("User", UserSchema);
module.exports = user;
