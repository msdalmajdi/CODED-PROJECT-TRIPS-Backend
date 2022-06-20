const express = require("express");
const router = express.Router();
const {
  getTrips,
  createTrip,
  updateTrip,
  deleteTrip,
} = require("./trips.controllers");

router.get("/", getTrips);
router.post("/create", createTrip);

router.put("/update/:tripId", updateTrip);

router.delete("/delete/:tripId", deleteTrip);
module.exports = router;
