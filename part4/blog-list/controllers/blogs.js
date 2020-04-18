const blogsRouter = require("express").Router();
const jsonwebtoken = require("jsonwebtoken");
const Blog = require("../models/blogs");
const User = require("../models/users");
const tokenHelper = require("../utils/token_helper");
const config = require("../utils/config");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", ["username", "name"]);
  return response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const token = tokenHelper.get_token(request);
  const identity = jsonwebtoken.verify(token, config.SECRET_KEY);
  if (!token || !identity.id) {
  }
  const user = await User.findById(identity.id);
  if (!user) {
    return response.status(401).json({
      error: "token missing or invalid",
    });
  }
  const blog = new Blog({ ...request.body, user: user._id });
  const result = await blog.save();
  user.blogs = user.blogs.concat(result._id);
  await user.save();
  return response.status(201).json(result);
});

blogsRouter.put("/:id", async (request, response, next) => {
  const blog = await Blog.findByIdAndUpdate(
    request.params.id,
    {
      likes: request.body.likes,
    },
    { new: true }
  );
  if (!blog) {
    return next(new Error("Not Found"));
  }
  return response.json(blog);
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  return response.status(204).end();
});

module.exports = blogsRouter;
