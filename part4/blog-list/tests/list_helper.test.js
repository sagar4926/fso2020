const listHelper = require("../utils/list_helper");

const listWithOneBlog = [
  {
    _id: "5e9804870f8b8932436f5891",
    title: "Test Blog",
    author: "Author",
    url: "https://google.com",
    likes: 12,
    __v: 0,
  },
];

const listWithManyBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

test("dummy returns one", () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("like-counter", () => {
  test("when list has no blogs, it should return 0", () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test("when list has one blog, sum should be blog.likes", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(listWithOneBlog[0].likes);
  });

  test("when list has mang blogs, total blogs should be sum of likes of all blogs", () => {
    const result = listHelper.totalLikes(listWithManyBlogs);
    expect(result).toBe(36);
  });
});

describe("favourite-blog", () => {
  test("when list has no blogs, it should return undefined", () => {
    const result = listHelper.favouriteBlog([]);
    expect(result).toEqual(undefined);
  });

  test("when list has one blog, it is returned", () => {
    const result = listHelper.favouriteBlog(listWithOneBlog);
    expect(result).toEqual(listWithOneBlog[0]);
  });

  test("when list has many blogs, it should return most liked blog", () => {
    const result = listHelper.favouriteBlog(listWithManyBlogs);
    expect(result).toEqual(listWithManyBlogs[2]);
  });

  test("when list has many favourite blogs, it should return the first encountered", () => {
    const result = listHelper.favouriteBlog(
      listWithOneBlog.concat(listWithManyBlogs)
    );
    expect(result).toEqual(listWithOneBlog[0]);
  });
});

describe("most-blogs", () => {
  test("when list no blogs, it should return undefined", () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toEqual(undefined);
  });

  test("when list one blogs, it should return the author", () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toEqual({
      author: listWithOneBlog[0].author,
      blogs: 1,
    });
  });

  test("when list many blogs, it should return author with most blogs", () => {
    const result = listHelper.mostBlogs(listWithManyBlogs);
    expect(result).toEqual({ author: "Robert C. Martin", blogs: 3 });
  });
});

describe("most-likes", () => {
  test("when list no blogs, it should return undefined", () => {
    const result = listHelper.mostLikes([]);
    expect(result).toEqual(undefined);
  });

  test("when list one blogs, it should return the author", () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toEqual({
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes,
    });
  });

  test("when list many blogs, it should return author with most likes", () => {
    const result = listHelper.mostLikes(listWithManyBlogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
