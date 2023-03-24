const User = require("../Model/User");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(201).json({ message: "Бүх хэрэглэгчийн мэдээлэл", users });
  } catch (error) {
    res.status(400).json({ message: "Бүртгэл амжилгүй боллоо.", error: error });
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
    res.status(400).json({
      message: "ID хэрэглэгчийн мэдээлэл авах хүсэлт амжилгүй боллоо.",
      error: error,
    });
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

const login = async (req, res, next) => {
  console.log("REQ===>", req.body);
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    if (!user) {
      res.status(400).json({
        message: `Имэйл эсвэл нууц үг буруу байна`,
      });
    }

    const checkpass = bcrypt.compareSync(req.body.password, user.password);

    if (!checkpass) {
      res.status(400).json({
        message: `Имэйл эсвэл нууц үг буруу байна`,
      });
    }

    const { password, _id, name, email, role } = user;

    const token = jwt.sign(
      { _id, name, email, role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    console.log("token=====>", token);

    res.status(200).json({ message: "Амжилттай нэвтэрлээ", user, token });
  } catch (error) {
    next(error);
  }
};
const register = async (req, res, next) => {
  const { name, email, password, phone } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });
    if (!name || !email || !password || !phone) {
      res
        .status(400)
        .json({ message: "Нэр,email, нууц үг, дугаар хоосон байна." });
    }
    res.status(200).json({ message: "Амжилттай бүртгүүллээ.", user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  login,
  register,
};
