const { subCategoryControl } = require("../../controller/subCategory/subCategoryControl");
const { adminControl } = require("../../controller/admin/adminController");
const { Router } = require('express');
const { makeExpressCallback } = require("../../helpers/expressCallback");
const { makeAuthMiddleware } = require("../../helpers/authMiddleware");
const { userControl } = require("../../controller/user/userControl");

const subCategoryRouter = Router()

subCategoryRouter.get('/',
    makeExpressCallback(subCategoryControl.read)
)
subCategoryRouter.post('/create',
    makeAuthMiddleware(adminControl.verifyAuth),
    makeExpressCallback(subCategoryControl.create)
)
subCategoryRouter.get('/findbycategory/:id',
    makeExpressCallback(subCategoryControl.listByCategory)
)
subCategoryRouter.get('/getById/:id',
    makeExpressCallback(subCategoryControl.getById)
)

module.exports = { subCategoryRouter }