require('../src/database/connection');

const User = require('../src/models/user');

User.findByIdAndDelete('5e4dd5fedb63c22f4c976564')
	.then((res) => {
		return User.countDocuments({});
	})
	.then((userCount) => {
		console.log('Total number of users: ', userCount);
	})
	.catch((e) => {
		console.log('Error found: ', e);
	});
