const db = require('../../database/db-config');

module.exports = {
  findBy,
  add,
  findRestaurants,
  findById,
  remove,
  update,
  findByUsername
};

function findBy(filter) {
  return db('restaurants')
    .where(filter)
    .first()
}

function findRestaurants() {
  return db('restaurants as r')
    .join('cuisines as c', 'r.cuisine_id', 'c.id')
    .select('r.id', 'r.name', 'c.cuisine_name', 'r.location', 'r.hours_of_operation', 'r.img_url', 'r.created_by')
}


function add(restaurant) {
  console.log("restaurantModel add(): ", JSON.stringify(restaurant))
  return db('restaurants')
    .insert(restaurant)
    .returning('id')
    .then(ids => {
      const [id] = ids;
      return findById(id);
    })
}

function findById(restaurant_id) {
  return db('restaurants as r')
    .where('r.id', restaurant_id)
    .join('cuisines as c', 'r.cuisine_id', 'c.id',)
    .select('r.id as id', 'r.name as name', 'c.cuisine_name as cuisine', 'r.location as location', 'r.hours_of_operation as hours_of_operation', 'r.img_url as img_url', 'r.created_by as created_by', 'r.created_at as created_at', 'r.updated_at as updated_at')
    .first()
}

function update(id, changes) {
  return db('restaurants')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('restaurants')
    .where('id', id)
    .del();
}

function findByUsername(username) {
  return db('restaurants as r')
    .where({ created_by: username })
    .join('cuisines as c', 'r.cuisine_id', 'c.id')
    .select('r.id', 'r.name', 'c.cuisine_name', 'r.location', 'r.hours_of_operation', 'r.img_url')
    .orderBy('r.id')
}