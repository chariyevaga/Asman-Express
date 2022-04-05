'use strict';
const express = require('express');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const helmet = require('helmet');
const cors = require('cors');
const sequelize = require('./config/db');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const yaml = require('js-yaml');

const app = express();

const limiter = rateLimit({
    max: process.env.NODE_ENV !== 'production' ? 1000 : 100,
    windowMs: 10 * 5 * 1000,
    message: 'Too many requests from this IP, please try in an 5 min!',
});

// middleware routes
const authChecker = require('./middlewares/authChecker');
const errorHandler = require('./utils/errorHandler');
const swaggerOptions = require('./utils/swaggerOptions');
const v1Route = require('./v1-route');
const v2Route = require('./v2-route');
const specs = swaggerJsDoc(swaggerOptions);

// middelwares
app.use(cookieParser());

app.use(cors());
app.use(helmet());
app.use(xss());
app.use(limiter);
app.use(bodyParser.json());
// For documentation
app.get('/api-docs/toJSON', (req, res, next) => {
    res.json(specs);
});
app.get('/api-docs/toYAML', (req, res, next) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send(yaml.dump(specs));
});
app.get('/api-docs.json', function (req, res) {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.send(specs);
});
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

// get authorization
app.use(authChecker);

// route by version
app.use('/api/v1', v1Route);
app.use('/api/v2', v2Route);

// errorHandeler (next(new AppError('message',code)))
app.use(errorHandler);

// DATABASE CONNECTION TESTING
try {
    sequelize.authenticate(() => {
        console.log('Database is OK');
    });
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = app;
