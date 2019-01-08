var express = require('express');
var router = express.Router();
let userRouter = require('./users');

module.exports = function (app) {
    app.use('/users', userRouter);
};
