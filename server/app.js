console.log('tado');
const express = require('express');
const multer = require('multer')
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(cors());

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
}
})

app.use(multer({storage:fileStorage}).single('file'));

app.use(morgan('combined'));
app.use(bodyParser.json());


require('./policies/passport');

require('./routers/router')(app);
require('./routers/notification')(app);
require('./routers/failure')(app);
require('./routers/parts')(app);
require('./routers/statistics')(app);
require('./routers/components')(app);
require('./routers/images')(app);

app.listen(process.env.PORT || 3000);
