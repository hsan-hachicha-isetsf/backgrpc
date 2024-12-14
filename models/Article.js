const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stock: { type: Number, required: true },
  price: { type: Number, required: true }
});
module.exports = mongoose.model('Article', articleSchema);
