const blogsRouter = require("express").Router();
const Blog = require("../models/blogs");
const User = require("../models/users");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", ["username", "name"]);
  return response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const firstUser = await User.findOne({});
  const blog = new Blog({ ...request.body, user: firstUser._id });
  const result = await blog.save();
  firstUser.blogs = firstUser.blogs.concat(result._id);
  await firstUser.save();
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
