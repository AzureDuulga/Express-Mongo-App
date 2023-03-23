const mongoose = require("mongoose");

const TravelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Аялалын нэрийг заавал оруулна уу."],
    maxlength: [255, "Хамгийн ихдээ 500 тэмдэгтээс ихгүй байна."],
  },
  travelImg: String,
  description: {
    type: String,
    maxlength: [500, "Тайлбар хамгийн ихдээ 500 тэмдэгтээс ихгүй байна."],
  },
  location: String,
  price: Number,
  day: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

const travel = mongoose.model("Travel", TravelSchema);
module.exports = travel;
