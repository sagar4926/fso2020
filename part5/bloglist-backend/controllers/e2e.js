const e2eRouter = require("express").Router();
const jsonwebtoken = require("jsonwebtoken");
const Blog = require("../models/blogs");
const User = require("../models/users");
const config = require("../utils/config");
const authHelper = require("../utils/auth_helper");

e2eRouter.post("/reset", async (request, response) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  return response.status(204).end();
});

module.exports = e2eRouter;
