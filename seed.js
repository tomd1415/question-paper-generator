// seed.js

const db = require('./models');
const bcrypt = require('bcryptjs');

async function seedDatabase() {
  try {
    await db.sequelize.sync({ force: true }); // Drops and recreates tables

    // Create Users
    const hashedPassword = await bcrypt.hash('password123', 10);
    const users = await db.User.bulkCreate([
      { username: 'admin', password: hashedPassword, role: 'admin' },
      { username: 'teacher1', password: hashedPassword, role: 'teacher' },
      { username: 'pupil1', password: hashedPassword, role: 'pupil' },
    ]);

    // Create Subjects
    const subjects = await db.Subject.bulkCreate([
      { name: 'Mathematics', yearGroup: 'Year 10' },
      { name: 'Computer Science', yearGroup: 'Year 10' },
    ]);

    // Create Specifications
    const specifications = await db.Specification.bulkCreate([
      {
        title: 'Mathematics Specification',
        details: 'Mathematics Specification Details',
        subjectId: subjects[0].id,
        createdBy: users.find(user => user.role === 'teacher').id, // Assign to 'teacher1'
      },
      {
        title: 'Computer Science Specification',
        details: 'Computer Science Specification Details',
        subjectId: subjects[1].id,
        createdBy: users.find(user => user.role === 'teacher').id, // Assign to 'teacher1'
      },
    ]);

    // Create Topics
    const teacherId = users.find(user => user.role === 'teacher').id; // Get teacher's ID

    const topics = await db.Topic.bulkCreate([
      {
        title: 'Algebra',
        subjectId: subjects[0].id,
        createdBy: teacherId,
        details: 'Algebra Topic Details',
      },
      {
        title: 'Geometry',
        subjectId: subjects[0].id,
        createdBy: teacherId,
        details: 'Geometry Topic Details',
      },
      {
        title: 'Programming Basics',
        subjectId: subjects[1].id,
        createdBy: teacherId,
        details: 'Programming Basics Topic Details',
      },
      {
        title: 'Data Structures',
        subjectId: subjects[1].id,
        createdBy: teacherId,
        details: 'Data Structures Topic Details',
      },
    ]);

    // Create Papers
    const papers = await db.Paper.bulkCreate([
      {
        staffUserId: teacherId, // Assign to 'teacher1'
        title: 'Year 10 Mathematics Paper 1',
        subjectId: subjects[0].id,
        specificationId: specifications[0].id,
        topics: [topics[0].id, topics[1].id],
      },
      {
        staffUserId: teacherId, // Assign to 'teacher1'
        title: 'Year 10 Computer Science Paper 1',
        subjectId: subjects[1].id,
        specificationId: specifications[1].id,
        topics: [topics[2].id, topics[3].id],
      },
    ]);

    // Create Questions
    const questions = await db.Question.bulkCreate([
      {
        paperId: papers[0].id,
        questionNumber: 1,
        staffUserId: teacherId,
        questionText: 'Solve for x: 2x + 5 = 15',
        marks: 5,
        questionType: 'short-answer',
        answer: 'x = 5',
      },
      {
        paperId: papers[0].id,
        questionNumber: 2,
        staffUserId: teacherId,
        questionText: 'Explain the Pythagorean theorem.',
        marks: 10,
        questionType: 'essay',
        answer: 'The Pythagorean theorem states that in a right-angled triangle...',
      },
      {
        paperId: papers[1].id,
        questionNumber: 1,
        staffUserId: teacherId,
        questionText: 'What is a loop in programming?',
        marks: 5,
        questionType: 'short-answer',
        answer: 'A loop is a programming construct that repeats a block of code.',
      },
      {
        paperId: papers[1].id,
        questionNumber: 2,
        staffUserId: teacherId,
        questionText: 'Describe the difference between an array and a linked list.',
        marks: 10,
        questionType: 'essay',
        answer: 'An array is a collection of elements stored in contiguous memory locations...',
      },
    ]);

    console.log('Database seeded successfully.');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();