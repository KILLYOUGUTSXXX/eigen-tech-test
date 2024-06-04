module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   * @returns {Promise<any>}
  */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      create or replace function fnt_assign_expired_borrows ()
        returns trigger
        language plpgsql as $function$
        begin
          new.expired_at := (new.created_at + interval '7 day');
          new.remaining_return_qty := new.qty;
          return new;
        end;$function$;
    `)
    
    await queryInterface.sequelize.query(`
      CREATE TRIGGER assign_expired_borrows
        before insert on tb_borrow_books
        FOR EACH ROW
        EXECUTE FUNCTION fnt_assign_expired_borrows();
    `)
  },
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   * @returns {Promise<any>}
  */
  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('drop function if exists fnt_assign_expired_borrows cascade;')
  },
}