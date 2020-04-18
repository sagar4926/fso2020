const blogsRouter = require("express").Router();
const Blog = require("../models/blogs");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  return response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
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
