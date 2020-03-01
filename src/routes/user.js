const express = require('express');
const router = express.Router();

// middleware
const auth = require('../middleware/auth');

// controller
const UserController = require('../controllers/user');

// routes
router.get('/users', UserController.getUsers);
router.get('/users/profile', auth, UserController.profile);
router.get('/user/:id', UserController.getUserById);
router.post('/user', UserController.store);
router.post('/user/login', UserController.login);
router.patch('/user/:id', UserController.update);
router.delete('/user/:id', UserController.delete);

module.exports = router;
