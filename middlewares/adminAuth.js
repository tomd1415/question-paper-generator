// middlewares/adminAuth.js

const db = require('../models');

module.exports = async function adminAuth(req, res, next) {
  if (req.session && req.session.userId) {
    try {
      const user = await db.User.findByPk(req.session.userId);
      if (user && ['admin', 'teacher'].includes(user.role)) {
        req.user = user; // Attach user to request
        return next();
      } else {
        return res.status(403).send('Forbidden: Insufficient permissions.');
      }
    } catch (err) {
      console.error('Error in adminAuth middleware:', err);
      return res.status(500).send('Server error during authentication.');
    }
  } else {
    return res.status(401).send('Unauthorized: No active session.');
  }
};