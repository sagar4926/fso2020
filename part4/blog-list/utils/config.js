const PORT = 3003;
const SECRET_KEY = process.env.SECRET_KEY;
let BCRYPT_SALT_ROUNDS = 14;

let MONGO_URL = process.env.MONGO_DB_URL;

if (process.env.NODE_ENV === "test") {
  MONGO_URL = process.env.TEST_MONGO_DB_URL;
  BCRYPT_SALT_ROUNDS = 1;
}

module.exports = {
  PORT,
  MONGO_URL,
  SECRET_KEY,
  BCRYPT_SALT_ROUNDS,
};
