const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercased: true,
    validate: email => {
      const regex = /\S.\S@\S.\S/;
      if (!regex.test(email)) {
        throw new Error("Invalid email format!");
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6
  }
});

userSchema.pre("save", async function(next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  return Object.keys(userObject).reduce((obj, key) => {
    if (!["password", "tokens"].includes(key)) {
      obj[key] = userObject[key];
    }
    return obj;
  }, {});
};

module.exports = mongoose.model("user", userSchema);
