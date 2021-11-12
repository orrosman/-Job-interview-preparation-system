const express = require('express');
const mongoose = require('mongoose');
const Question = require('../../models/question');
require('dotenv').config();
const router = express.Router();

mongoose.connect(process.env.DATABASE_URL);

router.get('/list', (req, res) => {
	Question.find({}).then((response) => {
		res.send(response);
	});
});

router.post('/create', (req, res) => {
	const question = req.body;

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

module.exports = router;
