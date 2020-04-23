const mongoose = require("mongoose");
const helper = require("./users__test_helper");
const User = require("../models/users");
const api = require("./test_helper").api;


beforeEach(async () => {
  await User.deleteMany({});
  for (const item of helper.initial_data) {
    const model = new User(item);
    await model.save();
  }
});

describe("users-controller-get-all", () => {
  test("get all returns json", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("get all returns all users", async () => {
    const response = await api.get("/api/users");
    expect(response.body).toHaveLength(helper.initial_data.length);
  });

  test("get all should contain specific username", async () => {
    const response = await api.get("/api/users");
    const usernames = response.body.map((item) => item.username);
    expect(usernames).toContain(helper.initial_data[0].username);
  });

  test("get all users should have id", async () => {
    const response = await api.get("/api/users");
    response.body.forEach((item) => expect(item.id).toBeDefined());
  });
  test("get all users should not return passwords", async () => {
    const response = await api.get("/api/users");
    response.body.forEach((item) =>
      expect(item.hashed_password).not.toBeDefined()
    );
  });
});

describe("users-controller-post", () => {
  test("create returns json", async () => {
    await api
      .post("/api/users")
      .send(helper.new_data)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });

  test("create returns user with id", async () => {
    const result = await api.post("/api/users").send(helper.new_data);
    expect(result.body.id).toBeDefined();
  });

  test("create returns the user correctly", async () => {
    const result = await api.post("/api/users").send(helper.new_data);
    expect({
      name: result.body.name,
      username: result.body.username,
    }).toEqual({
      name: helper.new_data.name,
      username: helper.new_data.username,
    });
  });

  test("create increases total user count", async () => {
    await api.post("/api/users").send(helper.new_data);
    const new_users = await api.get("/api/users");
    expect(new_users.body).toHaveLength(helper.initial_data.length + 1);
  });

  test("create user without username/password returns 400", async () => {
    await api.post("/api/users").send(helper.invalid_data).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
