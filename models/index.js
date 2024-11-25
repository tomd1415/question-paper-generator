'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Import all models
db.User = require('./user')(sequelize, DataTypes);
db.Subject = require('./subject')(sequelize, DataTypes);
db.TeacherSubject = require('./teacherSubject')(sequelize, DataTypes);
db.Paper = require('./paper')(sequelize, DataTypes);
db.Question = require('./question')(sequelize, DataTypes);
db.QuestionOption = require('./questionOption')(sequelize, DataTypes);
db.PaperQuestion = require('./paperQuestion')(sequelize, DataTypes);
db.PupilPaperAnswer = require('./pupilPaperAnswer')(sequelize, DataTypes);
db.Specification = require('./specification')(sequelize, DataTypes);
db.Topic = require('./topic')(sequelize, DataTypes);
db.Prompt = require('./prompt')(sequelize, DataTypes);

// Define associations

// Users
db.User.belongsToMany(db.Subject, {
    through: db.TeacherSubject,
    foreignKey: 'teacher_id',
    as: 'subjects',
});
db.User.hasMany(db.Specification, {
    foreignKey: 'created_by',
    as: 'createdSpecifications',
});
db.User.hasMany(db.Topic, {
    foreignKey: 'created_by',
    as: 'createdTopics',
});
db.User.hasMany(db.Prompt, {
    foreignKey: 'created_by',
    as: 'createdPrompts',
});

// Subjects
db.Subject.belongsToMany(db.User, {
    through: db.TeacherSubject,
    foreignKey: 'subject_id',
    as: 'teachers',
});
db.Subject.hasMany(db.Specification, {
    foreignKey: 'subject_id',
    as: 'specsubjectSpec',
});
db.Subject.hasMany(db.Topic, {
    foreignKey: 'subject_id',
    as: 'topics',
});
db.Subject.hasMany(db.Prompt, {
    foreignKey: 'subject_id',
    as: 'prompts',
});

// Papers
db.Paper.belongsTo(db.Subject, {
    foreignKey: 'subject_id',
    as: 'subject',
});
db.Paper.belongsToMany(db.Question, {
    through: db.PaperQuestion,
    foreignKey: 'paper_id',
    as: 'questions',
});
db.Paper.hasMany(db.Prompt, {
    foreignKey: 'paper_id',
    as: 'prompts',
});

// Questions
db.Question.belongsToMany(db.Paper, {
    through: db.PaperQuestion,
    foreignKey: 'question_id',
    as: 'papers',
});
db.Question.hasMany(db.QuestionOption, {
    foreignKey: 'question_id',
    as: 'options',
});
db.Question.hasMany(db.PupilPaperAnswer, {
    foreignKey: 'question_id',
    as: 'pupilAnswers',
});

// Question Options
db.QuestionOption.belongsTo(db.Question, {
    foreignKey: 'question_id',
    as: 'question',
});

// Pupil Paper Answers
db.PupilPaperAnswer.belongsTo(db.Paper, {
    foreignKey: 'paper_id',
    as: 'paper',
});
db.PupilPaperAnswer.belongsTo(db.Question, {
    foreignKey: 'question_id',
    as: 'question',
});
db.PupilPaperAnswer.belongsTo(db.User, {
    foreignKey: 'pupil_id',
    as: 'pupil',
});

// Specifications
db.Specification.belongsTo(db.Subject, {
    foreignKey: 'subject_id',
    as: 'subject',
});
db.Specification.belongsTo(db.User, {
    foreignKey: 'created_by',
    as: 'creator',
});

// Topics
db.Topic.belongsTo(db.Subject, {
    foreignKey: 'subject_id',
    as: 'subject',
});
db.Topic.belongsTo(db.User, {
    foreignKey: 'created_by',
    as: 'creator',
});

// Prompts
db.Prompt.belongsTo(db.Subject, {
    foreignKey: 'subject_id',
    as: 'subject',
});
db.Prompt.belongsTo(db.User, {
    foreignKey: 'created_by',
    as: 'creator',
});
db.Prompt.belongsTo(db.Paper, {
    foreignKey: 'paper_id',
    as: 'paper',
});

// Sequelize initialization
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
