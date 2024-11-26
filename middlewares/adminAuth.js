// middlewares/adminAuth.js

module.exports = function(req, res, next) {
  if (req.path.startsWith('/admin')) {
        return next();
  }
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    return next();
  } else {
    res.redirect('/users/login'); // Redirect to login or show an error
  }
};