const mongoose = require('mongoose');

const SpecialSchema = mongoose.Schema({
name: { type: String, required: true },
  description: { type: String, required: true },
  Teachers: { type: String, required: true }
}, { collection: 'SpecialEvents' });

module.exports = mongoose.model('Special', SpecialSchema);
