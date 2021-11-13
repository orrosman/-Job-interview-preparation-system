const express = require('express');
const cors = require('cors');
const path = require('path');
const questionsRouter = require('./routers/questionsRouter');
const errorHandler = require('./middleware/errorHandler');

const app = new express();
app.use(cors());

app.use(express.json());
app.use('/', questionsRouter);
app.use('/', express.static(path.resolve('./dist')));
app.get('/', function (req, res) {
	res.sendFile(__dirname, './dist/index.html');
});
app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
	console.log('Server is running💨');
});
