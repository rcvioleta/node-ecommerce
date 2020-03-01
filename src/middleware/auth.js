const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
	try {
		const token = req.header('Authorization').replace('Bearer ', '');
		const decoded = jwt.verify(token, 'node-ecommerce');
		const user = await User.findOne({ _id: decoded._id });

		if (!user) return res.status(200).send({ error: 'User not found!' });

		req.user = user;
		req.token = token;

		next();
	} catch (e) {
		res.status(500).send(e);
	}
};
