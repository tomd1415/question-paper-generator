// migrations/XXXXXXXXXXXXXX-create-papers.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('papers', { // Use lowercase
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      subjectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'subjects', // Use lowercase
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      staffUserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Use lowercase
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      // Add other necessary fields
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('papers'); // Use lowercase
  }
};