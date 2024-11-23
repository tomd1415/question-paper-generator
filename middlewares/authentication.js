// middlewares/authentication.js

module.exports = function(req, res, next) {
  if (req.session && req.session.user && req.session.user.role === 'staff') {
    return next();
  } else {
    res.redirect('/users/login');
  }
};

