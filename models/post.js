const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
});

postSchema.virtual("url").get(() => {
  return `/posts/${this.id}`;
});

module.exports = mongoose.model("Post", postSchema);
