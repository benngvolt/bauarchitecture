const mongoose = require('mongoose');


const articleSchema = mongoose.Schema({
  title: { type: String, required: true },
  date: { 
    type: Date, 
    required: true,
    default: Date.now 
  },
  description: { type: String, required: false },
  mainArticleIndex: { type: Number, required: false },
  articles: [
    {
      imageUrl: { type: String, required: false },
    }
  ],
});

module.exports = mongoose.model('Article', articleSchema);