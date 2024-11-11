const express = require('express');
const categoryRoute = express.Router();
const categoryController = require('../controller/category.controller');
const userAuth = require("../middleware/user.auth");

categoryRoute.post('/create',userAuth,categoryController.createCatgeory);
categoryRoute.get('/all',userAuth,categoryController.getCatgeory);
categoryRoute.get('/edit/:id',userAuth,categoryController.editCategory);
categoryRoute.put('/update/:id',userAuth,categoryController.updateCatgeory);
categoryRoute.delete('/delete/:id',userAuth,categoryController.deleteCatgeory);

module.exports = categoryRoute;