const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const TeacherSubject = sequelize.define('TeacherSubject', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        teacherId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        subjectId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'subjects',
                key: 'id',
            },
        },
    }, {
        timestamps: true,
        tableName: 'teacher_subjects',
    });

    return TeacherSubject;
};
