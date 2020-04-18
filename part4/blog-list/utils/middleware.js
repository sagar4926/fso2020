const logger = require("./logger");

const errorHandler = (error, request, response, next) => {
  if (error.name === "ValidationError") {
    return response.status(400).json(error);
  }
  if (error.name === "CastError") {
    return response
      .status(400)
      .json({ error: "Bad Request, the ID is malformatted" });
  }
  logger.error("Error: ", error);
  next(error);
};

module.exports = {
  errorHandler,
};
