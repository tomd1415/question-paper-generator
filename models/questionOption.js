const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const QuestionOption = sequelize.define('QuestionOption', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        optionText: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        isCorrect: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        timestamps: true,
        tableName: 'question_options',
    });

    QuestionOption.associate = (models) => {
        QuestionOption.belongsTo(models.Question, { foreignKey: 'question_id', as: 'question' });
    };

    return QuestionOption;
};
