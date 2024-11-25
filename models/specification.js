const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Specification = sequelize.define('Specification', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        details: {
            type: DataTypes.TEXT,
            allowNull: false, // Contains extensive text about the specification
        },
        yearGroup: {
            type: DataTypes.STRING,
            allowNull: true, // E.g., 'Year 10', 'Year 11'
            validate: {
                isIn: [['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6',
                        'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11',
                        'Year 12', 'Year 13', 'Year 14']],
            },
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        timestamps: true,
        paranoid: true,
        tableName: 'specifications',
    });

    Specification.associate = (models) => {
        Specification.belongsTo(models.Subject, { foreignKey: 'subject_id', as: 'subject' });
        Specification.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
    };

    return Specification;
};
