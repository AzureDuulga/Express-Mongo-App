const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Категорын нэрийг заавал оруулна уу."],
  },
  categoryImg: { type: String, default: "URL" },
  description: {
    type: String,
    maxlength: [500, "Тайлбар хамгийн ихдээ 500 тэмдэгтээс ихгүй байна."],
  },
  categoryRate: {
    type: Number,
  },
});

const category = mongoose.model("Category", CategorySchema);
module.exports = category;
