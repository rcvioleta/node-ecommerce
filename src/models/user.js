const mongoose = require('mongoose');

const User = mongoose.model('user', {
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercased: true,
		validate: (email) => {
			const regex = /\S.\S@\S.\S/;
			if (!regex.test(email)) {
				throw new Error('Invalid email format!');
			}
		}
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minLength: 6
	}
});

module.exports = User;
