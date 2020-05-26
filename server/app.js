console.log('tado');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());


require('./policies/passport');

require('./routers/router')(app);
require('./routers/notification')(app);
require('./routers/failure')(app);
require('./routers/parts')(app);

app.listen(process.env.PORT || 3000);
