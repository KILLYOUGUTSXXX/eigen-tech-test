module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   * @returns {Promise<any>}
  */
  up: async (queryInterface, Sequelize) => {
    const dateCreated = require('moment')().subtract(10, 'day').format('YYYY-MM-DD HH:mm:ss')
    await queryInterface.bulkInsert('tb_members', [
      {
          code: "M001",
          name: "Angga",
          created_at: dateCreated
      },
      {
          code: "M002",
          name: "Ferry",
          created_at: dateCreated
      },
      {
          code: "M003",
          name: "Putri",
          created_at: dateCreated
      }
  ])
  },
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   * @returns {Promise<any>}
  */
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tb_members')
  },
}