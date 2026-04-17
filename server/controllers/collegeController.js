const College = require('../models/College');
const Cutoff = require('../models/Cutoff');

function calculateProbability(rank, closingRank) {
  let p = (closingRank - rank) / closingRank;
  // Admission probability calculation: probability = (closing_rank - user_rank) / closing_rank
  // Categorize results into Safe, Target, Dream
  // p > 0.1 Safe, p > 0 Target, p < 0 Dream (but let's make it more nuanced)
  return Math.max(0, Math.min(1, p)) * 100;
}

exports.predictColleges = async (req, res) => {
  try {
    const { rank: rawRank, category, branchPreference, exam, gender } = req.body;
    const rank = parseInt(rawRank);

    if (isNaN(rank)) {
      return res.status(400).json({ message: 'Valid rank is required' });
    }

    const query = {
      exam: exam || 'JoSAA',
      category: category || 'OPEN'
    };

    if (gender) {
      query.$or = [{ gender: gender }, { gender: 'Gender-Neutral' }];
    }

    let results = await Cutoff.find(query).populate('collegeId');

    const prediction = results.map(item => {
      const probability = calculateProbability(rank, item.closingRank);
      
      let chance = 'Dream';
      if (probability > 60) chance = 'Safe';
      else if (probability > 20) chance = 'Target';

      return {
        ...item._doc,
        probability: probability.toFixed(2),
        chance: chance
      };
    });

    // Sort by closing rank ascending (Absolute highest ranking colleges first)
    prediction.sort((a, b) => a.closingRank - b.closingRank);

    res.json(prediction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getColleges = async (req, res) => {
  try {
    const colleges = await College.find();
    res.json(colleges);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCollegeById = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    const cutoffs = await Cutoff.find({ collegeId: req.params.id });
    res.json({ college, cutoffs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
