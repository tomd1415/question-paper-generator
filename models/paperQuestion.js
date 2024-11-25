const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const PaperQuestion = sequelize.define('PaperQuestion', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        paperId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'papers',
                key: 'id',
            },
        },
        questionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'questions',
                key: 'id',
            },
        },
    }, {
        timestamps: true,
        tableName: 'paper_questions',
    });

    return PaperQuestion;
};
