const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: {
    type: String,
    default:
      "https://static.turbosquid.com/Preview/2016/06/03__14_24_55/0.pnga3fd8527-7f73-4f52-8770-a8169eb52e64Original.jpg",
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Trip", TripSchema);
