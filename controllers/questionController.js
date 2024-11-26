// controllers/questionController.js

const OpenAI = require("openai").default; // Adjusted for CommonJS
const db = require('../models'); // Ensure correct path
const sequelize = require('sequelize');

// Initialize OpenAI configuration
const openai = new OpenAI({
  //organization: "Exhall_Grange", // Replace with your organization ID
  //project: "Exam_paper_gen", // Replace with your project ID
  apiKey: process.env.OPENAI_API_KEY, // Ensure this environment variable is set
});

const getGenerateQuestionsPage = async (req, res) => {
  try {
    // Fetch subjects from the database to populate the dropdown
    const subjects = await db.Subject.findAll();
    res.render('generatequestions', { subjects });
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).send('Server error');
  }
};

const generateQuestions = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    console.log('generateQuestions - req.user:', req.user); // Debug log

    const { prompt, subject, title } = req.body;

    // Ensure prompt is a string
    if (typeof prompt !== 'string' || !prompt.trim()) {
      await transaction.rollback();
      return res.status(400).send('Invalid prompt provided.');
    }

    // Call OpenAI API with the prompt
    const response = await openai.chat.completions.create({
      model: 'gpt-4o', // Corrected model name
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2048,
      temperature: 0.7,
      response_format: {"type": "json_object"},
    });

    // Extract the assistant's reply
    const assistantReply = response.choices[0].message.content.trim();

    // Parse the assistant's reply as JSON
    let generatedData;
    try {
      generatedData = JSON.parse(assistantReply);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      console.error('Assistant Reply:', assistantReply);
      await transaction.rollback();
      return res.status(500).send('Failed to parse generated questions. Ensure the prompt requests JSON output.');
    }

    if (!generatedData.questions || !Array.isArray(generatedData.questions)) {
      await transaction.rollback();
      return res.status(400).send('Invalid questions format received from AI.');
    }

    // Get the logged-in teacher's ID
    const teacherId = req.user.id; // Ensure authentication middleware is applied

    // Create a new Paper record
    const paper = await db.Paper.create({
      staffUserId: teacherId,
      title: generatedData.title || title,
      subjectId: subject,
      // Add other necessary fields
    }, { transaction });

    // Save questions to the database
    for (let i = 0; i < generatedData.questions.length; i++) {
      const q = generatedData.questions[i];

      // Validate options if multiple-choice
      if (q.options && !Array.isArray(q.options)) {
        throw new Error('Options must be an array for multiple-choice questions.');
      }

      await db.Question.create({
        paperId: paper.id,
        questionNumber: i + 1,
        staffUserId: teacherId,
        questionText: q.text || q.questionText,
        marks: q.marks || 1,
        codeSnippet: q.code || q.codeSnippet || null,
        options: Array.isArray(q.options) ? q.options : null,
        answer: q.answer || null,
        questionType: Array.isArray(q.options) ? 'multiple-choice' : 'short-answer',
        // Add other necessary fields
      }, { transaction });
    }

    await transaction.commit();

    // Redirect to a page to view the generated paper
    res.redirect(`/papers/${paper.id}`);

  } catch (error) {
    await transaction.rollback();
    console.error('Error generating questions:', error);
    res.status(500).send('An error occurred while generating questions.');
  }
};

// Export functions
module.exports = {
  getGenerateQuestionsPage,
  generateQuestions,
};

