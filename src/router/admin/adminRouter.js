const { Router } = require("express");
const { adminControl } = require("../../controller/admin/adminController");
const { makeExpressCallback } = require("../../helpers/expressCallback");
const { makeAuthMiddleware } = require("../../helpers/authMiddleware");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const adminRouter = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "./src/assets/adminProfile";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    return cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    return cb(
      null,
      "Admin_Profile" + "_" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

adminRouter.post(
  "/adminregister",
  makeAuthMiddleware(adminControl.verifyAuth),
  makeExpressCallback(adminControl.createAdmin)
);

adminRouter.post("/adminlogin", makeExpressCallback(adminControl.adminLogin));

adminRouter.get(
  "/:id",
  makeAuthMiddleware(adminControl.verifyAuth),
  makeExpressCallback(adminControl.getAdminById)
);

adminRouter.put(
  "/withoutimage/:id",
  makeAuthMiddleware(adminControl.verifyAuth),
  makeExpressCallback(adminControl.updateWithOutImage)
);

adminRouter.put(
  "/withprofile/:id",
  upload.single("file"),
  makeAuthMiddleware(adminControl.verifyAuth),
  makeExpressCallback(adminControl.withProfile)
);

adminRouter.post(
  "/changepassword/:id",
  makeAuthMiddleware(adminControl.verifyAuth),
  makeExpressCallback(adminControl.changePassword)
);

adminRouter.get(
  "/",
  makeAuthMiddleware(adminControl.verifyAuth),
  makeExpressCallback(adminControl.getAllAdmin)
);

module.exports = { adminRouter };
