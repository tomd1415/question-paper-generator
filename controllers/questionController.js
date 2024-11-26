// controllers/questionController.js

const db = require('../models');
const bcrypt = require('bcryptjs');

exports.getGenerateQuestionsPage = async (req, res) => {
  try {
    // Fetch subjects from the database to populate the dropdown
    const subjects = await db.Subject.findAll();
    res.render('generatequestions', { subjects });
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).send('Server error');
  }
};

exports.generateQuestions = async (req, res) => {
  try {
    const { prompt, subject, title } = req.body;

    // Here you can integrate with an AI service or your question generation logic
    // For example, sending the prompt to OpenAI's API and receiving generated questions

    // Example pseudo-code:
    /*
    const generatedQuestions = await aiService.generateQuestions(prompt);
    // Save the generated questions to the database
    await db.Question.bulkCreate(generatedQuestions);
    */

    // For demonstration, we'll just log the prompt
    console.log('Received Prompt:', prompt);

    // Redirect to an edit page or display the generated questions
    res.redirect('/questions/edit'); // Update as needed
  } catch (error) {
    console.error('Error generating questions:', error);
    res.status(500).send('Server error');
  }
};

