const User = require("../Model/User");
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(201).json({ message: "Бүх хэрэглэгчийн мэдээлэл", users });
  } catch (error) {
    res.status(400).json({
      message: "Хэрэглэгчийн мэдээлэл авхад алдаа гарлаа.",
      error: error,
    });
  }
};
const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ message: "Нэр,email, нууц үг хоосон байна." });
  }
  try {
    const user = await User.create({
      name,
      email,
      password,
    });
    res.status(201).json({ message: "Амжилттай бүртгэгдлээ", user });
  } catch (error) {
    res.status(400).json({ message: "Бүртгэл амжилгүй боллоо.", error: error });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: `Йим ${id} ID-тай хэрэглэгч олдсонгүй` });
  }
  try {
    const user = await User.findById(id);
    res
      .status(201)
      .json({ message: `Ийм ${id} ID-тай хэрэглэгч амжилттай олдлоо`, user });
  } catch (error) {
    res.status(400).json({ message: "Бүртгэл амжилгүй боллоо.", error: error });
  }
};
const updateUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: `Йим ${id} ID-тай хэрэглэгч олдсонгүй` });
  }
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(201).json({
      message: `Ийм ${id} ID-тай хэрэглэгч амжилттай шинэчилэгдлээ`,
      user,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Шинэчилэл амжилгүй боллоо.", error: error });
  }
};
const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: `Йим ${id} ID-тай хэрэглэгч олдсонгүй` });
  }
  try {
    const user = await User.findOneAndDelete(id);
    res.status(201).json({
      message: `Ийм ${id} ID-тай хэрэглэгчийг амжилттай устгалаа`,
      user,
    });
  } catch (error) {
    res.status(400).json({ message: "Хүсэлт амжилгүй боллоо.", error: error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.find({ email, password });
    if (!user.length) {
      res.status(400).json({
        message: `${email} ийм имэйлтэй хэрэглэгч бүртгэлтгүй байна.`,
      });
    }
    res.status(200).json({ message: "Амжилттай нэвтэрлээ", user });
  } catch (error) {
    res.status(400).json({ message: "Хүсэлт амжилгүй боллоо.", error: error });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  login,
};
