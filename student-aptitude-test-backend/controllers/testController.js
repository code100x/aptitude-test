const Test = require('../models/Test');

const getTestQuestions = async (req, res) => {
    const questions = await Test.find({ userId: req.user.id }).select('questions');
    res.json(questions);
};

const submitTest = async (req, res) => {
    const { score, duration } = req.body;
    await Test.updateOne({ userId: req.user.id }, { score, duration });
    res.status(200).json({ message: 'Test submitted successfully' });
};

module.exports = { getTestQuestions, submitTest };
