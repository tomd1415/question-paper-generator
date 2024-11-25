// models/subject.js

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Subject = sequelize.define('Subject', {
    id: { // Primary key
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { // Subject name
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    specificationDetails: { // Renamed to avoid conflict
      type: DataTypes.TEXT,
      allowNull: true,
    },
    yearGroup: { // Associated year group
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5',
                'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10',
                'Year 11', 'Year 12', 'Year 13', 'Year 14']],
      },
    },
    deletedAt: { // Soft delete timestamp
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    timestamps: true,
    paranoid: true, // Enables soft delete
    tableName: 'subjects',
  });

  Subject.associate = (models) => {
    // Subject <-> User (Many-to-Many)
    Subject.belongsToMany(models.User, {
      through: models.TeacherSubject,
      foreignKey: 'subjectId',
      otherKey: 'userId',
      as: 'teachers',
    });

    // Subject -> Specification (One-to-Many)
    Subject.hasMany(models.Specification, {
      foreignKey: 'subjectId',
      as: 'specifications',
    });

    // Subject -> Topic (One-to-Many)
    Subject.hasMany(models.Topic, {
      foreignKey: 'subjectId',
      as: 'topics',
    });

    // Subject -> Prompt (One-to-Many)
    Subject.hasMany(models.Prompt, {
      foreignKey: 'subjectId',
      as: 'prompts',
    });

    // Subject -> Paper (One-to-Many)
    Subject.hasMany(models.Paper, {
      foreignKey: 'subjectId',
      as: 'papers',
    });
  };

  return Subject;
};