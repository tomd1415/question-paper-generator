// models/question.js

module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    question_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    prompt_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'prompts',
        key: 'prompt_id',
      },
      allowNull: false,
    },
    question_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    marks: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    code_snippet: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    options: {
      type: DataTypes.JSONB, // PostgreSQL JSONB type
      allowNull: true,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    question_type: {
      type: DataTypes.ENUM('multiple-choice', 'short-answer', 'essay', 'code', 'numerical'),
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING, // Field for image path or URL
      allowNull: true,
    },
  }, {
    tableName: 'questions',
  });
  return Question;
};

