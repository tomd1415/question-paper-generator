// models/pupilAnswer.js

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const PupilAnswer = sequelize.define('PupilAnswer', {
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
    questionId: { // Foreign key to Question
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'questions',
        key: 'id',
      },
    },
    pupilUserId: { // Foreign key to User (pupil)
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    answerText: { // Pupil's answer
      type: DataTypes.TEXT,
      allowNull: true,
    },
    comment: { // Additional comments from pupil
      type: DataTypes.TEXT,
      allowNull: true,
    },
    mark: { // Marks awarded
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isMarked: { // Whether the answer has been marked
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    attempted: { // If the question was attempted
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    timestamps: true, // Adds createdAt and updatedAt
    tableName: 'pupil_answers',
  });

  PupilAnswer.associate = (models) => {
    // PupilAnswer -> Paper (Many-to-One)
    PupilAnswer.belongsTo(models.Paper, {
      foreignKey: 'paperId',
      as: 'paper',
    });

    // PupilAnswer -> Question (Many-to-One)
    PupilAnswer.belongsTo(models.Question, {
      foreignKey: 'questionId',
      as: 'question',
    });

    // PupilAnswer -> User (Many-to-One)
    PupilAnswer.belongsTo(models.User, {
      foreignKey: 'pupilUserId',
      as: 'pupil',
    });
  };

  return PupilAnswer;
};