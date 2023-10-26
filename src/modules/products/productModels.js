const { ObjectId } = require("mongodb");
const { DatabaseName } = require("../../settings/config");
const { MongoDBclient } = require("../../database/dbIndex");

function productsModel() {
  // collection Name
  const productcollection = "products";

  // Connecting to Db
  const product = MongoDBclient.db(DatabaseName).collection(productcollection);

  return Object.freeze({
    createProducts,
    getProducts,
    getById,
    getArryOfId,
  });

  // getArryOfId
  async function getArryOfId({ body }) {
    const arrayOfId = body.arrayId.map((id) => new ObjectId(id));
    try {
      const result = await product
        .find({
          _id: { $in: arrayOfId },
        })
        .toArray();
      return result;
    } catch (err) {
      return err;
    }
  }

  // get By id
  async function getById({ id }) {
    const filter = { _id: new ObjectId(id) };
    try {
      const result = await product.findOne(filter);
      return result;
    } catch (error) {
      return error;
    }
  }

  // get
  async function getProducts() {
    try {
      const result = await product
        .aggregate([
          {
            $lookup: {
              from: "category",
              localField: "product_category",
              foreignField: "_id",
              as: "CategoryDetails",
            },
          },
          {
            $lookup: {
              from: "sub_category",
              localField: "product_subcategory",
              foreignField: "_id",
              as: "subCategoryDetails",
            },
          },
          {
            $lookup: {
              from: "admin",
              localField: "admin_id",
              foreignField: "_id",
              as: "adminDetails",
            },
          },
          {
            $lookup: {
              from: "vendor",
              localField: "vendor_id",
              foreignField: "_id",
              as: "vendorDetails",
            },
          },
        ])
        .toArray();
      if (result.length < 0 || result == "" || null || undefined) {
        return "Nothing to Show -- Collection is Empty";
      } else {
        return result;
      }
    } catch (error) {
      return error;
    }
  }

  // Create
  async function createProducts({ body }) {
    const productImages = body.files;
    const {
      name,
      description,
      short_description,
      product_type,
      actual_price,
      sale_price,
      tax_status,
      tax_type,
      tax_rate,
      SKU,
      product_status,
      product_category,
      weight,
      length,
      width,
      height,
      status,
      initial_quantity,
      allow_backorders,
      low_stock_threshold,
      stock_status,
      product_subcategory,
      admin_id,
      product_tags,
      slug,
      vendor_id,
    } = body.body;
    try {
      if (productImages.length > 0) {
        const mainProductImage = productImages[0].filename;
        productImages.shift();
        const productGalleryImages = productImages.map(
          (value) => value.filename
        );
        const result = await product.insertOne({
          name: name || "",
          description: description || "",
          short_description: short_description || "",
          product_type: product_type || "",
          actual_price: actual_price || "",
          sale_price: sale_price || "",
          tax_status: tax_status || "",
          tax_type: tax_type || "",
          tax_rate: tax_rate || "",
          SKU: SKU || "",
          product_status: product_status || "",
          product_category: new ObjectId(product_category) || "",
          weight: weight || "",
          length: length,
          width: width,
          height: height,
          stock_management_status: status,
          initial_quantity: initial_quantity,
          allow_backorders: allow_backorders,
          low_stock_threshold: low_stock_threshold,
          stock_status: stock_status,
          product_subcategory: new ObjectId(product_subcategory),
          admin_id: admin_id ? new ObjectId(admin_id) : "",
          vendor_id: vendor_id ? new ObjectId(vendor_id) : "",
          product_tags: product_tags,
          slug: slug || "",
          product_image: mainProductImage || "",
          product_gallery_image: productGalleryImages || "",
          created: new Date(),
          modified: new Date(),
        });
        return result;
      }
    } catch (error) {
      return error;
    }
  }
}

exports.productsModel = productsModel();
