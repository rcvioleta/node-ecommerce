const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');

router.get('/users', UserController.getUsers);

router.get('/user/:id', UserController.getUserById);

module.exports = router;
