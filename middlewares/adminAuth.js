// middlewares/adminAuth.js

module.exports = function(req, res, next) {
  //console.log('User Session:', req.session.user); // Add this line

  if (req.path.startsWith('/admin')) {
        return next();
  }
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    return next();
  } else {
    res.redirect('/users/login'); // Redirect to login or show an error
  }
};