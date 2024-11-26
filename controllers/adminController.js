// controllers/adminController.js

const db = require('../models');
const bcrypt = require('bcryptjs');

exports.getAddUserPage = (req, res) => {
  res.render('addUser', { error: null, success: null });
};

exports.createUser = async (req, res) => {
  try {
    console.log('Request Body:', req.body);

    const { username, password, confirmPassword, role } = req.body;

    // Check if password and confirmation match
    if (password !== confirmPassword) {
      return res.render('addUser', { error: 'Passwords do not match.', success: null });
    }

    // Check for duplicate username
    const existingUser = await db.User.findOne({ where: { username } });
    if (existingUser) {
      return res.render('addUser', { error: 'Username already exists.', success: null });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    await db.User.create({
      username,
      password: hashedPassword,
      role,
    });

    // Render the form with a success message and clear previous errors
    res.render('addUser', { error: null, success: 'User added successfully.' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Server error');
  }
};