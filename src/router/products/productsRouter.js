const { Router } = require('express')
const { makeExpressCallback } = require('../../helpers/expressCallback')
const { makeAuthMiddleware } = require('../../helpers/authMiddleware');
const { productControl } = require("../../controller/products/productController");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { adminControl } = require('../../controller/admin/adminController');

const productRouter = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = './src/assets/productImages';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        return cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        return cb(null, 'Product_Image' + '_' + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

productRouter.post('/create',
    upload.array('file'),
    makeAuthMiddleware(adminControl.verifyAuth),
    makeExpressCallback(productControl.createProduct)
)

productRouter.post('/arrayofproduct',
    makeExpressCallback(productControl.getArrayOfId)
)

productRouter.get('/',
    makeExpressCallback(productControl.listProducts)
)

productRouter.get('/getbyid/:id',
    makeExpressCallback(productControl.getById)
)

module.exports = { productRouter }