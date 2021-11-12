const express = require('express');
const mongoose = require('mongoose');
const Question = require('../../models/question');
const validate = require('../middleware/validator.js');
require('dotenv').config();
const router = express.Router();

mongoose.connect(process.env.DATABASE_URL);

router.get('/random', async (req, res) => {
	const numberOfQuestions = await Question.count();
	const randomIndex = Math.floor(Math.random() * numberOfQuestions);
	const randomQuestion = await Question.findOne().skip(randomIndex);

	res.send(randomQuestion);
});
router.get('/list', (req, res) => {
	Question.find({}).then((response) => {
		res.send(response);
	});
});

router.put('/update', validate.validateQuestion, (req, res) => {
	const id = req.query.id;
	const updatedQuestion = req.validQuestion;

	//get a question object and destruct it to its properties, returns the old question that was updated
	Question.findByIdAndUpdate(id, { ...updatedQuestion }).then((response) => {
		res.send(response);
	});
});

router.post('/create', validate.validateQuestion, (req, res) => {
	const question = req.validQuestion;

	//get a question object and destruct it to its properties
	Question.create({ ...question }).then((response) => {
		res.send(response);
	});
});

router.post('/remove/:id', (req, res) => {
	const id = req.params.id;

	Question.findByIdAndDelete(id).then((response) => {
		res.send(response);
	});
});

router.get('/read/by/difficulty/:difficulty', (req, res) => {
	const difficulty = req.params.difficulty;

	Question.find({ difficulty: { $gte: difficulty } }).then((response) => {
		res.send(response);
	});
});

module.exports = router;
