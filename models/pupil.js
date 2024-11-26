// models/pupil.js

module.exports = (sequelize, DataTypes) => {
    const Pupil = sequelize.define('Pupil', {
      name: DataTypes.STRING,
    });
  
    Pupil.associate = (models) => {
      Pupil.hasMany(models.Response, { foreignKey: 'pupilId', as: 'responses' });
    };
  
    return Pupil;
  };