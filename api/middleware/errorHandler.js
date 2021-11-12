function errorHandler(error, req, res, next) {
	if (error.status) {
		res.status(error.status);
		res.send({ error: error.message });
	} else {
		res.status(500);
		res.send({ error: 'Internal Server Error, please try again later😬' });
	}
}

module.exports = errorHandler;
