'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable('todos', {
        id: {
          type: Sequelize.STRING,
          allowNull: false,
          primaryKey: true,
          autoIncrement: false
        },
        task: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        completed: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false,
        },
        owner: {
          type: Sequelize.STRING,
          allowNull: false,
          references: {
            model: 'users', // pastikan ada tabel Users
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      }, { transaction: t });
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async(t) => {
      await queryInterface.dropTable('todos', { transaction: t });
    });
  }
};
