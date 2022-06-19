const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: {
    type: String,
    default:
      "https://kingcoleducks.com/wp-content/uploads/2018/08/recipe-placeholder-1.png",
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Trip", TripSchema);
