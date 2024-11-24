// models/specification.js

module.exports = (sequelize, DataTypes) => {
  const Specification = sequelize.define('Specification', {
    specification_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    subject_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'subjects',
        key: 'subject_id',
      },
      allowNull: false,
    },
    specification_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'specifications',
    timestamps: true,
  });
  return Specification;
};

