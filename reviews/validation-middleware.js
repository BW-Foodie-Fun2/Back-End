module.exports = {
    bodyValidation,
    bodyWhitelist,
    checkReviewId,
    checkIfAuthorized
};

const Reviews = require('../reviews/reviewModel');

function bodyValidation(req, res, next) {
    console.log(req.method)
    const { menu_item, item_price, item_rating, item_review, restaurant_id, item_image_url} = req.body;
    if (menu_item && item_price && item_rating && item_review && restaurant_id && item_image_url) {
        next()
    }  else {
        res.status(400).json({ message: 'Please menu_item, item_price, item_rating, item_review, restaurant_id, and item_image_url'})
    }
}

function bodyWhitelist(body) {
    // This function is for making sure users can't set/update certain fields
    const {id, reviewed_by, created_at, updated_at, ...filteredBody} = body
  
    return filteredBody
}

function checkReviewId(req, res, next) {
    const {id} = req.params

    Reviews.findById(id)
        .then((review) => {
            if (review) {
                req.review = review
                next()
            } else {
                res.status(404).json({ message: 'Invalid review id'})
            }
        })
        .catch(err => res.status(500).json({ errorMessage: 'Failed to fetch requested review from database', error: err }))
}

function checkIfAuthorized(req, res, next) {
    if(req.review.reviewed_by === req.token.username) {
        next()
    } else {
        res.status(401).json({ message: 'You cannot edit or delete reviews that you dont own'})
    }
}