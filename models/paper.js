// models/paper.js

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Paper = sequelize.define('Paper', {
    id: { // Primary key
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    staffUserId: { // Foreign key to User (creator)
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    title: { // Paper title
      type: DataTypes.STRING,
      allowNull: false,
    },
    subjectId: { // Foreign key to Subject
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'subjects',
        key: 'id',
      },
    },
    specificationId: { // Foreign key to Specification
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'specifications',
        key: 'id',
      },
    },
    topics: { // Array of topic IDs
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
    deletedAt: { // Soft delete timestamp
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    timestamps: true, // Adds createdAt and updatedAt
    paranoid: true, // Enables soft delete
    tableName: 'papers',
  });

  Paper.associate = (models) => {
    // Paper -> User (Many-to-One)
    Paper.belongsTo(models.User, {
      foreignKey: 'staffUserId',
      as: 'creator',
    });

    // Paper -> Subject (Many-to-One)
    Paper.belongsTo(models.Subject, {
      foreignKey: 'subjectId',
      as: 'subject',
    });

    // Paper -> Specification (Many-to-One)
    Paper.belongsTo(models.Specification, {
      foreignKey: 'specificationId',
      as: 'specification',
    });

    // Paper -> Question (One-to-Many)
    Paper.hasMany(models.Question, {
      foreignKey: 'paperId',
      as: 'questions',
      onDelete: 'CASCADE',
    });

    // Paper -> Prompt (One-to-Many)
    Paper.hasMany(models.Prompt, {
      foreignKey: 'paperId',
      as: 'prompts',
    });

    // Paper -> PupilAnswer (One-to-Many)
    Paper.hasMany(models.PupilAnswer, {
      foreignKey: 'paperId',
      as: 'pupilAnswers',
    });
  };

  return Paper;
};