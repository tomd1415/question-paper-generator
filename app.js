// app.js

const express = require('express');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dotenv = require('dotenv');
const app = express();


// Load environment variables
dotenv.config();

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // Assuming you are using EJS templates

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize database
const db = require('./models');

// Set up session store
const sessionStore = new SequelizeStore({
  db: db.sequelize,
});

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 2 * 60 * 60 * 1000, // Session expires after 2 hours
    },
  })
);

sessionStore.sync();

// Include routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const questionsRouter = require('./routes/questions');
const saveRouter = require('./routes/save');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/questions', questionsRouter);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Error handling middleware
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.use('/save', saveRouter);
// Start the server
const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

module.exports = app;

