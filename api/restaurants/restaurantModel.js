const db = require('../../database/db-config');

module.exports = {
  addRestaurant,
  findRestaurants,
  findById,
  deleteRestaurant,
  updateRestaurant,
  findByUsername
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
}

function deleteRestaurant(id) {
  return db('restaurants')
    .where('restaurants.id', id)
    .del();
}

function findByUsername(username) {
  return db('restaurants')
      .where({created_by: username})
      .orderBy('id')
      .select('name', 'cuisine_id', 'location', 'hours_of_operation', 'img_url')
}