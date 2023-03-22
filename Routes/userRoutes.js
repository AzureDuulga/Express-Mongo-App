const express = require("express");
const {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  login,
} = require("../controllers/userController");

const router = express.Router();

router.route("/login").post(login);

router.route("/").post(createUser).get(getAllUsers);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
