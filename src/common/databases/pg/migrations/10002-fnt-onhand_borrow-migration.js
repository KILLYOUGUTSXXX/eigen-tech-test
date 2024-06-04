module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   * @returns {Promise<any>}
  */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      create or replace function fnt_borrow_onhand_sync ()
        returns trigger
        language plpgsql as $function$
        begin
          insert into tb_onhands (ref_id, stock_type, book_id, date_of_stock, created_at, qty)
            values (new.id, 'BORROW', new.book_id, new.created_at, new.created_at, new.qty);
          return new;
        end;$function$;
    `)
    
    await queryInterface.sequelize.query(`
      CREATE TRIGGER borrow_onhand_sync
        after insert on tb_borrow_books
        FOR EACH ROW
        EXECUTE FUNCTION fnt_borrow_onhand_sync();
    `)
  },
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   * @returns {Promise<any>}
  */
  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('drop function if exists fnt_borrow_onhand_sync cascade;')
  },
}