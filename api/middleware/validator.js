function validateQuestion(req, res, next) {
	const question = req.body;
	const { title, correctAnswer, answers, difficulty } = { ...question };
	try {
		if (!title || !correctAnswer || !answers || !difficulty) {
			throw { status: 400, message: 'One or more params are missing' };
		}

		req.validQuestion = question;

		next();
	} catch (error) {
		console.log(error);
		next(error);
	}
}

module.exports = { validateQuestion };
