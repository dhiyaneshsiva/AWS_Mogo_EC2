const { Router } = require('express')
const { addressControl } = require('../../controller/address/addressControl')
const { adminControl } = require('../../controller/admin/adminController')
const { makeAuthMiddleware } = require('../../helpers/authMiddleware')
const { makeExpressCallback } = require('../../helpers/expressCallback')


const addressRouter = Router()


addressRouter.post("/create",
    makeAuthMiddleware(adminControl.verifyAuth),
    makeExpressCallback(addressControl.createAddress)
)

addressRouter.get("/",
    makeAuthMiddleware(adminControl.verifyAuth),
    makeExpressCallback(addressControl.readAddress)
)

addressRouter.get("/useraddress/:id",
    makeAuthMiddleware(adminControl.verifyAuth),
    makeExpressCallback(addressControl.getById)
)

addressRouter.put('/update/:id',
    makeAuthMiddleware(adminControl.verifyAuth),
    makeExpressCallback(addressControl.updateAddress)
)

addressRouter.delete('/delete/:id',
    makeAuthMiddleware(adminControl.verifyAuth),
    makeExpressCallback(addressControl.deleteAddress)
)

module.exports = { addressRouter }