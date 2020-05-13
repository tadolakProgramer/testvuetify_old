console.log('tado');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const server = require('http').createServer();
const port = process.env.PORT || 803;

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

require('./policies/passport');

require('./routers/router')(app);
require('./routers/notification')(app);
require('./routers/failure')(app)

server.listen(port, () => console.log(`Listening on ${port}`));
//app.listen(803);
