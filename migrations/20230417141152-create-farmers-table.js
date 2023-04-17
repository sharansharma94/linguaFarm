'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Farmers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      phone_number: {
        allowNull: false,
        type: Sequelize.STRING
      },
      farmer_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      state_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      district_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      village_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Farmers');
  }
};
