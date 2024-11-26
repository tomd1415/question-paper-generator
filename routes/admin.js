// routes/admin.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
//const adminAuth = require('../middlewares/adminAuth');

// Apply adminAuth middleware to all admin routes
//router.use(adminAuth);

// GET request to display the Add User page
router.get('/add-user', adminController.getAddUserPage);

// POST request to handle user creation
router.post('/add-user', adminController.createUser);

module.exports = router;