const logger = require("./logger");

const errorHandler = (error, request, response, next) => {
  if (error.message === "Not Found") {
    return response.status(404).json({ error: "resource not found" });
  }
  if (error.name === "ValidationError") {
    return response.status(400).json(error);
  }
  if (error.message === "ValidationError") {
    return response.status(400).json(error);
  }
  if (error.name === "CastError") {
    return response
      .status(400)
      .json({ error: "Bad Request, the ID is malformatted" });
  }
  if (error.name === "JsonWebTokenError") {
    return response.status(401).json(error);
  }
  logger.error("Error: ", error);
  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authHeader = request.get("Authorization");
  if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
    request['token'] = authHeader.substring(7);
  }
  next();
};
module.exports = {
  errorHandler,
  tokenExtractor,
};
