const mongoose = require("mongoose");
const jsonHelper = require("../utils/json_helper");

const userSchema = mongoose.Schema({
  name: String,
  username: String,
  hashed_password: String,
});
userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    jsonHelper.mongooseJsonTransformer(document, returnedObject);
    delete returnedObject.hashed_password;
  },
});

module.exports = mongoose.model("User", userSchema);
