const express = require('express');
const serviceRoute = express.Router();
const ServiceController = require('../controller/service.controller');
const userAuth = require("../middleware/user.auth");

serviceRoute.post('/create/:category_id',userAuth,ServiceController.createCategoryService);
serviceRoute.get('/all/:category_id',userAuth,ServiceController.getCategoryService);
serviceRoute.get('/edit/:id/',userAuth,ServiceController.editCategoryService);
serviceRoute.put('/update/:id/:category_id',userAuth,ServiceController.updateCategoryService);
serviceRoute.delete('/delete/:id/:category_id',userAuth,ServiceController.deleteCategoryService);

module.exports = serviceRoute;