const express = require("express");
const router = express.Router();

const { profileUpdate } = require("./profile.controllers");

router.put("/:profileId", profileUpdate);
