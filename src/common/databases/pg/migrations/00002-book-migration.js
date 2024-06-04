module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   * @returns {Promise<any>}
  */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tb_books', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      code: {
        type: Sequelize.DataTypes.STRING(8),
        allowNull: false,
        unique: true
      },
      title: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false
      },
      author: {
        type: Sequelize.DataTypes.STRING(75),
        allowNull: false
      },
      stock: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: null
      }
    }, { timestamps: false })
  },
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   * @returns {Promise<any>}
  */
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tb_books', { cascade: true, force: true })
  },
}