module.exports = {
    loginRequirements,
    signupRequirements,
    checkForDuplicates,
    checkUserId
  };
  
  const Users = require('../users/userModel.js');
  
  function loginRequirements(req, res, next) {
    const { username, password } = req.body;
  
    if (username && password) {
      next()
    } else {
      res.status(400).json({ message: "Please enter a username and password" })
    }
  }
  
  function signupRequirements(req, res, next) {
    const { username, password, location, email} = req.body;
  
    if (username && password && location && email) {
      next()
    } else {
      res.status(400).json({ message: "Please enter all required data" })
    }
  }
  
  function checkForDuplicates(req, res, next) {
    const { username, email } = req.body;
  
    Users.findBy({username})
    .then(user => {
      if (user) {
        res.status(400).json({ message: "Username is already taken"})
      } else {
        Users.findBy({email})
        .then(user => {
          if (user) {
            res.status(400).json({ message: "Email is already taken"})
          } else {
            next()
          }
        })
      }
    })
    .catch(err => console.log(err))
  }
  
  function checkUserId(req, res, next) {
    const { username } = req.params
  
    console.log(username)
  
    Users.findById(username)
      .then((user) => {
        console.log(user)
        if (user) {
          next()
        } else {
          res.status(404).json({ message: "Invalid user id."})
        }
      })
      .catch(err => res.status(500).json({ message: "'Failed to get user from database'", error: err }))
  }