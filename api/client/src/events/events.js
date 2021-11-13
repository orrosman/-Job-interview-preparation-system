import * as network from '../network/network.js';

const questionButton = document.querySelector('#question-button');
const addQuestionButton = document.querySelector('#new-question-button');

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
	titleElement.setAttribute('class', 'd-flex justify-content-center');
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
	answersElement.setAttribute(
		'class',
		'list-group list-group-flush text-center'
	);
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

const questionForm = document.getElementById('new-question-form');
questionForm.addEventListener('submit', async (e) => {
	const properties = document.querySelectorAll('#new-question-form input');
	//get data from the form
	const data = Array.from(properties).reduce(
		(acc, input) => ({ ...acc, [input.id]: input.value }),
		{}
	);

	//remove empty answers
	for (const property of Object.entries(data)) {
		if (property[1] == '') {
			delete data[property[0]];
		}
	}

	//put all answers in array
	let answers = [];
	answers.push(data['correct-answer']);
	for (const property of Object.entries(data)) {
		if (
			property[0] != 'difficulty' &&
			property[0] != 'question-title' &&
			property[0] != 'correct-answer'
		) {
			answers.push(property[1]);
		}
	}
	const newQuestion = {
		title: data['question-title'],
		correctAnswer: data['correct-answer'],
		answers: answers,
		difficulty: data['difficulty'],
	};

	const res = await network.postNewQuestion(newQuestion);
	if ('message' in res) {
		alert(res.message);
	} else {
		alert('Your question was added successfully!😊');
	}
});
