const { adminControl } = require("../../controller/admin/adminController");
const { categoryControl } = require("../../controller/category/categoryControl");
const { Router } = require('express');
const { makeExpressCallback } = require("../../helpers/expressCallback");
const { makeAuthMiddleware } = require("../../helpers/authMiddleware");
const { userControl } = require("../../controller/user/userControl");

const categoryRouter = Router()

categoryRouter.get('/',
    makeExpressCallback(categoryControl.readCategory)
)
categoryRouter.post('/addcategory',
    makeAuthMiddleware(adminControl.verifyAuth),
    makeExpressCallback(categoryControl.create)
)

categoryRouter.get('/getbyid/:id',
    makeExpressCallback(categoryControl.getById)
)

module.exports = { categoryRouter }