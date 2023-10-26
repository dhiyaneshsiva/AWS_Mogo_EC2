const { Router } = require('express')
const { makeExpressCallback } = require('../../helpers/expressCallback')
const { makeAuthMiddleware } = require('../../helpers/authMiddleware');
const { cartControl } = require('../../controller/cart/cartControl');
const { userControl } = require('../../controller/user/userControl');

const cartRouter = Router()

cartRouter.post('/createcart',
    makeAuthMiddleware(userControl.verifyAuth),
    makeExpressCallback(cartControl.createCart)
)
cartRouter.get('/getbyid:id',
    makeAuthMiddleware(userControl.verifyAuth),
    makeExpressCallback(cartControl.getCartById)
)
cartRouter.get('/getbyuser/:id',
    makeAuthMiddleware(userControl.verifyAuth),
    makeExpressCallback(cartControl.getCartByUserId)
)
cartRouter.delete('/delete/:id',
    makeAuthMiddleware(userControl.verifyAuth),
    makeExpressCallback(cartControl.deleteCartById)
)

module.exports = { cartRouter }