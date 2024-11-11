'use strict';
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let hash = await bcrypt.hash("Admin123!@#",10)
    await queryInterface.bulkInsert('user',[{
      name:"user",
      email:"admin@codesfortomorrow.com",
      password:hash,
      createdAt:Sequelize.literal("CURRENT_TIMESTAMP"),
      updatedAt:Sequelize.literal("CURRENT_TIMESTAMP")
    }])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user',null,{});
  }
};
