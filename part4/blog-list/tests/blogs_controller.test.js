const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./blogs__test_helper");

const Blog = require("../models/blogs");

const api = supertest(app);

describe("blogs-controller", () => {
  test("get all returns json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("get all returns all blogs", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.blogs.length);
  });

  test("get all should contain specific blog title", async () => {
    const response = await api.get("/api/blogs");
    const titles = response.body.map((blog) => blog.title);
    expect(titles).toContain(helper.blogs[0].title);
  });
});

beforeEach(async () => {
  await Blog.deleteMany({});
  for (const blog of helper.blogs) {
    const model = new Blog(blog);
    await model.save();
  }
});

afterAll(() => {
  mongoose.connection.close();
});
