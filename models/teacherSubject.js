// models/teacherSubject.js

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TeacherSubject = sequelize.define('TeacherSubject', {
    id: { // Primary key
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: { // Foreign key to User
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
  }, {
    timestamps: true,
    tableName: 'teacher_subjects',
  });

  return TeacherSubject;
};