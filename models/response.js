// models/response.js

module.exports = (sequelize, DataTypes) => {
    const Response = sequelize.define('Response', {
      answerText: DataTypes.TEXT,
      comment: DataTypes.TEXT,
    });
  
    Response.associate = (models) => {
      Response.belongsTo(models.Pupil, { foreignKey: 'pupilId', as: 'pupil' });
      Response.belongsTo(models.Question, { foreignKey: 'questionId', as: 'question' });
      Response.belongsTo(models.Paper, { foreignKey: 'paperId', as: 'paper' });
    };
  
    return Response;
  };