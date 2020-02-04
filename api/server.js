const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const AuthRouter = require('../auth/authRouter');
const ReviewRouter = require('../reviews/reviewRouter');
const RestaurantRouter = require('./restaurants/restaurantRouter')
const CuisineRouter = require('../cuisines/cuisineRouter');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', AuthRouter);
server.use('/api/reviews', ReviewRouter);
server.use('/api/restaurants', RestaurantRouter);
server.use('/api/cuisines', CuisineRouter);

server.get('/', (req, res) => {
    res.status(200).json({ api: 'api is up and running!'});
});

module.exports = server;