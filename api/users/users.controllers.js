const User = require("../../models/User");
const Profile = require("../../models/Profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signin = async (req, res) => {
  try {
    console.log("something");
    const payload = {
      _id: req.user._id,
      username: req.user.username,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res.json({ token: token });
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const payload = {
      _id: newUser._id,
      username: newUser.username,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    const newProfile = await Profile.create({ user: newUser._id });
    await User.findByIdAndUpdate(newUser._id, { profile: newProfile._id });

    res.json({ token: token });
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-createdAt -updatedAt").populate(
      "profile"
    );
    res.status(201).json(users);
  } catch (err) {
    res.status(500).json("Server Error");
  }
};
