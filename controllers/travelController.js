const Travel = require("../Model/Travel");
const getAllTravels = async (req, res) => {
  try {
    const travels = await Travel.find({});
    res.status(201).json({ message: "Бүх аялалын мэдээлэл", travels });
  } catch (error) {
    res.status(400).json({
      message: "аялалын мэдээлэл авхад алдаа гарлаа.",
      error: error,
    });
  }
};
const createTravel = async (req, res) => {
  const { name, description, location, price, day } = req.body;
  if (!name || !description || !location || !price || !day) {
    res
      .status(400)
      .json({ message: "Нэр,тайлбар, байршил,  үнэ, өдөр хоосон байна." });
  }
  try {
    const travels = await Travel.create({
      name,
      description,
      location,
      price,
      day,
    });
    res.status(201).json({ message: "Амжилттай бүртгэгдлээ", travels });
  } catch (error) {
    res.status(400).json({ message: "Бүртгэл амжилгүй боллоо.", error: error });
  }
};

const getTravel = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: `Йим ${id} ID-тай аялал олдсонгүй` });
  }
  try {
    const travels = await Travel.findById(id);
    res
      .status(201)
      .json({ message: `Ийм ${id} ID-тай аялал амжилттай олдлоо`, travels });
  } catch (error) {
    res.status(400).json({ message: "Бүртгэл амжилгүй боллоо.", error: error });
  }
};
const updateTravel = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: `Йим ${id} ID-тай аялал олдсонгүй` });
  }
  try {
    const travels = await Travel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(201).json({
      message: `Ийм ${id} ID-тай аялал амжилттай шинэчилэгдлээ`,
      travels,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Шинэчилэл амжилгүй боллоо.", error: error });
  }
};
const deleteTravel = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: `Йим ${id} ID-тай аялал олдсонгүй` });
  }
  try {
    const travels = await Travel.findOneAndDelete(id);
    res.status(201).json({
      message: `Ийм ${id} ID-тай аялалийг амжилттай устгалаа`,
      travels,
    });
  } catch (error) {
    res.status(400).json({ message: "Хүсэлт амжилгүй боллоо.", error: error });
  }
};

module.exports = {
  createTravel,
  getAllTravels,
  getTravel,
  updateTravel,
  deleteTravel,
};
