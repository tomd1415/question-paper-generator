const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
const upload = multer();

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint to receive the generated HTML and save it on the server
app.post('/save', (req, res) => {
  const htmlContent = req.body.htmlContent;
  const filename = req.body.filename || 'generated_paper.html';

  fs.writeFile(path.join(__dirname, filename), htmlContent, (err) => {
    if (err) {
      console.error('Error saving file:', err);
      res.status(500).send('Error saving file.');
    } else {
      console.log('File saved successfully as', filename);
      res.send('File saved successfully as ' + filename);
    }
  });
});

// Endpoint to save pupil responses
app.post('/saveResponses', (req, res) => {
  const responses = req.body;
  const pupilName = responses.pupilName || 'Anonymous';
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const sanitizedPupilName = pupilName.replace(/[^a-z0-9]/gi, '_'); // Sanitize pupil name
  const filename = `responses_${sanitizedPupilName}_${timestamp}.json`;

  fs.writeFile(path.join(__dirname, 'responses', filename), JSON.stringify(responses, null, 2), (err) => {
    if (err) {
      console.error('Error saving responses:', err);
      res.status(500).send('Error saving responses.');
    } else {
      console.log('Responses saved successfully as', filename);
      res.send('Responses saved successfully.');
    }
  });
});

// Ensure the 'responses' directory exists
if (!fs.existsSync(path.join(__dirname, 'responses'))) {
  fs.mkdirSync(path.join(__dirname, 'responses'));
}

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

