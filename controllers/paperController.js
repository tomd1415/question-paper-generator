// controllers/paperController.js
const db = require('../models'); // Adjust the path if necessary
exports.viewPaper = async (req, res) => {
  try {
    const { paperId } = req.params;

    // Fetch the paper and associated questions
    const paper = await db.Paper.findOne({
      where: { id: paperId },
      include: [
        {
          model: db.Question,
          as: 'questions',
        },
      ],
    });

    if (!paper) {
      return res.status(404).send('Paper not found.');
    }

    res.render('viewpaper', { paper });
  } catch (error) {
    console.error('Error fetching paper:', error);
    res.status(500).send('Server error.');
  }
};

exports.getEditPaper = async (req, res) => {
    try {
      const { paperId } = req.params;
  
      // Fetch the paper and its questions
      const paper = await db.Paper.findOne({
        where: { id: paperId },
        include: [
          {
            model: db.Question,
            as: 'questions',
          },
        ],
      });
  
      if (!paper) {
        return res.status(404).send('Paper not found.');
      }
  
      res.render('editpaper', { paper });
    } catch (error) {
      console.error('Error fetching paper for editing:', error);
      res.status(500).send('Server error.');
    }
  };

  // controllers/paperController.js

exports.updatePaper = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
      const { paperId } = req.params;
      const { title, questions } = req.body; // 'questions' should be an array
  
      // Fetch the paper to ensure it exists
      const paper = await db.Paper.findOne({
        where: { id: paperId },
        include: [{ model: db.Question, as: 'questions' }],
        transaction,
      });
  
      if (!paper) {
        await transaction.rollback();
        return res.status(404).send('Paper not found.');
      }
  
      // Update paper title
      paper.title = title || paper.title;
      await paper.save({ transaction });
  
      // Iterate over each question to update
      for (let index in questions) {
        const q = questions[index];
        const question = await db.Question.findOne({
          where: { id: q.id, paperId: paperId },
          transaction,
        });
  
        if (question) {
          question.questionText = q.questionText || question.questionText;
          question.marks = q.marks || question.marks;
          question.codeSnippet = q.codeSnippet || question.codeSnippet;
          
          // Handle options: split by new lines into an array
          question.options = q.options
            ? q.options.split('\n').map(opt => opt.trim()).filter(opt => opt.length > 0)
            : question.options;
  
          question.answer = q.answer || question.answer;
  
          // Determine question type based on options
          question.questionType = question.options && question.options.length > 0
            ? 'multiple-choice'
            : 'short-answer';
  
          await question.save({ transaction });
        }
      }
  
      // Commit the transaction
      await transaction.commit();
  
      // Redirect to the updated paper view
      res.redirect(`/papers/${paper.id}`);
    } catch (error) {
      await transaction.rollback();
      console.error('Error updating paper:', error);
      res.status(500).send('An error occurred while updating the paper.');
    }
  };