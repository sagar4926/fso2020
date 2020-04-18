const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./blogs__test_helper");

const Blog = require("../models/blogs");

const api = supertest(app);

describe("blogs-controller-get-all", () => {
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

  test("get all blogs should have id", async () => {
    const response = await api.get("/api/blogs");
    response.body.forEach((blog) => expect(blog.id).toBeDefined());
  });
});

describe("blogs-controller-post", () => {
  test("create returns json", async () => {
    await api
      .post("/api/blogs")
      .send(helper.new_blog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });

  test("create returns blog with id", async () => {
    const result = await api.post("/api/blogs").send(helper.new_blog);
    expect(result.body.id).toBeDefined();
  });

  test("create returns the blog data correctly", async () => {
    const result = await api.post("/api/blogs").send(helper.new_blog);
    expect({
      title: result.body.title,
      author: result.body.author,
      url: result.body.url,
      likes: result.body.likes,
    }).toEqual(helper.new_blog);
  });

  test("create increases total blog count", async () => {
    await api.post("/api/blogs").send(helper.new_blog);
    const new_blogs = await api.get("/api/blogs");
    expect(new_blogs.body).toHaveLength(helper.blogs.length + 1);
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
