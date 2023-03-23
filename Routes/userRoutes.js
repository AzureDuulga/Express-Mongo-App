const express = require("express");
const checkRole = require("../utils/checkRole");
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

router.route("/").post(checkRole, createUser).get(getAllUsers);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
