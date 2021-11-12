const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	correctAnswer: {
		type: String,
		required: true,
	},
	answers: {
		type: Array,
		required: true,
	},
	difficulty: {
		type: Number,
		required: true,
	},
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
