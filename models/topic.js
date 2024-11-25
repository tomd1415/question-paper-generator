// models/topic.js

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Topic = sequelize.define('Topic', {
    id: { // Primary key
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: { // Topic title
      type: DataTypes.STRING,
      allowNull: false,
    },
    term: { // Term information
      type: DataTypes.STRING,
      allowNull: true,
    },
    details: { // Detailed description
      type: DataTypes.TEXT,
      allowNull: false,
    },
    yearGroup: { // Associated year group
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: [['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5',
                'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10',
                'Year 11', 'Year 12', 'Year 13', 'Year 14']],
      },
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
    deletedAt: { // Soft delete timestamp
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    timestamps: true,
    paranoid: true, // Enables soft delete
    tableName: 'topics',
  });

  Topic.associate = (models) => {
    // Topic -> Subject (Many-to-One)
    Topic.belongsTo(models.Subject, {
      foreignKey: 'subjectId',
      as: 'subject',
    });

    // Topic -> User (Many-to-One)
    Topic.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'creator',
    });
  };

  return Topic;
};