// routes/papers.js

const express = require('express');
const router = express.Router();
const paperController = require('../controllers/paperController');

// Route to display a specific paper and its questions
router.get('/:paperId', paperController.viewPaper);

module.exports = router;