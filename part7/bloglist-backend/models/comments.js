const mongoose = require("mongoose");
const jsonHelper = require("../utils/json_helper");

const commentSchema = mongoose.Schema({
  content: String,
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
commentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    jsonHelper.mongooseJsonTransformer(document, returnedObject);
    delete returnedObject.hashed_password;
  },
});
module.exports = mongoose.model("Comment", commentSchema);
