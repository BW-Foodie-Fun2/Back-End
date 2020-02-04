
exports.up = function(knex) {
  return knex.schema.table('reviews', tbl => {
      tbl.date('date_visited')
  })
};

exports.down = function(knex) {
  return knex.schema.table('reviews', tbl => {
      tbl.dropColumn('date_visited')
  })
};
