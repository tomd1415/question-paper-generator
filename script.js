// script.js

function initializePage() {
    // Ensure font size adjustments are applied on page load
    adjustAnswerSpaces();
}

function changeFontSize() {
    var selectBox = document.getElementById("fontSizeSelector");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    document.body.className = selectedValue;
    adjustAnswerSpaces();
}

function adjustAnswerSpaces() {
    var answerSpaces = document.querySelectorAll('.answer-space textarea');
    answerSpaces.forEach(function(textarea) {
        var marks = parseInt(textarea.getAttribute('data-marks'));
        var multiplier = parseFloat(getComputedStyle(document.body).getPropertyValue('--answer-space-multiplier'));
        var baseHeight = 40 * marks; // Base height per mark at default font size
        var newHeight = baseHeight * multiplier;
        textarea.style.height = newHeight + 'px';
    });
}

var questionsData = null;

function generatePaper() {
    var fileInput = document.getElementById('fileInput');
    var titleInput = document.getElementById('titleInput').value.trim();

    if (fileInput.files.length === 0) {
        alert('Please upload a JSON file containing questions.');
        return;
    }

    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
        try {
            questionsData = JSON.parse(e.target.result);
            displayQuestions();
            if (titleInput !== '') {
                document.getElementById('paperTitle').textContent = titleInput;
            } else if (questionsData.title) {
                document.getElementById('paperTitle').textContent = questionsData.title;
            }
        } catch (error) {
            alert('Invalid JSON file. Please check the file and try again.');
        }
    };

    reader.readAsText(file);
}

function displayQuestions() {
    var container = document.getElementById('questionsContainer');
    container.innerHTML = ''; // Clear previous content

    if (!questionsData || !questionsData.questions) {
        alert('No questions found in the JSON file.');
        return;
    }

    var questionNumber = 1;

    questionsData.questions.forEach(function(question) {
        var questionDiv = document.createElement('div');
        questionDiv.className = 'question';

        var marksText = question.marks + ' mark' + (question.marks > 1 ? 's' : '');

        var questionText = '<p><strong>' + questionNumber + '.</strong> ' + question.text + ' (' + marksText + ')</p>';

        questionDiv.innerHTML = questionText;

        // Display code snippet if present
        if (question.code) {
            var codeBlock = document.createElement('div');
            codeBlock.className = 'code-block';
            var codeElement = document.createElement('code');
            codeElement.textContent = question.code;
            codeBlock.appendChild(codeElement);
            questionDiv.appendChild(codeBlock);
        }

        // Display options if present
        if (question.options && question.options.length > 0) {
            var optionsList = document.createElement('ol');
            optionsList.className = 'options-list';
            question.options.forEach(function(option) {
                var optionItem = document.createElement('li');
                optionItem.textContent = option;
                optionsList.appendChild(optionItem);
            });
            questionDiv.appendChild(optionsList);
        }

        // Create placeholder for answer space (will be filled in saved page)
        var answerSpace = document.createElement('div');
        answerSpace.className = 'answer-space';
        answerSpace.setAttribute('data-marks', question.marks);
        questionDiv.appendChild(answerSpace);

        container.appendChild(questionDiv);

        questionNumber++;
    });

    adjustAnswerSpaces();
}

function savePaper() {
    // Clone the current document
    var clonedDocument = document.cloneNode(true);

    // Remove elements with the 'no-print' class
    var elementsToRemove = clonedDocument.querySelectorAll('.no-print');
    elementsToRemove.forEach(function(element) {
        element.parentNode.removeChild(element);
    });

    // Add pupil interface to the cloned document
    addPupilInterface(clonedDocument);

    // Get the HTML content of the cloned document
    var htmlContent = '<!DOCTYPE html>\n' + clonedDocument.documentElement.outerHTML;

    var filename = prompt('Enter filename to save as (e.g., paper.html):', 'paper.html');

    if (filename) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/save', true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                alert(xhr.responseText);
            }
        };

        xhr.send(JSON.stringify({
            htmlContent: htmlContent,
            filename: filename
        }));
    }
}

function addPupilInterface(clonedDocument) {
    // Add Pupil Name field
    var headerDiv = clonedDocument.querySelector('.header');
    var infoDiv = clonedDocument.createElement('div');
    infoDiv.className = 'info';
    infoDiv.innerHTML = `
        <p>
            <label for="pupilName"><strong>Pupil Name:</strong></label>
            <input type="text" id="pupilName" placeholder="Enter your name" size="30">
        </p>
    `;
    headerDiv.parentNode.insertBefore(infoDiv, headerDiv.nextSibling);

    // Add per-question answer spaces and "Reveal Answer" buttons
    var questionDivs = clonedDocument.querySelectorAll('.question');
    questionDivs.forEach(function(questionDiv, index) {
        // Get the corresponding question data
        var question = questionsData.questions[index];

        // Replace placeholder answer space with textarea and reveal button
        var answerSpace = questionDiv.querySelector('.answer-space');
        answerSpace.innerHTML = ''; // Clear placeholder content

        var answerTextarea = clonedDocument.createElement('textarea');
        answerTextarea.setAttribute('data-question-number', index);
        answerTextarea.setAttribute('data-marks', question.marks);
        // answerTextarea.oninput = saveResponses; // Do not set event here

        answerSpace.appendChild(answerTextarea);

        // "Reveal Answer" button
        var revealButton = clonedDocument.createElement('button');
        revealButton.textContent = 'Reveal Answer';
        revealButton.setAttribute('data-question-number', index);
        // Do not set onclick here

        answerSpace.appendChild(revealButton);

        // Correct answer (hidden initially)
        var correctAnswerDiv = clonedDocument.createElement('div');
        correctAnswerDiv.className = 'correct-answer';
        correctAnswerDiv.innerHTML = '<strong>Correct Answer:</strong><br>' + question.answer;
        correctAnswerDiv.style.display = 'none'; // Hidden until "Reveal Answer" is clicked
        questionDiv.appendChild(correctAnswerDiv);

        // Comment space (hidden initially)
        var commentSpace = clonedDocument.createElement('div');
        commentSpace.className = 'comment-space';
        var commentTextarea = clonedDocument.createElement('textarea');
        commentTextarea.setAttribute('placeholder', 'Enter your comments here...');
        commentTextarea.setAttribute('data-question-number', index);
        // commentTextarea.oninput = saveResponses; // Do not set event here
        commentSpace.appendChild(commentTextarea);
        commentSpace.style.display = 'none'; // Hidden until "Reveal Answer" is clicked
        questionDiv.appendChild(commentSpace);
    });

    // Include necessary scripts in the saved page
    var scriptElement = clonedDocument.createElement('script');
    scriptElement.src = 'script.js'; // Include the external script.js file
    clonedDocument.body.appendChild(scriptElement);

    // Include initialization script
    var inlineScript = clonedDocument.createElement('script');
    inlineScript.textContent = `
        var questionsData = ${JSON.stringify(questionsData)};
        function initializeSavedPage() {
            initializePage();
            // Add event listeners for answer textareas
            var answerTextareas = document.querySelectorAll('.answer-space textarea');
            answerTextareas.forEach(function(textarea) {
                textarea.oninput = saveResponses;
            });
            // Add event listeners for comment textareas
            var commentTextareas = document.querySelectorAll('.comment-space textarea');
            commentTextareas.forEach(function(textarea) {
                textarea.oninput = saveResponses;
            });
            // Add event listeners for "Reveal Answer" buttons
            var revealButtons = document.querySelectorAll('.answer-space button');
            revealButtons.forEach(function(button) {
                var questionIndex = parseInt(button.getAttribute('data-question-number'));
                button.onclick = function() {
                    revealAnswer(questionIndex);
                };
            });
        }
        window.onload = initializeSavedPage;
    `;
    clonedDocument.body.appendChild(inlineScript);
}

// The following functions need to be available in the saved page

function revealAnswer(questionIndex) {
    // Lock the answer textarea
    var answerTextarea = document.querySelector('.answer-space textarea[data-question-number="' + questionIndex + '"]');
    if (answerTextarea) {
        answerTextarea.readOnly = true;
    }

    // Reveal the correct answer
    var correctAnswerDivs = document.querySelectorAll('.correct-answer');
    if (correctAnswerDivs[questionIndex]) {
        correctAnswerDivs[questionIndex].style.display = 'block';
    }

    // Show the comment box
    var commentSpaces = document.querySelectorAll('.comment-space');
    if (commentSpaces[questionIndex]) {
        commentSpaces[questionIndex].style.display = 'block';
    }

    // Disable the "Reveal Answer" button
    var revealButtons = document.querySelectorAll('.answer-space button');
    if (revealButtons[questionIndex]) {
        revealButtons[questionIndex].disabled = true;
    }

    // Save the current state
    saveResponses();
}

function saveResponses() {
    var pupilNameElement = document.getElementById('pupilName');
    var pupilName = pupilNameElement ? pupilNameElement.value.trim() : 'Anonymous';
    var paperTitle = document.getElementById('paperTitle').textContent.trim();
    var timestamp = new Date().toISOString();

    var responses = {
        pupilName: pupilName,
        paperTitle: paperTitle,
        timestamp: timestamp,
        questions: []
    };

    var answerTextareas = document.querySelectorAll('.answer-space textarea');
    var commentTextareas = document.querySelectorAll('.comment-space textarea');

    answerTextareas.forEach(function(textarea) {
        var questionIndex = parseInt(textarea.getAttribute('data-question-number'));
        var answer = textarea.value.trim();

        // Initialize the question object
        responses.questions[questionIndex] = responses.questions[questionIndex] || {};
        responses.questions[questionIndex].answer = answer;
    });

    commentTextareas.forEach(function(textarea) {
        var questionIndex = parseInt(textarea.getAttribute('data-question-number'));
        var comment = textarea.value.trim();

        // Initialize the question object
        responses.questions[questionIndex] = responses.questions[questionIndex] || {};
        responses.questions[questionIndex].comment = comment;
    });

    // Include the original questions
    responses.originalQuestions = questionsData.questions;

    // Send the responses to the server to be saved
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/saveResponses', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log('Responses saved successfully.');
        } else {
            console.error('Error saving responses:', xhr.responseText);
        }
    };

    xhr.send(JSON.stringify(responses));
}

