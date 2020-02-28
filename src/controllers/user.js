const User = require("../models/user");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(204).send("User not found!");
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.store = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(200).send("User created successfully!");
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.update = async (req, res, next) => {
  const updates = Object.keys(req.body);

  try {
    const user = await User.findById(req.params.id);
    updates.forEach(key => (user[key] = req.body[key]));
    await user.save();

    if (!user) return res.status(404).send();
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.delete = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("User deleted successfully!");
  } catch (e) {
    res.status(500).send(e);
  }
};
