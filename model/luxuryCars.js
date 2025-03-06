const mongoose = require('mongoose');

const LuxuryCarSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  titleDescription: {
    type: String,
    required: true
  },
  subTitle: {
    type: String
  },
  subTitleDescription: {
    type: String
  },
  imageUrl: {
    type: String
  },
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('LuxuryCar', LuxuryCarSchema);