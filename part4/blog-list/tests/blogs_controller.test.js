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

  test("create blog defaults likes to 0", async () => {
    const result = await api.post("/api/blogs").send(helper.blog_without_likes);
    expect(result.body.likes).toBe(0);
  });

  test("create blog without author/url returns 400", async () => {
    await api
      .post("/api/blogs")
      .send(helper.blog_without_author_or_url)
      .expect(400);
  });
});

describe("blogs-controller-delete", () => {
  test("delete returns 204 on success", async () => {
    await api.delete(`/api/blogs/${helper.blogs[0]._id}`).expect(204);
  });

  test("delete returns 400 on wrong id type", async () => {
    await api.delete(`/api/blogs/243`).expect(400);
  });

  test("delete removes item from db", async () => {
    const id = helper.blogs[0]._id;
    await api.delete(`/api/blogs/${id}`);
    const new_blogs = await api.get("/api/blogs");
    const ids = new_blogs.body.map((blog) => blog.id);
    expect(ids).not.toContain(id);
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
