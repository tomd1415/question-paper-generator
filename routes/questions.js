// routes/questions.js

const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const adminAuth = require('../middlewares/adminAuth');

// Apply authentication middleware to all question routes
router.use(adminAuth);

// GET generate questions page
router.get('/generate', questionController.getGenerateQuestionsPage);

// POST generate questions
router.post('/generate', questionController.generateQuestions);

// Other routes for questions

module.exports = router;

