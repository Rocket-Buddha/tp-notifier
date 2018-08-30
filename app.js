var express = require('express');
var app = express();
var db = require('./db');

var UserController = require('./users/UsersController');
app.use('/users', UserController);

module.exports = app;