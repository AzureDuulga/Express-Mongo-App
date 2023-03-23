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
  password: { type: String, select: false },
  phone: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  phone: Number,
});

const user = mongoose.model("User", UserSchema);
module.exports = user;
