
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cuisines')
    .then(function () {
      // Inserts seed entries
      return knex('cuisines').insert([
        {"name": "cheese burger"},
        {"name": "burrito bowl"},
        {"name": "fancy salad"}
      ]);
    });
};
