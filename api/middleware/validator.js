function validateQuestion(req, res, next) {
	const question = req.body;
	const { title, correctAnswer, answers, difficulty } = { ...question };
	try {
		if (!title || !correctAnswer || !answers || !difficulty) {
			throw { status: 400, message: 'One or more params are missing' };
		} else {
			const validQuestion = {};

			//check all fields for correct input
			if (title.trim() == '') {
				throw { status: 400, message: 'You must provide a question title' };
			} else {
				validQuestion.title = title.trim();
			}

			if (correctAnswer.trim() == '') {
				throw { status: 400, message: 'You must provide a correct answer' };
			} else {
				validQuestion.correctAnswer = correctAnswer.trim();
			}

			if (!Array.isArray(answers)) {
				throw {
					status: 400,
					message: 'Answers must be provided in array form',
				};
			} else if (answers.length < 2) {
				throw { status: 400, message: 'You must provide at least 2 answers' };
			}

			validQuestion.answers = [];
			let hasCorrectAnswer = false;

			answers.forEach((answer) => {
				if (answer.trim() == '') {
					throw { status: 400, message: `Answer #${answer} is not valid` };
				} else {
					validQuestion.answers.push(answer.trim());
					if (answer.trim() == validQuestion.correctAnswer) {
						hasCorrectAnswer = true;
					}
				}
			});

			if (!hasCorrectAnswer) {
				throw {
					status: 400,
					message: `Non of the answers match the correct answer`,
				};
			}

			const difficultyValue = Number(difficulty); //parse difficult to a number
			if (isNaN(difficulty)) {
				throw { status: 400, message: 'Difficulty must be a number' };
			} else if (!Number.isInteger(difficultyValue) || difficultyValue < 0) {
				throw {
					status: 400,
					message: 'Difficulty must be a positive integer number',
				};
			} else {
				validQuestion.difficulty = difficultyValue;
			}
		}

		req.validQuestion = question;

		next();
	} catch (error) {
		console.log(error);
		next(error);
	}
}

module.exports = { validateQuestion };
