// controllers/usersController.js

const db = require('../models');
const bcrypt = require('bcryptjs');

// Render the login page
exports.getLoginPage = (req, res) => {
  res.render('login', { error: null });
};

// Process login form submission
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await db.User.findOne({ where: { username } });

    if (!user) {
      // User not found
      req.flash('error', 'Invalid username or password.');
      return res.redirect('/users/login');
    }

    // Compare submitted password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      // Password does not match
      req.flash('error', 'Invalid username or password.');
      return res.redirect('/users/login');
    }

    // Set user info in session
    req.session.user = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    // Redirect based on role
    if (user.role === 'admin') {
      return res.redirect('/admin/dashboard'); // Adjust the redirect path as needed
    } else if (user.role === 'staff') {
      return res.redirect('/staff/dashboard'); // Adjust the redirect path as needed
    } else if (user.role === 'pupil') {
      return res.redirect('/pupil/dashboard'); // Adjust the redirect path as needed
    } else {
      // Default redirect
      return res.redirect('/');
    }
  } catch (error) {
    console.error('Error during login:', error);
    req.flash('error', 'Server error. Please try again later.');
    res.redirect('/users/login');
  }
};

// Handle logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return res.redirect('/');
    }
    res.clearCookie('connect.sid'); // Name might vary based on your session configuration
    res.redirect('/users/login');
  });
};