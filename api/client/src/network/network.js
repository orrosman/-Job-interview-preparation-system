// import * as axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export async function getQuestion() {
	const response = await axios(`${BASE_URL}/random`);
	return response.data;
}
