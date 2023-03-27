const express = require("express");
const checkLogin = require("../middlewares/Auth");
const {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  login,
  register,
} = require("../controllers/userController");

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/").post(checkLogin, createUser).get(checkLogin, getAllUsers);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
