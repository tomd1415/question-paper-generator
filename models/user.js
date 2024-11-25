const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['teacher', 'pupil', 'admin']],
            },
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        timestamps: true,
        paranoid: true,
        tableName: 'users',
    });

    User.associate = (models) => {
        User.belongsToMany(models.Subject, {
            through: models.TeacherSubject,
            foreignKey: 'teacher_id',
            as: 'subjects',
        });
        User.hasMany(models.Specification, { foreignKey: 'created_by', as: 'createdSpecifications' });
        User.hasMany(models.Topic, { foreignKey: 'created_by', as: 'createdTopics' });
        User.hasMany(models.Prompt, { foreignKey: 'created_by', as: 'createdPrompts' });

    };

    return User;
};
