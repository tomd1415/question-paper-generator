// app.js

const express = require('express');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dotenv = require('dotenv');
const flash = require('connect-flash');
const app = express();
const bodyParser = require('body-parser'); // If not already included

// Load environment variables
dotenv.config();

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // Assuming you are using EJS templates

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Body-parsing middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Initialize database
const db = require('./models');

// Set up session store
const sessionStore = new SequelizeStore({
  db: db.sequelize,
});

// Sync session store
sessionStore.sync();

// Use session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Ensures the browser only sends the cookie over HTTPS in production
      maxAge: 2 * 60 * 60 * 1000, // Session expires after 2 hours
    },
  })
);

// Use flash for flash messages
app.use(flash());

// Make flash messages available in all views
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// Import routers
const adminRouter = require('./routes/admin');
const usersRouter = require('./routes/users'); // Import usersRouter
const indexRouter = require('./routes/index');
const questionsRouter = require('./routes/questions');
const saveRouter = require('./routes/save');
const papersRouter = require('./routes/papers');

// Register Routes After Middleware
app.use('/', indexRouter);
app.use('/users', usersRouter); // Register usersRouter
app.use('/questions', questionsRouter);
app.use('/admin', adminRouter);
app.use('/save', saveRouter);
app.use('/papers', papersRouter);


// Error handling middleware
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

module.exports = app;

