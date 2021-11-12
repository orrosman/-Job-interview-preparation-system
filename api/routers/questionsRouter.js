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

module.exports = router;
