const PORT = 3003;
let MONGO_URL = process.env.MONGO_DB_URL;

if (process.env.NODE_ENV === "test") {
  MONGO_URL = process.env.TEST_MONGO_DB_URL;
}

module.exports = {
  PORT,
  MONGO_URL,
};
