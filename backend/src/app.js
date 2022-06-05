require('dotenv').config();
const express = require('express');
const cors = require('cors');
const isAuth = require('./middleware/isAuth.js');
const unauthorizedHandler = require('./middleware/unauthorizedHandler.js');
const hwAssignmentController = require('./controllers/hwAssignment.js');
const hwSubmissionController = require('./controllers/hwSubmission.js');
const ideaSubmissionController = require('./controllers/ideaSubmission.js');
const authController = require('./controllers/auth.js');
const userController = require('./controllers/user.js');

const app = express();

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', isAuth);
app.use(unauthorizedHandler);

// static
app.use('/', express.static(__dirname + '/static'));

// routes
app.use('/auth', authController);
app.use('/api/hw/assignment', hwAssignmentController);
app.use('/api/hw/submission', hwSubmissionController);
app.use('/api/idea/submission', ideaSubmissionController);
app.use('/api/user', userController);

module.exports = app;
