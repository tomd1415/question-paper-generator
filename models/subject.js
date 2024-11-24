// models/subject.js

module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define('Subject', {
    subject_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    subject_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    tableName: 'subjects',
    timestamps: true,
  });
  return Subject;
};

