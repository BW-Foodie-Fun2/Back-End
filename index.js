require('dotenv').config();

const server = require('./api/server');

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`\n** server listening on port ${PORT} **\n`)
});

var https = require("https");
setInterval(function() {
    https.get("https://foodiefunbw.herokuapp.com/");
}, 1000 * 60 * 5); // every 5 minutes (300000)