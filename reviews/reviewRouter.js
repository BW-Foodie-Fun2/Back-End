const express = require('express')

const Reviews = require('../reviews/reviewModel');

const router = express.Router();

const restricted = require('../auth/authenticate-middleware');
const { bodyWhitelist, checkReviewId, checkIfAuthorized } = require('./validation-middleware');

router.get('/', (req, res) => {
    Reviews.find()
    .then(reviews => {
        res.status(200).json(reviews)
    })
    .catch(err => res.status(500).json({ message: 'Failed to get reviews from database', error: err}))
})

router.get('/:id', checkReviewId, (req, res) => {
    res.status(200).json(req.review)
})

router.post('/', restricted, (req, res) => {
    const filteredBody = bodyWhitelist(req.body)

    const body = {...filteredBody, reviewed_by: req.token.username}

    Reviews.add(body)
        .then(review => res.status(201).json(review))
        .catch(err => res.status(500).json({ error: err }))
})

router.put('/:id', restricted, checkReviewId, checkIfAuthorized, (req, res) => {
    const { id } = req.params
    const filteredBody = bodyWhitelist(req.body)

    const body = {...filteredBody, updated_at: new Date(Date.now()).toISOString()}

    Reviews.update(id, body)
        .then(() => {
            Reviews.findById(id)
            .then((review) => {
                res.status(200).json(review)
            })
        })
        .catch(err => res.status(500).json({ errorMessage: 'Failed to update review', error: err}))
})

router.delete('/:id', restricted, checkReviewId, checkIfAuthorized, (req, res) => {
    Reviews.remove(req.params.id)
        .then(the => res.status(204).end())
        .catch(err => {
            console.log(err)
            res.status(500).json({ errorMessage: 'Failed to delete review', error: err })
        })
});

module.exports = router;