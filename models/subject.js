const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Subject = sequelize.define('Subject', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        specifications: {
            type: DataTypes.TEXT,
            allowNull: true,
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
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        timestamps: true,
        paranoid: true,
        tableName: 'subjects',
    });

    Subject.associate = (models) => {
        Subject.belongsToMany(models.User, {
            through: models.TeacherSubject,
            foreignKey: 'subject_id',
            as: 'teachers',
        });
        Subject.hasMany(models.Specification, { foreignKey: 'subject_id', as: 'specifications' });
        Subject.hasMany(models.Topic, { foreignKey: 'subject_id', as: 'topics' });
        Subject.hasMany(models.Prompt, { foreignKey: 'subject_id', as: 'prompts' });

    };

    return Subject;
};
