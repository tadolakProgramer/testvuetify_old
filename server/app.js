console.log('tado');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const dns = require('dns');

const server = require('http').createServer();
const port = process.env.PORT || 3000;

const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    next();

});
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

require('./policies/passport');

require('./routers/router')(app);
require('./routers/notification')(app);
require('./routers/failure')(app)

dns.lookup('localhost',(err, adresess, family) => console.log('Adresss:',adresess, family ))
app.listen(port, () => {
    console.log(`Listening on ${port}`)

});
//app.listen(803);
