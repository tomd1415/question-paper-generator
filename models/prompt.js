// models/prompt.js

module.exports = (sequelize, DataTypes) => {
  const Prompt = sequelize.define('Prompt', {
    prompt_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    staff_user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'user_id',
      },
      allowNull: false,
    },
    subject_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'subjects',
        key: 'subject_id',
      },
      allowNull: false,
    },
    prompt_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    tableName: 'prompts',
    timestamps: true,
  });
  return Prompt;
};

