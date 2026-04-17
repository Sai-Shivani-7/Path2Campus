const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const College = require('../models/College');
const Cutoff = require('../models/Cutoff');

// Load environment variables from .env in the server directory
dotenv.config({ path: path.join(__dirname, '../.env') });

async function importJosaa() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/path2campus';
  console.log('Connecting to:', mongoUri);
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB');

  await mongoose.connection.db.dropCollection('colleges').catch(() => {});
  console.log('Colleges collection cleared');

  const cutoffs = [];
  const collegeNames = new Set();

  fs.createReadStream('./data/josaa.csv')
    .pipe(csv())
    .on('data', (row) => {
      collegeNames.add(row['Institute']);
      cutoffs.push({
        collegeName: row['Institute'],
        exam: 'JoSAA',
        branch: row['Academic Program Name'],
        quota: row['Quota'],
        category: row['Seat Type'],
        gender: row['Gender'],
        openingRank: parseInt(row['Opening Rank']),
        closingRank: parseInt(row['Closing Rank']),
        round: parseInt(row['Round']) || 1, // Default to Round 1 if not specified
        year: 2023
      });
    })
    .on('end', async () => {
      console.log('CSV file successfully processed');
      
      // 1. Create Colleges if they don't exist
      for (const name of collegeNames) {
        await College.findOneAndUpdate(
          { name: name },
          { name: name, type: name.includes('IIT') ? 'IIT' : name.includes('NIT') ? 'NIT' : 'IIIT' },
          { upsert: true, new: true }
        );
      }
      console.log('Colleges updated');

      // 2. Clear and Insert Cutoffs
      await Cutoff.deleteMany({ exam: 'JoSAA' });
      
      // Link collegeId
      const colleges = await College.find({});
      const collegeMap = {};
      colleges.forEach(c => collegeMap[c.name] = c._id);

      const cutoffsWithId = cutoffs.map(c => ({
        ...c,
        collegeId: collegeMap[c.collegeName]
      }));

      await Cutoff.insertMany(cutoffsWithId);
      console.log('Cutoffs imported');
      process.exit();
    });
}

importJosaa().catch(err => {
  console.error(err);
  process.exit(1);
});
