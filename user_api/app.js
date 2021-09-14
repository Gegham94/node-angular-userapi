const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

let projectsRouter = require('./routes/projects');
let usersRouter = require('./routes/users');

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true , limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users-api', usersRouter);
app.use('/projects-api', projectsRouter);

module.exports = app;
