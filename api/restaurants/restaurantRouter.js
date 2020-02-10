const express = require("express");
const router = express.Router();
const restaurantModel = require("../restaurants/restaurantModel.js");
const restricted = require("../../auth/authenticate-middleware")
const Reviews = require('../../reviews/reviewModel.js');

const { bodyValidation, checkDuplicate, bodyWhitelist, checkRestaurantId, checkIfAuthorized } = require('./validation-middleware.js');

router.get("/", (req, res) => {

  restaurantModel.findRestaurants()
    .then(restaurants => {
      res.status(200).json(restaurants)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "Failed to get restaurants" });
    });
});

router.get('/:id', checkRestaurantId, (req, res) => {
  res.status(200).json(req.restaurant)
})

router.get('/:id/reviews', checkRestaurantId, (req, res) => {
  const { id } = req.params

  Reviews.findByRestaurantId(id)
  .then(reviews => {
    res.status(200).json(reviews)
  })
  .catch(err => res.status(500).json({ message: "'Failed to get reviews from database'", error: err }))
})

router.post('/', restricted, bodyValidation, (req, res) => {
  console.log(req.body)
  const filteredBody = bodyWhitelist(req.body)

  console.log("restaurantRouter POST req.body: ", JSON.stringify(req.body))

  const body = {...filteredBody, created_by: req.token.username}

  restaurantModel.add(body)
  .then(restaurant => res.status(201).json(restaurant))
  .catch(err => {
    console.log("restaurantRouter POST 500 error: ", err)
    res.status(500).json({ error: err })
  })
})

router.put('/:id', restricted, checkRestaurantId, (req, res) => {
  const filteredBody = bodyWhitelist(req.body)
  const { id } = req.params

  const body = {...filteredBody, updated_at: new Date(Date.now()).toISOString()}

  restaurantModel.update(id, body)
  .then(() => {
    restaurantModel.findById(id)
    .then((restaurant) => {
      res.status(200).json(restaurant)
    })
  })
  .catch(err => res.status(500).json({ error: err }))
})

router.delete('/:id', restricted, checkRestaurantId, checkIfAuthorized, (req, res) => {
  restaurantModel.remove(req.params.id)
  .then(() => res.status(204).end())
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: err })
  })
});





module.exports = router;