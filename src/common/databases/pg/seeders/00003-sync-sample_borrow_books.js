const moments = require('moment')
module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   * @returns {Promise<any>}
  */
  up: async (queryInterface, Sequelize) => {
    const dateCreated = moments()
      .subtract(7, 'day')
      .startOf('day')
      
    await queryInterface.bulkInsert('tb_borrow_books', [
      {
          member_id: 3,
          book_id: 3,
          qty: 1,
          created_at: dateCreated.format('YYYY-MM-DD HH:mm:ss')
      }
  ])
  },
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   * @returns {Promise<any>}
  */
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tb_borrow_books')
  },
}