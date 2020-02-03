const db = require('../../database/db-config');

module.exports = {
  addRestaurant,
  findRestaurants,
  findById
};

function findRestaurants() {
  return db('restaurants')
}

function addRestaurant(restaurant) {
  return db('restaurants')
    .insert(restaurant)
    .then(ids => {
      const [id] = ids;
      return findById(id);
    })
}

function findById (id){
  return db('restaurants')
      .where('restaurants.id', id)
}
