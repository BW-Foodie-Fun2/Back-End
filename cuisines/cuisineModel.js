const db = require('../database/db-config');

function find() {
    return db('cuisines')
}

module.exports = {
    find
}