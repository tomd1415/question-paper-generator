// models/index.js

'use strict';

const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// Import all models
db.User = require('./user')(sequelize);
db.Subject = require('./subject')(sequelize);
db.TeacherSubject = require('./teacherSubject')(sequelize);
db.Specification = require('./specification')(sequelize);
db.Topic = require('./topic')(sequelize);
db.Prompt = require('./prompt')(sequelize);
db.Paper = require('./paper')(sequelize);
db.Question = require('./question')(sequelize);
db.PupilAnswer = require('./pupilAnswer')(sequelize);

// Associations
db.User.associate(db);
db.Subject.associate(db);
db.Specification.associate(db);
db.Topic.associate(db);
db.Prompt.associate(db);
db.Paper.associate(db);
db.Question.associate(db);
db.PupilAnswer.associate(db);

// Sequelize initialization
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;