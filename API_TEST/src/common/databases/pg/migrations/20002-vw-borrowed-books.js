module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   * @returns {Promise<any>}
  */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      create or replace view vw_borrowed_books as
      select
        a.id, 
        a.member_id,
        b.code as member_code,
        b."name" as member_name,
        a.book_id,
        c.code as book_code,
        c.title,
        c.author,
        a.qty,
        a.remaining_return_qty,
        a.expired_at,
        a.created_at
      from tb_borrow_books a
      left join tb_members b on a.member_id = b.id
      left join tb_books c on a.book_id = c.id;
    `)
  },
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   * @returns {Promise<any>}
  */
  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('drop view if exists vw_borrowed_books cascade;')
  },
}