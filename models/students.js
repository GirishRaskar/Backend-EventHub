const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  batch: { type: String, required: true },
  prevBatch: { type: String },
  RID: { type: String, required: true }
}, { collection: 'StudentAdmissions' });

module.exports = mongoose.model('Students', StudentSchema);
