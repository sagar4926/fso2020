const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/users");
const config = require("./config");

const getLoggedInUser = async (request) => {
  const identity = jsonwebtoken.verify(request.token, config.SECRET_KEY);
  if (identity.id) {
    const user = await User.findById(identity.id);
    if (user) {
      return user;
    }
  }
};

module.exports = {
  getLoggedInUser,
};
