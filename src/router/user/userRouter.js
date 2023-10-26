const { userControl } = require("../../controller/user/userControl");
const { Router } = require('express');
const { makeExpressCallback } = require("../../helpers/expressCallback");
const { makeAuthMiddleware } = require("../../helpers/authMiddleware");
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const { adminControl } = require("../../controller/admin/adminController");

const userRouter = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = './src/assets/userProfile';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        return cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        return cb(null, 'User_Profile' + '_' + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

userRouter.get('/',
makeAuthMiddleware(adminControl.verifyAuth),
makeExpressCallback(userControl.getAllUsers)
)

userRouter.post('/userlogin',
    makeExpressCallback(userControl.userLogin)
)
userRouter.post('/userregister',
    makeExpressCallback(userControl.createUser)
)
userRouter.get('/:id',
    makeAuthMiddleware(userControl.verifyAuth),
    makeExpressCallback(userControl.getUserById)
)
userRouter.put('/updateuser/:id',
    upload.single('file'),
    makeAuthMiddleware(userControl.verifyAuth),
    makeExpressCallback(userControl.updateUser)
)


userRouter.put('/updateuserwithoutimage/:id',
    makeAuthMiddleware(userControl.verifyAuth),
    makeExpressCallback(userControl.updateUserWithOutImage)
)



userRouter.post('/changepassword/:id',
    makeAuthMiddleware(userControl.verifyAuth),
    makeExpressCallback(userControl.changePassword)
)

module.exports = { userRouter }