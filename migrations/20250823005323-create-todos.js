'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async(t) => {
      await queryInterface.createTable('todos', {
        id: {
          allowNull: false,
          autoIncrement: false,
          primaryKey: true,
          type: Sequelize.STRING
        },
        task: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        completed: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        }
      }, { transaction: t});
    });
  },

  async down (queryInterface, Sequelize) {
   return queryInterface.sequelize.transaction(async(t) => {
    await queryInterface.dropTable('todos', { transaction: t});
   });
  }
};
