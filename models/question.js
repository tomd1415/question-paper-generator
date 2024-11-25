// models/question.js

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Question = sequelize.define('Question', {
    id: { // Primary key
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    paperId: { // Foreign key to Paper
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'papers',
        key: 'id',
      },
    },
    questionNumber: { // Sequence number within paper
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    staffUserId: { // Foreign key to User (creator)
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    questionText: { // Text of the question
      type: DataTypes.TEXT,
      allowNull: false,
    },
    marks: { // Total marks for the question
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    codeSnippet: { // Optional code snippet
      type: DataTypes.TEXT,
      allowNull: true,
    },
    options: { // JSON field for options (if multiple-choice)
      type: DataTypes.JSONB,
      allowNull: true,
    },
    answer: { // Correct answer
      type: DataTypes.TEXT,
      allowNull: false,
    },
    questionType: { // Type of question
      type: DataTypes.ENUM('multiple-choice', 'short-answer', 'essay', 'code', 'numerical'),
      allowNull: false,
    },
    imageUrl: { // Optional image URL
      type: DataTypes.STRING,
      allowNull: true,
    },
    deletedAt: { // Soft delete timestamp
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    timestamps: true, // Adds createdAt and updatedAt
    paranoid: true, // Enables soft delete
    tableName: 'questions',
  });

  Question.associate = (models) => {
    // Question -> Paper (Many-to-One)
    Question.belongsTo(models.Paper, {
      foreignKey: 'paperId',
      as: 'paper',
    });

    // Question -> User (Many-to-One)
    Question.belongsTo(models.User, {
      foreignKey: 'staffUserId',
      as: 'creator',
    });

    // Question -> PupilAnswer (One-to-Many)
    Question.hasMany(models.PupilAnswer, {
      foreignKey: 'questionId',
      as: 'pupilAnswers',
      onDelete: 'CASCADE',
    });
  };

  return Question;
};