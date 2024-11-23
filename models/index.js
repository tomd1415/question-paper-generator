// models/index.js

const Sequelize = require('sequelize');
const config = require('../config/config.js')['development'];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};

// Import models
db.User = require('./user')(sequelize, Sequelize.DataTypes);
db.Subject = require('./subject')(sequelize, Sequelize.DataTypes);
db.Specification = require('./specification')(sequelize, Sequelize.DataTypes);
db.Topic = require('./topic')(sequelize, Sequelize.DataTypes);
db.Prompt = require('./prompt')(sequelize, Sequelize.DataTypes);
db.Question = require('./question')(sequelize, Sequelize.DataTypes);
db.PupilAnswer = require('./pupilAnswer')(sequelize, Sequelize.DataTypes);

// Define associations

// User
db.User.hasMany(db.Prompt, { foreignKey: 'staff_user_id' });
db.User.hasMany(db.PupilAnswer, { foreignKey: 'pupil_user_id' });

// Subject
db.Subject.hasMany(db.Specification, { foreignKey: 'subject_id' });
db.Subject.hasMany(db.Prompt, { foreignKey: 'subject_id' });

// Specification
db.Specification.belongsTo(db.Subject, { foreignKey: 'subject_id' });
db.Specification.hasMany(db.Topic, { foreignKey: 'specification_id' });

// Topic
db.Topic.belongsTo(db.Specification, { foreignKey: 'specification_id' });

// Prompt
db.Prompt.belongsTo(db.User, { foreignKey: 'staff_user_id' });
db.Prompt.belongsTo(db.Subject, { foreignKey: 'subject_id' });
db.Prompt.hasMany(db.Question, { foreignKey: 'prompt_id' });

// Question
db.Question.belongsTo(db.Prompt, { foreignKey: 'prompt_id' });
db.Question.hasMany(db.PupilAnswer, { foreignKey: 'question_id' });

// PupilAnswer
db.PupilAnswer.belongsTo(db.Question, { foreignKey: 'question_id' });
db.PupilAnswer.belongsTo(db.User, { foreignKey: 'pupil_user_id' });

// Export db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

