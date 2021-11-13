// import * as axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export async function getQuestion() {
	const response = await axios.get(`${BASE_URL}/random`);
	return response.data;
}

export async function postNewQuestion(newQuestion) {
	const response = await axios({
		method: 'POST',
		url: `${BASE_URL}/create`,
		data: newQuestion,
	});
	return response.data;
}
