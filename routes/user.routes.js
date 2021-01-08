const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.get("/all", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.send(e);
  }
});

router.get("/", async (req, res) => {
  try {
    const user = await User.findOne({firebase_uid : req.query.firebase_uid});
    res.send(user);
  } catch (e) {
    res.send(e);
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ firebase_uid: req.body.firebase_uid });
    if (!user) {
      const response = await User.create(req.body);
      res.send(response);
    } else {
      const user = await User.findOne({ firebase_uid: req.body.firebase_uid });
      res.send(user);
    }

  } catch (error) {
    res.send(error);
  }
});

router.delete("/", async (req, res) => {
  try {
    await User.deleteMany({});
    res.send("All documents deleted");
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
