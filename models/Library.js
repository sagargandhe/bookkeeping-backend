const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Library name is required'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Library', librarySchema);
