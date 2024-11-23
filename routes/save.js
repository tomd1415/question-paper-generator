// routes/save.js

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Handle POST request to /save
router.post('/', (req, res) => {
  const htmlContent = req.body.htmlContent;
  const filename = req.body.filename || 'generated_paper.html';

  fs.writeFile(path.join(__dirname, '..', filename), htmlContent, (err) => {
    if (err) {
      console.error('Error saving file:', err);
      res.status(500).send('Error saving file.');
    } else {
      console.log('File saved successfully as', filename);
      res.send('File saved successfully as ' + filename);
    }
  });
});

module.exports = router;

