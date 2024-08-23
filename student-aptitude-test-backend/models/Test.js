const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    questions: [{ question: String, options: [String], answer: String }],
    score: { type: Number, default: 0 },
    duration: { type: Number, required: true }
});

const Test = mongoose.model('Test', testSchema);
module.exports = Test;
