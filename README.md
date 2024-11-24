# Question Paper Generator

An open-source web application designed to streamline the creation, distribution, and grading of educational assessments. It provides educators with tools to generate question papers, edit questions, incorporate images, and automatically mark certain question types.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Installation](#installation)

---

## Introduction

The Question Paper Generator is a web application designed to streamline the creation, distribution, and grading of educational assessments. Teachers can generate question papers, edit questions, incorporate images, and automatically mark certain question types. Pupils can interact with these papers, answer questions, and receive immediate feedback.

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
│   ├── js/
│   │   ├── script.js
│   │   └── generatequestions.js
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
├── old/
│   ├── Year10Revision.html
│   ├── paper3.html
│   ├── test11.html
│   ├── test3.html
│   ├── test4.html
│   ├── testpaper.html
│   ├── year10-2.html
│   └── year10.html
└── README.md

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

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/tomd1415/question-paper-generator.git
   cd question-paper-generator
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:

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

## Configuration

### Database Configuration

Database settings are stored in `config/config.js` and use environment variables from the `.env` file.

```javascript
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
```

---

## Usage

### Starting the Server

Run the following command:

```bash
npm start
```

The server will start on the port specified in your `.env` file (default is `3000`).

### Accessing the Application

- **Staff Interface**: [http://localhost:3000/users/login](http://localhost:3000/users/login)
- **Pupil Interface**: [http://localhost:3000/users/login](http://localhost:3000/users/login)

## Database Setup

1. **Access PostgreSQL CLI**:

   ```bash
   sudo -i -u postgres psql
   ```

2. **Create a User**:

   ```sql
   CREATE USER your_username WITH PASSWORD 'your_password';
   ```

3. **Create a Database**:

   ```sql
   CREATE DATABASE your_database_name OWNER your_username;
   ```

4. **Grant Privileges**:

   ```sql
   GRANT ALL PRIVILEGES ON DATABASE your_database_name TO your_username;
   ```

5. **Run Migrations**:

   ```bash
   npx sequelize db:migrate
   ```

---

## Next Steps

### Phase 1: Database Enhancements

1. **Finalize Database Schema**:
   - Ensure all necessary tables and relationships are correctly defined.
   - Include fields for storing metadata, such as timestamps for question creation and updates.
   - Implement proper indexing for frequently accessed columns to optimise performance.

2. **Image Fields**:
   - Add support for image fields in the `questions` table.
   - Ensure images can be uploaded securely and linked to specific questions.

3. **Data Validation**:
   - Implement stricter validation rules at the database level to ensure data consistency.
   - Add constraints to prevent duplicate or invalid entries.

4. **Testing and Optimization**:
   - Perform load testing to evaluate the database's ability to handle concurrent users.
   - Optimize queries for better performance, especially for large datasets.

---

### Phase 2: Question Editing and Generation

1. **Editable Questions**:
   - Allow educators to edit questions post-generation.
   - Ensure all changes are automatically saved to the database.

2. **Advanced Generation Options**:
   - Add options for educators to specify the difficulty level, topic, and question type during generation.
   - Include a preview feature to review generated questions before finalizing.

3. **JSON Input Option**:
   - Enable educators to paste JSON directly into the application for question generation.
   - Provide a clear JSON schema or template for users to follow.

4. **Real-Time Validation**:
   - Validate JSON inputs in real time to prevent errors during processing.
   - Highlight issues and provide suggestions for corrections.

---

### Phase 3: Printing and Accessibility

1. **Print Formatting**:
   - Develop enhanced print styles to ensure question papers are well-formatted.
   - Add page numbering and customizable headers/footers to printed sheets.

2. **Accessibility Features**:
   - Allow users to adjust font sizes, line spacing, and contrast settings for better readability.
   - Ensure the interface is fully navigable using keyboard-only inputs.

3. **Answer Sheet Options**:
   - Provide educators with the option to print answer sheets alongside question papers.
   - Include a toggle for whether correct answers should be included.

4. **Language and Localisation**:
   - Add support for generating question papers in multiple languages.
   - Allow educators to specify language preferences for questions and instructions.

---

### Phase 4: Authentication and Authorization

1. **User Registration**:
   - Implement secure registration for educators and pupils.
   - Allow registration through invitation links or admin approval for additional security.

2. **Role-Based Access Control (RBAC)**:
   - Define user roles such as Admin, Teacher, and Pupil.
   - Restrict access to features based on roles (e.g., only admins can manage user accounts).

3. **Password Management**:
   - Implement password recovery via email.
   - Enforce strong password policies and periodic expiration for educators.

4. **Session Management**:
   - Add session timeouts for idle users.
   - Provide users with the ability to view and terminate active sessions.

---

### Phase 5: Pupil Interaction Enhancements

1. **Lock Answer Boxes**:
   - Automatically lock answer boxes after pupils reveal the correct answer.
   - Include a warning or confirmation prompt before locking.

2. **Self-Assessment Comments**:
   - Provide pupils with a comment box for each question to reflect on their answers.
   - Allow educators to review these comments as part of assessments.

3. **Enhanced Feedback Mechanism**:
   - Enable educators to provide detailed feedback for individual answers.
   - Include an option for pupils to request clarification on feedback.

4. **Answer Tracking**:
   - Maintain a history of all answers provided by pupils.
   - Link answers to both the specific question and the pupil profile for detailed reporting.

---

### Phase 6: Auto-Marking and Multiple Choice

1. **Auto-Marking Features**:
   - Extend auto-marking to cover numerical and short-text answers.
   - Include configurable tolerance levels for numerical answers.

2. **Staff Review Interface**:
   - Create a dashboard for educators to review auto-marked answers.
   - Provide an override option for educators to adjust marks manually.

3. **Multiple Choice Enhancements**:
   - Support for questions with multiple correct answers.
   - Add an optional penalty for incorrect choices.

4. **Marking Reports**:
   - Generate detailed marking reports for each pupil.
   - Include metrics like accuracy, time spent per question, and overall performance trends.

---

### Phase 7: User Interface Improvements

1. **Intuitive Navigation**:
   - Add breadcrumbs to simplify navigation between sections.
   - Group related features into clearly labeled menus.

2. **Custom Themes**:
   - Provide light, dark, and high-contrast themes for the application.
   - Allow users to save their theme preferences.

3. **Responsive Design**:
   - Ensure all pages are fully responsive and function well across devices.
   - Include touch-friendly controls for mobile and tablet users.

4. **Search and Filters**:
   - Add a search bar for quickly finding questions, pupils, or assessments.
   - Provide filters for sorting and categorizing question banks.

---

### Phase 8: Additional Features

1. **Advanced Printing Options**:
   - Allow educators to configure the number of questions per page.
   - Include options for adjusting answer box sizes and margins.

2. **Question Type Selection**:
   - Enable educators to specify the distribution of question types (e.g., 40% multiple-choice, 60% short answer).
   - Add support for new question types, such as drag-and-drop or interactive elements.

3. **Custom Question Creation**:
   - Provide an interface for educators to manually create and format questions.
   - Include templates for common question types to simplify the process.

4. **Image and Diagram Support**:
   - Add a drag-and-drop interface for uploading images to questions.
   - Include basic drawing tools for creating diagrams directly in the application.


---

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository**:
   Click the "Fork" button at the top right of the repository page.

2. **Create a Feature Branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Commit Your Changes**:

   ```bash
   git commit -am 'Add some feature'
   ```

4. **Push to the Branch**:

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request**:
   Navigate to your forked repository and click the "New Pull Request" button.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact

- **Tom D**
- Email: [tomd1415@gmail.com](mailto:tomd1415@gmail.com)
- [GitHub Repository](https://github.com/tomd1415/question-paper-generator)