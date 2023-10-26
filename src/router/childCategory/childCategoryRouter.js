const { adminControl } = require("../../controller/admin/adminController");
const { Router } = require('express');
const { makeExpressCallback } = require("../../helpers/expressCallback");
const { makeAuthMiddleware } = require("../../helpers/authMiddleware");
const { childCategoryControl } = require("../../controller/childCategory/childCategoryControl");

const childCategoryRouter = Router()

childCategoryRouter.get('/',
    makeExpressCallback(childCategoryControl.read)
)

childCategoryRouter.get('/listbySubCategory/:id',
    makeAuthMiddleware(adminControl.verifyAuth),
    makeExpressCallback(childCategoryControl.listBySubCategory)
)

childCategoryRouter.post('/create',
    makeAuthMiddleware(adminControl.verifyAuth),
    makeExpressCallback(childCategoryControl.create)
)

module.exports = { childCategoryRouter }