// middlewares/adminAuth.js

const db = require('../models');

module.exports = async function adminAuth(req, res, next) {
  if (req.session && req.session.user && req.session.user.id) {
    try {
      const user = await db.User.findByPk(req.session.user.id);
      if (user && ['admin', 'teacher', 'staff'].includes(user.role)) {
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