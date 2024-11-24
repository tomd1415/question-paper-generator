// models/topic.js

module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define('Topic', {
    topic_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    specification_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'specifications',
        key: 'specification_id',
      },
      allowNull: false,
    },
    topic_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    term: {
      type: DataTypes.STRING, // e.g., 'Term 1', 'Term 2'
      allowNull: true,
    },
  }, {
    tableName: 'topics',
    timestamps: true,
  });
  return Topic;
};

