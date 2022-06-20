const express = require("express");
const router = express.Router();

const {
  fetchProfile,
  profileUpdate,
  profilesGet,
} = require("./profile.controllers");

router.param("profileId", async (req, res, next, profileId) => {
  const profile = await fetchProfile(profileId, next);
  if (profile) {
    req.profile = profile;
    next();
  } else {
    const err = new Error("Post Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", profilesGet);
router.put("/:profileId", profileUpdate);

module.exports = router;
