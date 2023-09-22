const usersModel = require("../models/usersModel");

async function getUser(req, res, next) {
  try {
    let userName = req.params.username.toString();
    userName = userName.toLowerCase();
    let user = await usersModel.findOne({ username: userName });
    if (!user || user == null) {
      return res
        .status(404)
        .json({ message: `User ${userName} could not be found` });
    }
    res.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = getUser;
