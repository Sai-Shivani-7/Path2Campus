const express = require('express');
const router = express.Router();
const collegeController = require('../controllers/collegeController');

router.post('/predict-colleges', collegeController.predictColleges);
router.get('/', collegeController.getColleges);
router.get('/:id', collegeController.getCollegeById);

module.exports = router;
