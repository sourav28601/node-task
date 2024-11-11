const express = require('express');
const route = express.Router();
const authRoute = require('./auth.route');
const categoryRoute = require('./category.route');
const serviceRoute = require("./service.route");

route.use('/auth',authRoute);
route.use('/category',categoryRoute);
route.use('/service',serviceRoute);

module.exports = route;