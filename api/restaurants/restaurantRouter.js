const express = require("express");
const router = express.Router();
const restaurantModel = require("../restaurants/restaurantModel.js");
const restricted = require("../../auth/authenticate-middleware")
const Reviews = require('../../reviews/reviewModel.js');

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

router.get("/:id/reviews", (req, res) => {
  const id = req.params.id
  Reviews.findByRestaurantId(id)
    .then(reviews => {
      res.status(200).json(reviews)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "Failed to get reviews for this restaurant" });
    });
});

router.post("/", restricted, (req, res) => {
  const restaurantBody = req.body
  restaurantModel.addRestaurant(restaurantBody)
    .then(restaurant => {
      console.log(restaurantBody)
      if (!restaurantBody.name || !restaurantBody.cuisine_id || !restaurantBody.hours_of_operation || !restaurantBody.location || !restaurantBody.img_url || !restaurantBody.created_by) {
        return res.status(400).json({ message: 'All fields are required' });
      } else {
        res.status(200).json(restaurant)
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err.message);
    });
});

router.put("/:id", restricted, (req, res) => {
  const id = req.params.id
  const changes = req.body
  restaurantModel.updateRestaurant(id, changes)
    .then(restaurant => {
      res.status(200).json(restaurant)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "Failed to update restaurant" });
    });
});

router.delete("/:id", restricted, (req, res) => {
  const id = req.params.id
  restaurantModel.deleteRestaurant(id)
    .then(id => {
      res.status(200).json(id)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "Failed to delete restaurant" });
    });
});





module.exports = router;