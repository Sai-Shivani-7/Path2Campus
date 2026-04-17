const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String },
  location: { type: String },
  state: { type: String },
  type: { type: String }, // IIT, NIT, IIIT, State College
  averagePackage: { type: Number },
  feesPerYear: { type: Number },
  website: { type: String },
  image: { type: String },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('College', collegeSchema);
