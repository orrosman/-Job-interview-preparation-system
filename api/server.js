const express = require('express');
const cors = require('cors');

const app = new express();
app.use(cors());

app.use(express.json());
app.use('/', (req, res) => {
	res.send('test server');
});

app.listen(process.env.PORT || 3000, () => {
	console.log('Server is running💨');
});
