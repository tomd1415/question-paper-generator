// controllers/questionController.js

const db = require('../models');

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
    const { prompt, subject } = req.body;

    // Logic to generate questions based on the prompt
    // ...

    // Redirect or render the generated questions
    res.redirect('/questions/edit'); // Update as needed
  } catch (error) {
    console.error('Error generating questions:', error);
    res.status(500).send('Server error');
  }
};

