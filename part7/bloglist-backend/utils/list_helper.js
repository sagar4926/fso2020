const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.map((blog) => blog.likes).reduce((acc, next) => acc + next, 0);
};

const favouriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return undefined;
  }
  let mostLiked = blogs[0];
  blogs.forEach((blog) => {
    if (blog.likes > mostLiked.likes) {
      mostLiked = blog;
    }
  });
  return mostLiked;
};

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return undefined;
  }

  const res = _.maxBy(_.entries(_.countBy(blogs, "author")), _.last);
  return {
    author: res[0],
    blogs: res[1],
  };
};

const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return undefined;
  }
  const res = _(blogs)
    .groupBy("author")
    .map((value, key) => ({
      author: key,
      likes: _.sumBy(value, "likes"),
    }))
    .maxBy("likes");
  return res;
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
