const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const AuthRouter = require('../auth/authRouter');
const ReviewRouter = require('../reviews/reviewRouter');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', AuthRouter);
server.use('/api/reviews', ReviewRouter);

server.get('/', (req, res) => {
    res.status(200).json({ api: 'api is up and running!'});
});

module.exports = server;