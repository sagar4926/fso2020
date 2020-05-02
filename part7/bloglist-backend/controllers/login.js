const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/users");
const config = require("../utils/config");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;
  const user = await User.findOne({ username });
  const is_valid = user
    ? await bcrypt.compare(password, user.hashed_password)
    : false;

  if (!is_valid) {
    return response.status(401).json({ error: "invalid username/password" });
  }

  const token = jsonwebtoken.sign({ id: user._id }, config.SECRET_KEY);
  response.status(200).send({ ...user.toJSON(), token });
});

module.exports = loginRouter;
