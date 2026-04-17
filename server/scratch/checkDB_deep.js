const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

async function checkDB() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/college-platform');
  
  const Cutoff = mongoose.connection.db.collection('cutoffs');
  
  const total = await Cutoff.countDocuments();
  console.log('Total cutoffs:', total);

  const josaaCount = await Cutoff.countDocuments({ exam: 'JoSAA' });
  console.log('JoSAA cutoffs:', josaaCount);

  const openCount = await Cutoff.countDocuments({ exam: 'JoSAA', category: 'OPEN' });
  console.log('JoSAA OPEN cutoffs:', openCount);

  const rankFilter = await Cutoff.countDocuments({ 
    exam: 'JoSAA', 
    category: 'OPEN', 
    closingRank: { $gte: 0.5 } 
  });
  console.log('JoSAA OPEN rank >= 0.5 cutoffs:', rankFilter);

  const genderFilter = await Cutoff.countDocuments({ 
    exam: 'JoSAA', 
    category: 'OPEN', 
    closingRank: { $gte: 0.5 },
    $or: [{ gender: 'Gender-Neutral' }, { gender: 'Gender-Neutral' }]
  });
  console.log('JoSAA OPEN rank >= 0.5 gender filter cutoffs:', genderFilter);

  process.exit();
}

checkDB().catch(err => {
  console.error(err);
  process.exit(1);
});
