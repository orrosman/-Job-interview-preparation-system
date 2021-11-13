import * as network from '../network/network.js';

const questionButton = document.querySelector('#question-button');

async function getQuestion() {
	const question = await network.getQuestion();
	renderNewQuestion(question);
}

questionButton.addEventListener('click', getQuestion);

function renderNewQuestion(newQuestion) {
	const pageQuestionDiv = document.querySelector('#question');

	//remove previous question
	while (pageQuestionDiv.firstChild) {
		pageQuestionDiv.firstChild.remove();
	}

	addQuestionToPage(newQuestion);
}

function addQuestionToPage(question) {
	//get element to put new question into
	const pageQuestionDiv = document.querySelector('#question');

	//build question structure
	const titleElement = document.createElement('h5');
	titleElement.innerText = question.title;
	const answersElement = buildAnswersList(
		question.answers,
		question.correctAnswer
	);

	pageQuestionDiv.appendChild(titleElement);
	pageQuestionDiv.appendChild(answersElement);
}

function buildAnswersList(answers, correctAnswer) {
	const answersElement = document.createElement('ul');
	answersElement.setAttribute('class', 'list-group list-group-flush');
	for (const answer of answers) {
		const answerElement = document.createElement('li');
		answerElement.setAttribute('class', 'list-group-item');
		const answerButton = document.createElement('button');
		answerButton.setAttribute('class', 'btn btn-outline-dark');

		answerButton.addEventListener('click', () => {
			//check if correct
			if (answer == correctAnswer.trim()) {
				answerButton.setAttribute('class', 'btn btn-success');
				handleScores(true);
			} else {
				answerButton.setAttribute('class', 'btn btn-danger');
				handleScores(false);
			}
		});

		answerButton.innerText = answer;
		answerElement.appendChild(answerButton);
		answersElement.appendChild(answerElement);
	}
	return answersElement;
}

function handleScores(isCorrect) {
	if (isCorrect) {
		const rightSpan = document.querySelector('#right');
		rightSpan.innerText++;
	} else {
		const wrongSpan = document.querySelector('#wrong');
		wrongSpan.innerText++;
	}
	getQuestion();
}
