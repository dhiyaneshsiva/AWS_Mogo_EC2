const { Router } = require("express");
const { makeExpressCallback } = require("../../helpers/expressCallback");
const { makeAuthMiddleware } = require("../../helpers/authMiddleware");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const { vendorControl } = require("../../controller/vendor/vendorControl");
const { adminControl } = require("../../controller/admin/adminController");

const vendorRouter = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "./src/assets/vendorProfile";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    return cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    return cb(
      null,
      "vendor_Profile" + "_" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

vendorRouter.get('/',
makeAuthMiddleware(adminControl.verifyAuth),
makeExpressCallback(vendorControl.getAll)
)

vendorRouter.post(
  "/vendorregister",
  makeExpressCallback(vendorControl.createvendor)
);

vendorRouter.post(
  "/vendorlogin",
  makeExpressCallback(vendorControl.vendorLogin)
);

vendorRouter.get(
  "/:id",
  makeAuthMiddleware(vendorControl.verifyAuth),
  makeExpressCallback(vendorControl.getvendorById)
);

vendorRouter.put(
  "/withoutimage/:id",
  makeAuthMiddleware(vendorControl.verifyAuth),
  makeExpressCallback(vendorControl.updateWithOutImage)
);

vendorRouter.put(
  "/withprofile/:id",
  upload.single("file"),
  makeAuthMiddleware(vendorControl.verifyAuth),
  makeExpressCallback(vendorControl.withProfile)
);

vendorRouter.post(
  "/changepassword/:id",
  makeAuthMiddleware(vendorControl.verifyAuth),
  makeExpressCallback(vendorControl.changePassword)
);

module.exports = { vendorRouter };
