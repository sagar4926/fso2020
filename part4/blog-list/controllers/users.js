const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/users");
const config = require("../utils/config");

const loginRouter = express.Router();

loginRouter.get("/", async (request, response) => {
  const result = await User.find({});
  return response.json(result);
});

loginRouter.post("/", async (request, response) => {
  const { name, username, password } = request.body;
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
  return response.json(result);
});

module.exports = loginRouter;
