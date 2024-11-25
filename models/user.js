// models/user.js

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: { // Primary key
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: { // User's unique username
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: { // Hashed password
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: { // Role of the user: 'teacher', 'pupil', 'admin'
      type: DataTypes.ENUM('teacher', 'pupil', 'admin'),
      allowNull: false,
    },
    deletedAt: { // Soft delete timestamp
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    timestamps: true,
    paranoid: true, // Enables soft delete
    tableName: 'users',
  });

  User.associate = (models) => {
    // User <-> Subject (Many-to-Many)
    User.belongsToMany(models.Subject, {
      through: models.TeacherSubject,
      foreignKey: 'userId',
      otherKey: 'subjectId',
      as: 'subjects',
    });

    // User -> Specification (One-to-Many)
    User.hasMany(models.Specification, {
      foreignKey: 'createdBy',
      as: 'createdSpecifications',
    });

    // User -> Topic (One-to-Many)
    User.hasMany(models.Topic, {
      foreignKey: 'createdBy',
      as: 'createdTopics',
    });

    // User -> Prompt (One-to-Many)
    User.hasMany(models.Prompt, {
      foreignKey: 'createdBy',
      as: 'createdPrompts',
    });

    // User -> Paper (One-to-Many)
    User.hasMany(models.Paper, {
      foreignKey: 'staffUserId',
      as: 'papers',
    });

    // User -> Question (One-to-Many)
    User.hasMany(models.Question, {
      foreignKey: 'staffUserId',
      as: 'questions',
    });

    // User -> PupilAnswer (One-to-Many)
    User.hasMany(models.PupilAnswer, {
      foreignKey: 'pupilUserId',
      as: 'pupilAnswers',
    });
  };

  return User;
};