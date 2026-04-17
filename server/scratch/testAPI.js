const axios = require('axios');

async function testAPI() {
  try {
    const response = await axios.post('http://localhost:5000/api/colleges/predict-colleges', {
      rank: 1,
      category: 'OPEN',
      exam: 'JoSAA',
      gender: 'Gender-Neutral'
    });
    console.log('Results length:', response.data.length);
    if (response.data.length > 0) {
      console.log('Sample result:', response.data[0]);
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

testAPI();
