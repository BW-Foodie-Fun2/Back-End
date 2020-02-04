const express = require('express');

const Cuisines = require('./cuisineModel');

const router = express.Router();

router.get('/', (req, res) => {
    Cuisines.find()
    .then(cuisines => {
        res.status(200).json(cuisines)
    })
    .catch(err => res.status(500).json({ message: 'Failed to get cuisines from database', error: err}))
})

module.exports = router;