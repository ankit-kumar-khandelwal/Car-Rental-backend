
const mongoose = require('mongoose');

const TaxiServiceSchema = new mongoose.Schema({
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
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TaxiService', TaxiServiceSchema);