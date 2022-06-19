const Profile = require("../../models/Profile");

exports.profileUpdate = async (req, res) => {
  try {
    await Profile.findByIdAndUpdate(req.profile.id, req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
