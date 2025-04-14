const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img:{
    data: Buffer,
    contentType: String,
  },
  categoryId: { type: String, required: true },
});

module.exports = mongoose.model('Image', ImageSchema);