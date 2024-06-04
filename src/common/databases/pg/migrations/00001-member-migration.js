module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   * @returns {Promise<any>}
  */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tb_members', {
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
      name: {
        type: Sequelize.DataTypes.STRING(70),
        allowNull: false
      },
      penalty_exp_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: null
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
    return queryInterface.dropTable('tb_members', { cascade: true, force: true })
  },
}