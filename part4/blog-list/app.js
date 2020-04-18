const express = require("express");
const middleware = require("./utils/middleware");
const usersRouter = require("./controllers/users");

const app = express();
require("express-async-errors");
const cors = require("cors");
const config = require("./utils/config");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const blogsRouter = require("./controllers/blogs");

mongoose
  .connect(config.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    logger.info("Connected to db");
  })
  .catch((err) => {
    logger.error("Failed to connect to db. ", err);
  });

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

app.use(middleware.errorHandler);

module.exports = app;
