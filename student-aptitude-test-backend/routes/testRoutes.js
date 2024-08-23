const express = require('express');
const { getTestQuestions, submitTest } = require('../controllers/testController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/questions', protect, getTestQuestions);
router.post('/submit', protect, submitTest);

module.exports = router;
