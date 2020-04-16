const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.map((blog) => blog.likes).reduce((acc, next) => acc + next, 0);
};

const favouriteBlog = (blogs) => {
  if (!blogs || blogs.length == 0) {
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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};
