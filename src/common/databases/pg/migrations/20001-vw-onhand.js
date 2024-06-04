module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   * @returns {Promise<any>}
  */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      create or replace view vw_onhands as 
      select
        a.id,
        a.code,
        a.title,
        a.author,
        sum(coalesce(b.qty, 0) * fn_get_value_type_stocks(b.stock_type::text)) as qty
      from tb_books a
      left join tb_onhands b on a.id = b.book_id
      group by a.id, a.code, a.title, a.author;
    `)
  },
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   * @returns {Promise<any>}
  */
  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('drop view if exists vw_onhands cascade;')
  },
}