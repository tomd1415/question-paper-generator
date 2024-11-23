Question Paper Generator
Table of Contents

    Introduction
    Features
    Project Structure
    Technologies Used
    Installation
    Configuration
    Usage
        Starting the Server
        Accessing the Application
        Staff Workflow
        Pupil Workflow
    Database Setup
    Scripts and Stylesheets
    Security Considerations
    Next Steps
    Contributing
    License

Introduction

The Question Paper Generator is a web application designed to streamline the creation, distribution, and grading of educational assessments. It allows teachers to generate customized question papers, edit questions, incorporate images, and automatically mark certain question types. Pupils can interact with these papers, answer questions, and receive immediate feedback.
Features

    Question Generation: Generate questions from JSON files or by pasting JSON directly into the application.
    Question Editing: Edit questions and answers directly within the application. Changes are automatically saved to the database.
    User Authentication: Secure login for staff and pupils, with role-based access control.
    Per-Question Answer Reveal: Pupils can reveal answers for individual questions, locking their responses and allowing for self-assessment.
    Pupil Response Tracking: Store pupil answers connected to the original question sheets and pupil profiles.
    Multiple Choice Support: Pupils can select answers for multiple-choice questions, with options for automatic marking.
    Auto-Marking: Automatically mark answers that are straightforward to assess (e.g., multiple-choice, numerical answers).
    Image and Diagram Support: Add images and diagrams to questions to enhance understanding.
    Accessibility Features: Adjustable font sizes and other features to improve accessibility.
    Printing Options: Customize printing settings, including the number of questions per page and answer box sizes.
    User Interface: Intuitive menus and navigation for easy use by staff and pupils.

Project Structure

your-project/
├── app.js
├── package.json
├── package-lock.json
├── .env
├── config/
│   └── config.js
├── controllers/
│   ├── questionController.js
│   └── userController.js
├── helpers/
│   └── utils.js
├── middlewares/
│   └── authentication.js
├── models/
│   ├── index.js
│   ├── prompt.js
│   ├── pupilAnswer.js
│   ├── question.js
│   ├── specification.js
│   ├── subject.js
│   ├── topic.js
│   └── user.js
├── public/
│   ├── css/
│   │   ├── styles.css
│   │   └── generatequestions.css
│   ├── images/
│   │   └── questions/
│   └── js/
│       ├── script.js
│       └── generatequestions.js
├── routes/
│   ├── index.js
│   ├── users.js
│   ├── questions.js
│   └── save.js
├── uploads/
│   └── questions/
├── views/
│   ├── index.ejs
│   ├── generatequestions.ejs
│   └── ...
├── logs/
├── migrations/
├── seeders/
├── responses/
└── README.md

Technologies Used

    Backend:
        Node.js
        Express.js
        PostgreSQL
        Sequelize ORM
    Frontend:
        HTML5
        CSS3
        JavaScript (ES6+)
        EJS Templates
    Authentication:
        express-session for session management
        bcrypt for password hashing
    File Handling:
        multer for handling file uploads
    Miscellaneous:
        dotenv for environment variable management

Installation
Prerequisites

    Node.js (v14 or higher recommended)
    npm (comes with Node.js)
    PostgreSQL (v12 or higher)

Steps

    Clone the Repository

git clone https://github.com/yourusername/question-paper-generator.git
cd question-paper-generator

Install Dependencies

npm install

Set Up Environment Variables

Create a .env file in the root directory:

    DB_USER=your_db_username
    DB_PASSWORD=your_db_password
    DB_NAME=your_db_name
    DB_HOST=127.0.0.1
    DB_PORT=5432
    DB_DIALECT=postgres
    SESSION_SECRET=your_session_secret
    PORT=3000

    Set Up the Database

    Ensure PostgreSQL is installed and running. See Database Setup for detailed instructions.

Configuration
Database Configuration

Database settings are stored in config/config.js and use environment variables from the .env file.

// config/config.js

require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'your_username',
    password: process.env.DB_PASSWORD || 'your_password',
    database: process.env.DB_NAME || 'your_database_name',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 5432,
    dialect: process.env.DB_DIALECT || 'postgres',
  },
  // Add production and test configurations as needed
};

Usage
Starting the Server

npm start

The server will start on the port specified in your .env file (default is 3000).
Accessing the Application

    Staff Interface: http://localhost:3000/users/login
    Pupil Interface: http://localhost:3000/users/login

Staff Workflow

    Register or Log In
        Navigate to the staff login page and authenticate.

    Generate Questions
        Access the "Generate Questions" page.
        Upload a JSON file or paste JSON directly into the provided textarea.
        Optionally, enter a prompt for question generation.

    Edit Questions
        After generating, edit the questions and answers as needed.
        Upload images or diagrams to enhance questions.
        Changes are automatically saved to the database.

    Assign Question Sheets
        Assign the question sheets to pupils or groups.
        Set availability and due dates as necessary.

    Review Pupil Responses
        Access pupil submissions.
        Auto-marked questions are already graded.
        Manually mark open-ended questions.
        Provide feedback and adjust marks if necessary.

    Print Options
        Customize printing settings.
        Print question sheets or answer keys as needed.

Pupil Workflow

    Register or Log In
        Navigate to the pupil login page and authenticate.

    Access Assigned Question Sheets
        View a list of assigned question sheets.
        Select a question sheet to begin.

    Answer Questions
        Provide answers in the provided fields.
        For multiple-choice questions, select the appropriate options.
        Answers are automatically saved.

    Reveal Answers
        After answering, use the "Reveal Answer" button for each question.
        The answer field locks, and the correct answer is displayed.
        A comment box appears for self-reflection.

    Receive Feedback
        View marks and feedback provided by the teacher.
        Review auto-marked results immediately after revealing answers.

    Printing
        Use the print options to print the question sheet if needed.

Database Setup
Install PostgreSQL

Follow the official installation guide for your operating system: PostgreSQL Downloads
Create Database and User

    Access PostgreSQL CLI

sudo -i -u postgres
psql

Create a User

CREATE USER your_username WITH PASSWORD 'your_password';

Create a Database

CREATE DATABASE your_database_name OWNER your_username;

Grant Privileges

GRANT ALL PRIVILEGES ON DATABASE your_database_name TO your_username;

Exit

    \q
    exit

Run Migrations

If using Sequelize migrations:

npx sequelize db:migrate

Seed the Database

If you have seed files:

npx sequelize db:seed:all

Scripts and Stylesheets
Client-Side Scripts

    public/js/script.js: Contains common JavaScript functions used across the application.
    public/js/generatequestions.js: Contains scripts specific to the "Generate Questions" page.

Stylesheets

    public/css/styles.css: Contains common styles for the application.
    public/css/generatequestions.css: Styles specific to the "Generate Questions" page.

Security Considerations

    Password Security: All passwords are hashed using bcrypt before storing in the database.
    Input Validation: Inputs are validated on both client and server sides to prevent SQL injection and XSS attacks.
    Session Management: Secure session handling with express-session and connect-session-sequelize.
    File Uploads: Uploaded files are validated, and storage paths are secured to prevent unauthorized access.
    Access Control: Role-based access control ensures that staff and pupils have appropriate permissions.
    Data Protection: Pupil responses and sensitive data are stored securely and are not publicly accessible.

Next Steps
Phase 1: Database Enhancements

    Finalize Database Schema: Ensure all necessary tables and relationships are correctly defined.
    Implement Image Fields: Incorporate image support in the questions table and handle image uploads securely.

Phase 2: Question Editing and Generation

    Editable Questions: Enable editing of questions after generation, with automatic saving to the database.
    JSON Input Option: Allow staff to paste JSON directly into the application for question generation.

Phase 3: Printing and Accessibility

    Improve Print Formatting: Enhance print styles to ensure question papers are well-formatted for printing.
    Accessibility Features: Make font size adjustments and other accessibility options more prominent and user-friendly.

Phase 4: Authentication and Authorization

    User Registration and Login: Implement secure authentication for staff and pupils.
    Role-Based Access Control: Ensure that only authorized users can access certain features.

Phase 5: Pupil Interaction Enhancements

    Lock Answer Boxes: Ensure that answer boxes are locked after pupils reveal the correct answer.
    Connect Answers to Pupils: Store pupil responses linked to their user profiles and the original questions.

Phase 6: Auto-Marking and Multiple Choice

    Auto-Marking Implementation: Automatically mark multiple-choice and numerical answers.
    Staff Review Interface: Create an interface for staff to review and adjust auto-marked answers.

Phase 7: User Interface Improvements

    Intuitive Navigation: Develop user-friendly menus and navigation.
    Responsive Design: Ensure the application is responsive and accessible on various devices.

Phase 8: Additional Features

    Advanced Printing Options: Add settings for questions per page, answer box sizes, and including answer sheets.
    Question Type Selection: Allow staff to select question types and specify their distribution.
    Custom Question Creation: Enable staff to create question sheets from scratch.
    Image and Diagram Support: Allow staff to add images and diagrams to questions.

Contributing

Contributions are welcome! Please follow these steps:

    Fork the Repository

git fork https://github.com/tomd1415/question-paper-generator.git

Create a Feature Branch

git checkout -b feature/your-feature-name

Commit Your Changes

git commit -am 'Add some feature'

Push to the Branch

    git push origin feature/your-feature-name

    Open a Pull Request

License

This project is licensed under the MIT License - see the LICENSE file for details.

Note: This README provides an overview of the project and outlines the steps needed to set up and use the application. It also details the planned next steps for project development. Please ensure that all environment variables and configurations are set correctly before running the application.

For any issues or questions, please contact your-email@example.com.
