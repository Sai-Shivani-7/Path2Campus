const mongoose = require('mongoose');

async function checkPath2Campus() {
  const uri = 'mongodb://localhost:27017/path2campus';
  await mongoose.connect(uri);
  console.log('Connected to path2campus');

  const CutoffCount = await mongoose.connection.db.collection('cutoffs').countDocuments();
  console.log('Cutoffs in path2campus:', CutoffCount);

  process.exit();
}

checkPath2Campus();
