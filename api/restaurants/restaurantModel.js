const db = require('../../database/db-config');

module.exports = {
  addRestaurant,
  findRestaurants,
  findById,
  deleteRestaurant,
  updateRestaurant
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

function updateRestaurant(id, changes) {
  return db('restaurants')
    .where('restaurants.id', id)
    .update(changes)
    .then(count => (count.length > 0 ? this.get(id) : null));
}

function deleteRestaurant(id) {
  return db('restaurants')
    .where('restaurants.id', id)
    .del();
}
