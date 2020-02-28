const User = require('../models/user');

module.exports = async (req, res, next) => {
	try {
		const user = await User.findOne({ _id: req.body.id });
		if (!user) return res.status(200).send('User not found!');
		req.user = user;
		next();
	} catch (e) {
		res.status(500).send(e);
	}
};
