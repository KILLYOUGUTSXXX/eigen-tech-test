module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   * @returns {Promise<any>}
  */
  up: async (queryInterface, Sequelize) => {
    const dateCreated = require('moment')().subtract(10, 'day').format('YYYY-MM-DD HH:mm:ss')
    const results = await queryInterface.bulkInsert('tb_books', [
      {
          code: "JK-45",
          title: "Harry Potter",
          author: "J.K Rowling",
          stock: 1,
          created_at: dateCreated
      },
      {
          code: "SHR-1",
          title: "A Study in Scarlet",
          author: "Arthur Conan Doyle",
          stock: 1,
          created_at: dateCreated
      },
      {
          code: "TW-11",
          title: "Twilight",
          author: "Stephenie Meyer",
          stock: 2,
          created_at: dateCreated
      },
      {
          code: "HOB-83",
          title: "The Hobbit, or There and Back Again",
          author: "J.R.R. Tolkien",
          stock: 1,
          created_at: dateCreated
      },
      {
          code: "NRN-7",
          title: "The Lion, the Witch and the Wardrobe",
          author: "C.S. Lewis",
          stock: 1,
          created_at: dateCreated
      },
    ])
  },
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   * @returns {Promise<any>}
  */
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tb_books')
  },
}