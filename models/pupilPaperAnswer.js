const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const PupilPaperAnswer = sequelize.define('PupilPaperAnswer', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        attempted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        answer: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        isCorrect: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
    }, {
        timestamps: true,
        tableName: 'pupil_paper_answers',
    });

    PupilPaperAnswer.associate = (models) => {
        PupilPaperAnswer.belongsTo(models.Paper, { foreignKey: 'paper_id', as: 'paper' });
        PupilPaperAnswer.belongsTo(models.Question, { foreignKey: 'question_id', as: 'question' });
        PupilPaperAnswer.belongsTo(models.User, { foreignKey: 'pupil_id', as: 'pupil' });
    };

    return PupilPaperAnswer;
};
