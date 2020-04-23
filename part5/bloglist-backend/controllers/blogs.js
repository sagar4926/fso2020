const blogsRouter = require("express").Router();
const jsonwebtoken = require("jsonwebtoken");
const Blog = require("../models/blogs");
const User = require("../models/users");
const config = require("../utils/config");
const authHelper = require("../utils/auth_helper");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", ["username", "name"]);
  return response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const user = await authHelper.getLoggedInUser(request);
  if (!user) {
    return response.status(401).json({
      error: "token missing or invalid",
    });
  }
  const blog = new Blog({ ...request.body, user: user._id });
  const result = await blog.save()
  await result.populate("user", ["username", "name"]).execPopulate();
  user.blogs = user.blogs.concat(result._id);
  await user.save();
  await result;
  return response.status(201).json(result);
});

blogsRouter.put("/:id", async (request, response, next) => {
  const blog = await Blog.findByIdAndUpdate(
    request.params.id,
    {
      likes: request.body.likes,
    },
    { new: true }
  )  
  if (!blog) {
    return next(new Error("Not Found"));
  }
  await blog.populate("user", ["username", "name"]).execPopulate();
  return response.json(blog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const user = await authHelper.getLoggedInUser(request);
  if (!user) {
    return response.status(401).json({
      error: "token missing or invalid",
    });
  }
  const found = await Blog.findOneAndDelete({
    _id: request.params.id,
    user: user._id,
  });
  return response.status(204).end();
});

module.exports = blogsRouter;
