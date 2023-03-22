const mongoose = require("mongoose");

const connectDB = async (dburl) => {
  try {
    await mongoose.connect(dburl);
    console.log("MONGODB-тэй холбогдлоо.");
  } catch (err) {
    console.log("MONGODB-тэй холбогдлох үед алдаа гарлаа: ", err);
  }
};

module.exports = connectDB;
