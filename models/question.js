const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Question = sequelize.define('Question', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        marks: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        correctAnswer: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        questionType: {
            type: DataTypes.STRING,
            defaultValue: 'text',
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        timestamps: true,
        paranoid: true,
        tableName: 'questions',
    });

    Question.associate = (models) => {
        Question.belongsToMany(models.Paper, {
            through: models.PaperQuestion,
            foreignKey: 'question_id',
            as: 'papers',
        });
        Question.hasMany(models.QuestionOption, { foreignKey: 'question_id', as: 'options' });
        Question.hasMany(models.PupilPaperAnswer, { foreignKey: 'question_id', as: 'pupilAnswers' });
    };

    return Question;
};
