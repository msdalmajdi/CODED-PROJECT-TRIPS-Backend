const Profile = require("../../models/Profile");

exports.fetchProfile = async (profileId, next) => {
  try {
    const profile = await Profile.findById(profileId);
    return profile;
  } catch (error) {
    next(error);
  }
};
exports.profileUpdate = async (req, res) => {
  try {
    await Profile.findByIdAndUpdate(req.profile.id, req.body);
    res.status(204).end();
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.profilesGet = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user");
    res.json(profiles);
  } catch (err) {
    res.status(500).json("Server Error");
  }
};
