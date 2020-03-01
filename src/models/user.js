const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
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
	},
	tokens: [
		{
			token: {
				type: String,
				required: true
			}
		}
	]
});

userSchema.pre('save', async function(next) {
	const user = this;
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});

userSchema.statics.authenticate = async function(email, password) {
	try {
		const user = await this.findOne({ email });
		if (!user) throw new Error('User not found!');

		const matched = await bcrypt.compare(password, user.password);
		if (!matched) throw new Error('Invalid login credentials');
		return user;
	} catch (e) {
		res.status(500).send(e);
	}
};

userSchema.methods.toJSON = function() {
	const user = this;
	const userObject = user.toObject();

	return Object.keys(userObject).reduce((obj, key) => {
		if (![ 'password', 'tokens' ].includes(key)) {
			obj[key] = userObject[key];
		}
		return obj;
	}, {});
};

userSchema.methods.generateAuthToken = async function() {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, 'node-ecommerce');

	user.tokens.push({ token });
	await user.save();

	return token;
};

module.exports = mongoose.model('user', userSchema);
