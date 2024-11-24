
# Question Paper Generator

An open-source web application designed to streamline the creation, distribution, and grading of educational assessments. It provides educators with tools to generate question papers, edit questions, incorporate images, and automatically mark certain question types.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Steps](#steps)
- [Configuration](#configuration)
  - [Database Configuration](#database-configuration)
- [Usage](#usage)
  - [Starting the Server](#starting-the-server)
  - [Accessing the Application](#accessing-the-application)
  - [Staff Workflow](#staff-workflow)
  - [Pupil Workflow](#pupil-workflow)
- [Database Setup](#database-setup)
- [Scripts and Stylesheets](#scripts-and-stylesheets)
- [Security Considerations](#security-considerations)
- [Next Steps](#next-steps)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Introduction

The Question Paper Generator is a web application designed to streamline the creation, distribution, and grading of educational assessments. It allows teachers to generate customized question papers, edit questions, incorporate images, and automatically mark certain question types. Pupils can interact with these papers, answer questions, and receive immediate feedback.

---

## Features

- **Question Generation**: Generate questions from JSON files or by pasting JSON directly into the application.
- **Question Editing**: Edit questions and answers directly within the application. Changes are automatically saved to the database.
- **User Authentication**: Secure login for staff and pupils, with role-based access control.
- **Per-Question Answer Reveal**: Pupils can reveal answers for individual questions, locking their responses and allowing for self-assessment.
- **Pupil Response Tracking**: Store pupil answers connected to the original question sheets and pupil profiles.
- **Multiple Choice Support**: Pupils can select answers for multiple-choice questions, with options for automatic marking.
- **Auto-Marking**: Automatically mark answers that are straightforward to assess (e.g., multiple-choice, numerical answers).
- **Image and Diagram Support**: Add images and diagrams to questions to enhance understanding.
- **Accessibility Features**: Adjustable font sizes and other features to improve accessibility.
- **Printing Options**: Customize printing settings, including the number of questions per page and answer box sizes.
- **User Interface**: Intuitive menus and navigation for easy use by staff and pupils.

---

## Project Structure

```
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
```

---

## Technologies Used

### Backend:
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM

### Frontend:
- HTML5
- CSS3
- JavaScript (ES6+)
- EJS Templates

### Authentication:
- express-session for session management
- bcrypt for password hashing

### File Handling:
- multer for handling file uploads

### Miscellaneous:
- dotenv for environment variable management

---

## Installation

### Prerequisites

- Node.js (v14 or higher recommended)
- npm (comes with Node.js)
- PostgreSQL (v12 or higher)

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/tomd1415/question-paper-generator.git
   cd question-paper-generator
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory with the following:

   ```env
   DB_USER=your_db_username
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_DIALECT=postgres
   SESSION_SECRET=your_session_secret
   PORT=3000
   ```

---

[Full content continues with detailed workflows and contribution instructions.]
