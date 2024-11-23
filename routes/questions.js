// routes/questions.js

const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const authenticationMiddleware = require('../middlewares/authentication');

// GET generate questions page
router.get('/generate', authenticationMiddleware, questionController.getGenerateQuestionsPage);

// POST generate questions
router.post('/generate', authenticationMiddleware, questionController.generateQuestions);

// Other routes for questions

module.exports = router;

