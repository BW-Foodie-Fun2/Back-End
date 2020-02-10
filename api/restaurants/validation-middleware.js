module.exports = {
    bodyValidation,
    checkDuplicate,
    bodyWhitelist,
    checkRestaurantId,
    checkIfAuthorized
  };
  
  const Restaurants = require('./restaurantModel.js');
  
  function bodyValidation(req, res, next)  {
    const { name, cuisine_id, location, hours_of_operation, img_url} = req.body;
  
    console.log("restaurant validation-middleware bodyValidation req.body: ", JSON.stringify(req.body))
  
    if (name && cuisine_id && location && hours_of_operation && img_url) {
      next()
    } else {
      res.status(400).json({ message: "Please add a name, cuisine_id, location, hours_of_operation and image_url." })
    }
  }
  
  function checkDuplicate(req, res, next) {
    const { name } = req.body
  
    console.log("restaurant validation-middleware checkDuplicate name: ", name)
  
    Restaurants.findBy({name})
    .then(restaurant => {
      if (restaurant) {
        res.status(400).json({ message: "Restaurant name already exists" })
      } else {
        next()
      }
    })
    .catch(err => console.log("restaurant validation-middleware checkDuplicate 500 error: ", err))
  }
  
  function bodyWhitelist(body) {
    console.log("restaurant validation-middleware bodyWhitelist body: ", JSON.stringify(body))
    // This function is for making sure users can't set/update certain fields
    const {id, created_by, created_at, updated_at, ...filteredBody} = body
  
    return filteredBody
  }
  
  function checkRestaurantId(req, res, next) {
    const { id } = req.params
  
    Restaurants.findById(id)
      .then((restaurant) => {
        if (restaurant) {
          req.restaurant = restaurant
          console.log(req.restaurant)
          next()
        } else {
          res.status(404).json({ message: "Restaurant with provided id does not exist"})
        }
      })
      .catch(err => res.status(500).json({ message: "Failed to get restaurant from database", error: err }))
  }
  
  function checkIfAuthorized(req, res, next) {
  
    if (req.restaurant.created_by === req.token.username) {
      next()
    } else {
      res.status(401).json({ message: "You are not allowed to edit or delete restaurants you did not create." })
    }
  }