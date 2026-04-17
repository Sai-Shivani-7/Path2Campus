const mongoose = require('mongoose');

const cutoffSchema = new mongoose.Schema({
  collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
  collegeName: { type: String, required: true }, // Redundancy for easier querying/import
  exam: { type: String, required: true }, // JoSAA, EAMCET
  branch: { type: String, required: true },
  quota: { type: String },
  category: { type: String, required: true },
  gender: { type: String },
  openingRank: { type: Number },
  closingRank: { type: Number, required: true },
  round: { type: Number },
  year: { type: Number }
}, { timestamps: true });

cutoffSchema.index({ collegeName: 1, exam: 1, branch: 1, category: 1 });

module.exports = mongoose.model('Cutoff', cutoffSchema);
