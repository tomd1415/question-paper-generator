const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Paper = sequelize.define('Paper', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        yearGroup: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6',
                        'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11',
                        'Year 12', 'Year 13', 'Year 14']],
            },
        },
        comments: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        timestamps: true,
        paranoid: true,
        tableName: 'papers',
    });

    Paper.associate = (models) => {
        Paper.belongsTo(models.Subject, { foreignKey: 'subject_id', as: 'subject' });
        Paper.hasMany(models.Prompt, { foreignKey: 'paper_id', as: 'prompts' });
        Paper.belongsToMany(models.Question, {
            through: models.PaperQuestion,
            foreignKey: 'paper_id',
            as: 'questions',
        });
    };

    return Paper;
};
