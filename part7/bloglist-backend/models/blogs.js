const mongoose = require("mongoose");
const jsonHelper = require("../utils/json_helper");

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});
blogSchema.set("toJSON", {
  transform: jsonHelper.mongooseJsonTransformer,
});
module.exports = mongoose.model("Blog", blogSchema);
