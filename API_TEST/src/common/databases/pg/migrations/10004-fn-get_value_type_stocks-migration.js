module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   * @returns {Promise<any>}
  */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      create or replace function fn_get_value_type_stocks (_t text)
        returns int
        language plpgsql as $function$
        begin
          if(_t = 'BEGIN') then return 1;
          elseif(_t = 'BORROW') then return -1;
          elseif(_t = 'RETURN') then return 1;
          end if;
        end;$function$;
    `)
  },
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   * @returns {Promise<any>}
  */
  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('drop function if exists fn_get_value_type_stocks cascade;')
  },
}