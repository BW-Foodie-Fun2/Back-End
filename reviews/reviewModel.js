module.exports = {
    find,
    findById,
    findByUsername,
    findByRestaurantId, 
    add,
    update,
    remove
};

const db = require('../database/db-config');

function find() {
    return db('reviews')
        .orderBy('id')
}

function findById(id) {
    return db('reviews')
        .where({id})
        .first()
}

function findByRestaurantId(id) {
    return db('reviews')
        .where({ restaurant_id: id})
        .orderBy('id')
}

function findByUsername(username) {
    return db('reviews')
        .where({reviewed_by: username})
        .orderBy('id')
}

function add(review) {
    return db('reviews')
        .insert(review)
        .returning('id')
        .then(ids => {
            const [id] = ids;
            return findById(id);
        })
}

function update(id, changes) {
    return db('reviews')
        .where({ id })
        .update(changes);
}

function remove(id) {
    return db('reviews')
        .where('id', id)
        .del();
}