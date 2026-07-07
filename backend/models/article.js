const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  mainArticleIndex: { type: Number, required: false },
  articles: [
    {
      imageUrl: { type: String, required: false },
    }
  ],
});

module.exports = mongoose.model('Article', articleSchema);