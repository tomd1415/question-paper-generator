// models/prompt.js

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Prompt = sequelize.define('Prompt', {
    id: { // Primary key
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    promptText: { // The text of the prompt
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdBy: { // Foreign key to User
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    subjectId: { // Foreign key to Subject
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'subjects',
        key: 'id',
      },
    },
    paperId: { // Foreign key to Paper
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'papers',
        key: 'id',
      },
    },
    deletedAt: { // Soft delete timestamp
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    timestamps: true,
    paranoid: true, // Enables soft delete
    tableName: 'prompts',
  });

  Prompt.associate = (models) => {
    // Prompt -> Subject (Many-to-One)
    Prompt.belongsTo(models.Subject, {
      foreignKey: 'subjectId',
      as: 'subject',
    });

    // Prompt -> User (Many-to-One)
    Prompt.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'creator',
    });

    // Prompt -> Paper (Many-to-One)
    Prompt.belongsTo(models.Paper, {
      foreignKey: 'paperId',
      as: 'paper',
    });
  };

  return Prompt;
};