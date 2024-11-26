// routes/users.js

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// GET users listing
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// GET login page
router.get('/login', usersController.getLoginPage);

// POST login form submission
router.post('/login', usersController.login);

// GET logout
router.get('/logout', usersController.logout);

module.exports = router;

