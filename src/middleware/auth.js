const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token
    });

    if (!user) throw new Error("User not found!");

    req.user = user;
    req.token = token;

    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate" });
  }
};
