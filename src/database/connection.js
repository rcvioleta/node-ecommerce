const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/ecommerce';

const options = {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
};

mongoose.connect(url, options);
