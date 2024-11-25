const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Prompt = sequelize.define('Prompt', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        promptText: {
            type: DataTypes.TEXT,
            allowNull: false, // The text of the prompt used to generate questions
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        timestamps: true,
        paranoid: true,
        tableName: 'prompts',
    });

    Prompt.associate = (models) => {
        Prompt.belongsTo(models.Subject, { foreignKey: 'subject_id', as: 'subject' });
        Prompt.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
        Prompt.belongsTo(models.Paper, { foreignKey: 'paper_id', as: 'paper' });
    };

    return Prompt;
};
