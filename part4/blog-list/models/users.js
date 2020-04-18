const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const jsonHelper = require("../utils/json_helper");

const userSchema = mongoose.Schema({
  name: String,
  username: { type: String, required: true, minlength: 3, unique: true },
  hashed_password: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});
userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    jsonHelper.mongooseJsonTransformer(document, returnedObject);
    delete returnedObject.hashed_password;
  },
});
userSchema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model("User", userSchema);
