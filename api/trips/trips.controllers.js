const Trip = require("../../models/Trip");
const User = require("../../models/User");

exports.getTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (err) {
    next(err);
  }
};

exports.createTrip = async (req, res, next) => {
  try {
    const newTrip = await Trip.create(req.body);
    res.json(newTrip); //
    await User.findByIdAndUpdate(req.body.owner, {
      $push: { trips: newTrip._id },
    });
  } catch (error) {
    next(error);
  }
};
exports.updateTrip = async (req, res, next) => {
  console.log("I got in update");
  const { tripId } = req.params;
  try {
    const foundTrip = await Trip.findById(tripId);
    if (foundTrip) {
      await Trip.findByIdAndUpdate(tripId, req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "trip not found" });
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteTrip = async (req, res, next) => {
  const { tripId } = req.params;
  console.log(req.params);
  try {
    const foundTrip = await Trip.findById(tripId);
    if (foundTrip) {
      await foundTrip.remove();
      res.status(204).end();
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

exports.updateTrip = async (req, res, next) => {
  const { tripId } = req.params;

  try {
    const foundTrip = await Trip.findById(tripId);
    if (foundTrip) {
      await Trip.findByIdAndUpdate(tripId, req.body);
      res.status(204).end();
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
