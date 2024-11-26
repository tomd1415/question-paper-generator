// routes/papers.js

const express = require('express');
const router = express.Router();
const paperController = require('../controllers/paperController');

// Route to display a specific paper and its questions
router.get('/:paperId', paperController.viewPaper);

// New Routes for Editing Paper
// Route to display the edit form
router.get('/:paperId/edit', paperController.getEditPaper);

// Route to handle form submission for editing
router.post('/:paperId/edit', paperController.updatePaper);

module.exports = router;