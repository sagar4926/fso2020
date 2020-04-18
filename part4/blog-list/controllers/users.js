const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/users");
const config = require("../utils/config");

const loginRouter = express.Router();

loginRouter.get("/", async (request, response, next) => {
  try {
    const result = await User.find({}).populate("blogs");
    return response.json(result);
  } catch (err) {
    next(err);
  }
});

loginRouter.post("/", async (request, response, next) => {
  try {
    const { name, username, password } = request.body;
    if (!password || password.length < 3) {
      const err = new Error();
      err.name = "ValidationError";
      err.message = {
        error:
          "Password is required, and it should be minimum 3 characters long",
      };
      next(err);
    }
    const hashed_password = await bcrypt.hash(
      password,
      config.BCRYPT_SALT_ROUNDS
    );
    const user = new User({
      name,
      username,
      hashed_password,
    });
    const result = await user.save();
    return response.status(201).json(result);
  } catch (err) {
    // Errors are not being caught by express-async-errors......!
    next(err);
  }
});

module.exports = loginRouter;
