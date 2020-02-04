
const express = require("express");
const router = express.Router();
const restaurantModel = require("../restaurants/restaurantModel.js");
const restricted = require("../../auth/authenticate-middleware")


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

router.post("/", restricted, (req, res) => {
  const restaurantBody = req.body
  restaurantModel.addRestaurant(restaurantBody)
    .then(restaurant => {
      res.status(200).json(restaurant)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "Failed to add restaurant"});
    });
});

router.put("/:id", restricted, (req, res) => {
    const id = req.params.id
    const changes = req.body
    restaurantModel.addRestaurant(id, changes)
      .then(restaurant => {
        res.status(200).json(restaurant)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ message: "Failed to update restaurant"});
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
        res.status(500).json({ message: "Failed to delete restaurant"});
      });
  });





module.exports = router;