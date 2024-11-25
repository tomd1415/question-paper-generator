const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Topic = sequelize.define('Topic', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        term: {
            type: DataTypes.STRING,
            allowNull: true, // E.g., 'Autumn Term', 'Spring Term'
        },
        details: {
            type: DataTypes.TEXT,
            allowNull: false, // Contains text about what the topic covers
        },
        yearGroup: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6',
                        'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11',
                        'Year 12', 'Year 13', 'Year 14']],
            },
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        timestamps: true,
        paranoid: true,
        tableName: 'topics',
    });

    Topic.associate = (models) => {
        Topic.belongsTo(models.Subject, { foreignKey: 'subject_id', as: 'subject' });
        Topic.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
    };

    return Topic;
};
