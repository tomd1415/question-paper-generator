// models/pupilAnswer.js

module.exports = (sequelize, DataTypes) => {
  const PupilAnswer = sequelize.define('PupilAnswer', {
    answer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    question_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'questions',
        key: 'question_id',
      },
      allowNull: false,
    },
    pupil_user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'user_id',
      },
      allowNull: false,
    },
    answer_text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    mark: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    is_marked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: 'pupil_answers',
    timestamps: true,
  });
  return PupilAnswer;
};

