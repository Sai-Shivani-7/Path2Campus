const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

async function checkDB() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/college-platform');
  console.log('Connected to MongoDB');

  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log('Collections:', collections.map(c => c.name));

  const CollegeCount = await mongoose.connection.db.collection('colleges').countDocuments();
  const CutoffCount = await mongoose.connection.db.collection('cutoffs').countDocuments();

  console.log('Colleges:', CollegeCount);
  console.log('Cutoffs:', CutoffCount);

  if (CutoffCount > 0) {
    const sample = await mongoose.connection.db.collection('cutoffs').findOne();
    console.log('Sample Cutoff:', sample);
  }

  process.exit();
}

checkDB().catch(err => {
  console.error(err);
  process.exit(1);
});
