
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





module.exports = router;