require('dotenv').config();
const express = require('express');
const cors = require('cors');
const isAuth = require('./middleware/isAuth.js');
const unauthorizedHandler = require('./middleware/unauthorizedHandler.js');
const hwAssignmentController = require('./controllers/hwAssignment.js');
const hwSubmissionController = require('./controllers/hwSubmission.js');
const ideaSubmissionController = require('./controllers/ideaSubmission.js');
const dashboardController = require('./controllers/dashboard.js');
const authController = require('./controllers/auth.js');
const userController = require('./controllers/user.js');

const app = express();

// middleware
var whitelist = ['http://localhost:1337']; //white list consumers
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    },
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'device-remember-token',
        'Access-Control-Allow-Origin',
        'Origin',
        'Accept'
    ]
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '50mb' }));
app.use('/api', isAuth);
app.use(unauthorizedHandler);

app.use('/auth', authController);
app.use('/api/dashboard', dashboardController);
app.use('/api/hw/assignment', hwAssignmentController);
app.use('/api/hw/submission', hwSubmissionController);
app.use('/api/idea/submission', ideaSubmissionController);
app.use('/api/user', userController);

module.exports = app;
