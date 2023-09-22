const express = require("express");
const router = express.Router();
const usersModel = require("../models/usersModel");
const getUser = require("./getUser");
// get all users
router.get("/", async (req, res) => {
  try {
    const users = await usersModel.find();
    res.send(users);
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
});

// get one user
router.get("/:username", getUser, async (req, res) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  res.json(res.user);
});

// add new user
router.post("/", async (req, res) => {
  let username = req.body.firstname
    .toLowerCase()
    .concat(req.body.lastname.toLowerCase());
  const user = new usersModel({
    firstname: req.body.firstname.toLowerCase(),
    lastname: req.body.lastname.toLowerCase(),
    username: username,
    age: req.body.age,
    birthday: req.body.birthday,
  });

  //add user to database
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// update user
router.patch("/:username", getUser, async (req, res) => {
  //
  if (req.body.firstname != null) {
    console.log("name: ", req.body.firstname);
    let firstname = req.body.firstname.toLowerCase();
    res.user.firstname = firstname;
    res.user.username = firstname.concat(res.user.lastname);
  }
  if (req.body.lastname != null) {
    let lastname = req.body.lastname.toLowerCase();
    res.user.lastname = lastname;
    res.user.username = res.user.firstname.concat(lastname);
  }
  if (req.body.age != null) {
    res.user.age = req.body.age;
  }
  if (req.body.birthday != null) {
    res.user.birthday = req.body.birthday;
  }

  // update database
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// delte user
router.delete("/:username", getUser, async (req, res) => {
  try {
    await res.user.deleteOne();
    res.json({ message: "Successfully removed the user" });
  } catch (err) {
    //server error
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
