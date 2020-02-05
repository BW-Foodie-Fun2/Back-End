const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

const Users = require('../users/userModel');
const { loginRequirements, signupRequirements, checkForDuplicates } = require('../users/validation-middleware');

router.post('/register', signupRequirements, checkForDuplicates, (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    const token = signToken(user);

    Users.add(user)
        .then(saved => {
            res.status(201).json({
                token: token,
                message: `Welcome ${user.username}`,
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        });
});

router.post('/login', loginRequirements, (req, res) => {
    let { username, password } = req.body;
  
    Users.findBy({ username })
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
  
          const token = signToken(user);
  
          res.status(200).json({
            token: token,
            message: `Welcome back ${user.username}!`,
          });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        console.log(error)
        res.status(500).json(error);
      });
  });

function signToken(user) {
    const payload = {
        username: user.username,
        reviewed_by: user.username
    };

    const options = {
        expiresIn: '24h'
    };

    return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router;