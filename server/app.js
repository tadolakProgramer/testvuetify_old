console.log('tado');
const passport = require('passport');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const {database} = require('./database/databases');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.use(session({
    secret: 'tadolakmysqlsession',
    resave: false,
    saveUninitialized: false,
    stor: new MySQLStore(database)
}));

app.use(passport.initialize());
app.use(passport.session());

require('./routers/router')(app, passport);
require('./routers/notification')(app, passport);
require('./policies/passport');

/*
app.use(require('./routers/router'));
app.use(require('./routers/notification'));
*/

app.listen(process.env.PORT || 8081);
