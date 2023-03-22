const express = require("express");
const {
  createTravel,
  getAllTravels,
  getTravel,
  updateTravel,
  deleteTravel,
} = require("../controllers/travelController");

const router = express.Router();

router.route("/").post(createTravel).get(getAllTravels);
router.route("/:id").get(getTravel).put(updateTravel).delete(deleteTravel);

module.exports = router;
