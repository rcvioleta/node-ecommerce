const User = require('../models/user');

exports.getUsers = async (req, res, next) => {
	try {
		const users = await User.find({});
		res.status(200).send(users);
	} catch (e) {
		res.status(500).send(e);
	}
};

exports.getUserById = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(204).send('User not found!');
		}
		res.status(200).send(user);
	} catch (e) {
		res.status(500).send(e);
	}
};
