const Category = require("../Model/Category");

const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(201).json({ message: "Бүх ангилалын мэдээлэл", categories });
  } catch (error) {
    res.status(400).json({
      message: "Ангилалын мэдээлэл авхад алдаа гарлаа.",
      error: error,
    });
  }
};
const createCategory = async (req, res) => {
  const { title, description, categoryRate } = req.body;
  if (!title || !description || !categoryRate) {
    res.status(400).json({ message: "Нэр,тайлбар, ангилал хоосон байна." });
  }
  try {
    const category = await Category.create({
      title,
      description,
      categoryRate,
    });
    res.status(201).json({ message: "Амжилттай бүртгэгдлээ", category });
  } catch (error) {
    // res.status(400).json({ message: "Бүртгэл амжилгүй боллоо.", error: error });
    next(error);
  }
};

const getCategory = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: `Йим ${id} ID-тай ангилал олдсонгүй` });
  }
  try {
    const category = await Category.findById(id);
    res.status(201).json({
      message: `Ийм ${id} ID-тай ангилалмжилттай олдлоо`,
      category,
    });
  } catch (error) {
    res.status(400).json({ message: "Бүртгэл амжилгүй боллоо.", error: error });
  }
};
const updateCategory = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: `Йим ${id} ID-тай ангилаллдсонгүй` });
  }
  try {
    const category = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json({
      message: `Ийм ${id} ID-тай ангилалмжилттай шинэчилэгдлээ`,
      category,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Шинэчилэл амжилгүй боллоо.", error: error });
  }
};
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: `Йим ${id} ID-тай ангилал  олдсонгүй` });
  }
  try {
    const category = await Category.findOneAndDelete(id);
    res.status(201).json({
      message: `Ийм ${id} ID-тай ангилалыг амжилттай устгалаа`,
      category,
    });
  } catch (error) {
    res.status(400).json({ message: "Хүсэлт амжилгүй боллоо.", error: error });
  }
};

module.exports = {
  createCategory,
  getAllCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
