const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  title: String,
  content: String,
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Article", ArticleSchema);
