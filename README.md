# Question Paper Generator

An open-source web application designed to streamline the creation, distribution, and grading of educational assessments. It provides educators with tools to generate question papers, edit questions, incorporate images, and automatically mark certain question types. Pupils can interact with these papers, answer questions, and receive immediate feedback.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Database Setup](#database-setup)
- [Next Steps](#next-steps)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Introduction

The Question Paper Generator is a comprehensive web application aimed at simplifying the process of creating and managing educational assessments. The platform allows educators to generate customized question papers, edit and save changes directly, and provides a user-friendly interface for pupils to engage with the assessments.

---

## Features

- **Question Generation**: Create question papers from a database of questions, with options to specify topics, difficulty levels, and question types.
- **Question Editing**: Edit questions and answers directly within the application. All changes are automatically saved to the database.
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

### Backend

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **Sequelize ORM**

### Frontend

- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
- **EJS Templates**

### Authentication

- **express-session** for session management
- **bcryptjs** for password hashing
- **connect-flash** for flash messages

### File Handling

- **multer** for handling file uploads

### Miscellaneous

- **dotenv** for environment variable management

---

## Installation

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **PostgreSQL** (v12 or higher)

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/question-paper-generator.git
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

### Phase 1: Finalizing Core Features

- **Complete Database Schema**: Finalize all necessary tables and relationships. Include fields for metadata like timestamps and implement indexing for performance optimization.
- **Data Validation**: Implement robust validation rules at both the application and database levels to ensure data integrity.
- **Testing and Bug Fixes**: Conduct thorough testing to identify and fix any existing bugs.

### Phase 2: Enhanced Question Editing and Generation

- **Dynamic Answer Boxes**: Improve the styling of answer boxes to adjust based on the marks allocated to each question.
- **Advanced Generation Options**: Allow educators to specify difficulty levels, topics, and question types during question generation.
- **Question Preview**: Add a preview feature for educators to review questions before finalizing.

### Phase 3: Printing and Accessibility

- **Print Formatting**: Enhance print styles to ensure question papers are well-formatted when printed, including consistent margins and borders.
- **Accessibility Improvements**: Implement features like adjustable font sizes and contrast settings to improve accessibility for all users.

### Phase 4: Authentication and Authorization Enhancements

- **User Registration**: Implement secure registration processes for educators and pupils.
- **Role-Based Access Control**: Define user roles and restrict access to features based on roles.

### Phase 5: Pupil Interaction Enhancements

- **Answer Box Locking**: Automatically lock answer boxes after pupils reveal the correct answer.
- **Self-Assessment Comments**: Allow pupils to add comments for self-assessment, which educators can review.

### Phase 6: Auto-Marking and Multiple Choice

- **Expanded Auto-Marking**: Extend auto-marking capabilities to include numerical and short-text answers.
- **Multiple Correct Answers**: Support questions with multiple correct answers and partial credit.

### Phase 7: User Interface Improvements

- **Responsive Design**: Ensure the application is fully responsive across all devices.
- **Custom Themes**: Offer customizable themes, including light and dark modes.

### Phase 8: Additional Features

- **Advanced Printing Options**: Allow customization of print settings such as questions per page and answer box sizes.
- **Image and Diagram Support**: Enable easy addition of images and diagrams to questions.

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