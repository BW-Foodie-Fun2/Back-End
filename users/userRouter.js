const express = require('express');

const Reviews = require('../reviews/reviewModel');

const { checkUserId } = require('./validation-middleware');

const router = express.Router();

router.get('/:username/reviews', checkUserId, (req, res) => {
    const { username } = req.params;

    Reviews.findByUsername(username)
    .then(reviews => {
        res.status(200).json(reviews)
    })
    .catch(err => res.status(500).json({ message: 'Failed to get reviews from database', error:err}))
})

module.exports = router;