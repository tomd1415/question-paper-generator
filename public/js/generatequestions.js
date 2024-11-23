function initializePage() {
    // Add event listener to topics input to show/hide topic focus section
    document.getElementById('topicsInput').addEventListener('input', function() {
        var topics = document.getElementById('topicsInput').value.trim();
        var topicFocusSection = document.getElementById('topicFocusSection');
        if (topics.length > 0) {
            topicFocusSection.style.display = 'block';
        } else {
            topicFocusSection.style.display = 'none';
        }
    });
}

function generatePrompt() {
    // Get user inputs
    var subject = document.getElementById('subjectInput').value.trim();
    var specification = document.getElementById('specificationInput').value.trim();
    var difficulty = document.getElementById('difficultyInput').value.trim();
    var numQuestions = document.getElementById('numQuestionsInput').value.trim();
    var title = document.getElementById('titleInput').value.trim();
    var exampleQuestionsText = document.getElementById('exampleQuestionsInput').value.trim();
    var topicsText = document.getElementById('topicsInput').value.trim();
    var topicFocus = document.getElementById('topicFocusSelect').value;

    // Split example questions into an array
    var exampleQuestions = exampleQuestionsText.split('\n').map(function(q) {
        return q.trim();
    }).filter(function(q) {
        return q.length > 0;
    });

    // Split topics into an array
    var topics = topicsText.split('\n').map(function(t) {
        return t.trim();
    }).filter(function(t) {
        return t.length > 0;
    });

    // Build the prompt
    var prompt = `
**Instructions for the AI System:**

- **Audience and Language:**
  - Generate a set of educational questions for a **UK school audience**, written in **British English**.

- **Subject and Specification:**
  - **Subject:** *${subject}*.
  - **Specification/Curriculum Guidelines:** *${specification}*.

- **Difficulty Level:**
  - The questions should be appropriate for students who are *${difficulty}*.
`;

    // Add topics if provided
    if (topics.length > 0) {
        prompt += `
- **Topics to be Covered:**
`;
        for (var i = 0; i < topics.length; i++) {
            prompt += `  - ${topics[i]}\n`;
        }

        // Add topic focus
        if (topicFocus === 'only') {
            prompt += `
  - Focus: Only generate questions related to the listed topics.
`;
        } else if (topicFocus === 'mostly') {
            prompt += `
  - Focus: Primarily generate questions related to the listed topics but include a few questions from related topics.
`;
        }
    }

    prompt += `
- **Question Format and Types:**
  - Include a variety of question types, such as multiple-choice, short answer, and explanatory questions.
  - Ensure the questions are clear, concise, and unambiguous.

- **JSON Format Requirements:**
  - Provide the questions in the following JSON format:

    \`\`\`json
    {
      "title": "${title}",
      "questions": [
        {
          "text": "[Question text]",
          "marks": [Number of marks],
          "code": "[Optional code snippet if applicable]",
          "options": ["[Option 1]", "[Option 2]", "..."],
          "answer": "[Correct answer or explanation]"
        }
        // Additional questions...
      ]
    }
    \`\`\`

  - **Field Descriptions:**
    - \`"title"\`: The title of the question paper.
    - \`"questions"\`: An array of question objects.
      - \`"text"\`: The question text.
      - \`"marks"\`: The number of marks allocated for the question.
      - \`"code"\` (optional): Any relevant code snippets (for programming questions).
      - \`"options"\` (optional): An array of answer options (for multiple-choice questions).
      - \`"answer"\`: The correct answer or a detailed explanation.

- **Number of Questions:**
  - Generate **${numQuestions}** questions.

- **Example Questions:**
`;

    if (exampleQuestions.length > 0) {
        for (var i = 0; i < exampleQuestions.length; i++) {
            prompt += `  ${i + 1}. "${exampleQuestions[i]}"\n`;
        }
        prompt += `
- **Important Note:** Do not include the example questions as questions in the output.
`;
    } else {
        prompt += `  - No example questions provided.
`;
    }

    // Set the generated prompt in the output textarea
    document.getElementById('promptOutput').value = prompt;
}

