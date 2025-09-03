'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable('authentications', {
        id: {
          type: Sequelize.STRING,
          allowNull: false,
          primaryKey: true,
        },
        token: {
          type: Sequelize.STRING,
          allowNull: false,
        }
      }, { transaction: t });
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.dropTable('authentications', { transaction: t });
    });
  }
};
