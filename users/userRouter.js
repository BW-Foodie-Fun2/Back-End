const express = require('express');

const Reviews = require('../reviews/reviewModel');
const Users = require('./userModel');

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

router.get('/', (req, res) => {

    Users.findAllUsers()
    .then(users => {
        if(users.length > 0) {
            res.status(200).json(users)
        } else {
            res.status(404).json({message: 'Doesnt appear as though there are users in database'})
        }
    })
    .catch(err => res.status(500).json({ message: 'failed to get users from database'}))
})
module.exports = router;