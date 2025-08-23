'use strict';
const { nanoid } = require("nanoid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('todos',[
    {
      id: `todo-${nanoid(16)}`,
      task: 'tes12345'
    },
    {
      id: `todo-${nanoid(16)}`,
      task: 'tes23444444',
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('todos', null, {});
  }
};

