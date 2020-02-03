exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          "username": "ethan",
          "password": "123",
          "email": "nameethan@gmail.com",
          "location": "Las Vegas"
        }, {
          "username": "josh",
          "password": "1234",
          "email": "namejosh@gmail.com",
          "location": "Las Vegas"
        }, {
          "username": "kelly",
          "password": "12345",
          "email": "namekellyname@gmail.com",
          "location": "Las Vegas"
        }
      ]);
    });
};