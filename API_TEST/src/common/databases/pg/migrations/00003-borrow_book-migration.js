module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   * @returns {Promise<any>}
  */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tb_borrow_books', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      member_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'tb_members',
            schema: 'public'
          },
          key: 'id'
        }
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
      qty: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      remaining_return_qty: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      expired_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: null
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
    return queryInterface.dropTable('tb_borrow_books', { cascade: true, force: true })
  },
}