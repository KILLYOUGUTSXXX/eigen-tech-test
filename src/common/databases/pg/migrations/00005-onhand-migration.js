module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   * @returns {Promise<any>}
  */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tb_onhands', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      book_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'tb_books',
            schema: 'public'
          },
          key: 'id'
        }
      },
      ref_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      qty: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      stock_type: {
        type: Sequelize.DataTypes.ENUM(['BORROW', 'RETURN', 'BEGIN']),
        allowNull: false
      },
      date_of_stock: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      }
    }, { timestamps: false })
  },
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   * @returns {Promise<any>}
  */
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tb_onhands', { cascade: true, force: true })
  },
}