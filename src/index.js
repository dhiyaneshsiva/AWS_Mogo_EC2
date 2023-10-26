const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Cors = require("cors");
require("dotenv").config();
// Router Pages
const { adminRouter } = require("./router/admin/adminRouter");
const { productRouter } = require("./router/products/productsRouter");
const { categoryRouter } = require("./router/category/categoryRouter");
const { subCategoryRouter } = require("./router/subCategory/subCategoryRouter");
const {
  childCategoryRouter,
} = require("./router/childCategory/childCategoryRouter");
const { userRouter } = require("./router/user/userRouter");
const { addressRouter } = require("./router/address/addressRouter");
const { cartRouter } = require("./router/cart/cartRouter");

// MongoDB Connection
const { connectToDatabase } = require("./database/dbIndex");
const { vendorRouter } = require("./router/vendor/vendorRouter");

//Body Parser
app.use(bodyParser.json());

// Statics
app.use(express.static("src"));

//Cors
app.use(Cors({ origin: true, credentials: true }));

// Database Connection
connectToDatabase();

// Welcome Message
app.get("/", (req, res) => {
  res.send("Hello All Welcome To Mogo ECommerce Website");
});

// Routers
app.use("/admin", adminRouter);
app.use("/vendor", vendorRouter);
app.use("/products", productRouter);
app.use("/category", categoryRouter);
app.use("/subcategory", subCategoryRouter);
app.use("/childcategory", childCategoryRouter);
app.use("/users", userRouter);
app.use("/address", addressRouter);
app.use("/cart", cartRouter);

app.listen(1212, () => {
  console.log(`Server Running in Port http://localhost:${1212}`);
});
