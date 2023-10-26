const { DatabaseName } = require("../../settings/config");
const { encryptText, isEncryptedTextMatch } = require("../../helpers/encrypt");
const { ObjectId } = require("mongodb");
const { MongoDBclient } = require("../../database/dbIndex");

function vendorModel() {
  // collection Name
  const vendorCollection = "vendor";

  // Connecting to Db
  const vendor = MongoDBclient.db(DatabaseName).collection(vendorCollection);

  return Object.freeze({
    createvendor,
    vendorLogin,
    getvendorById,
    updatevendorWithoutImage,
    withProfile,
    changePassword,
    getAll,
  });

  async function getAll() {
    try {
      const result = await vendor.find().toArray();
      return result;
    } catch (err) {
      return err;
    }
  }

  // Change User Password
  async function changePassword({ id, ...body }) {
    const filter = { _id: new ObjectId(id) };
    try {
      const findingUser = await vendor.findOne(filter);
      const oldPassword = findingUser.password;
      const new_passowrd = body.body.new_password;
      const passwordValidation = isEncryptedTextMatch(
        body.body.password,
        oldPassword
      );
      if (passwordValidation) {
        const encryptPassword = await encryptText(new_passowrd);
        const password = {
          password: encryptPassword,
        };
        try {
          const result = await vendor.updateOne(filter, { $set: password });
          return result;
        } catch (error) {
          return error;
        }
      } else {
        return "Invalid Old Password";
      }
    } catch (error) {
      return error;
    }
  }

  async function withProfile({ file, id, ...body }) {
    const filter = { _id: new ObjectId(id) };
    const updateData = body.body;
    updateData.modified = new Date();
    try {
      if (file) {
        const profile_image = file.filename;
        updateData.profile_image = profile_image;
        const result = await vendor.updateOne(filter, { $set: updateData });
        return result;
      } else {
        return "Profile Image is Compulsory";
      }
    } catch (err) {
      return err;
    }
  }

  async function updatevendorWithoutImage({ id, ...body }) {
    const filter = { _id: new ObjectId(id) };
    const updateData = body.body;
    updateData.modified = new Date();
    try {
      const result = await vendor.updateOne(filter, { $set: updateData });
      return result;
    } catch (err) {
      return err;
    }
  }

  // Create
  async function createvendor({ body }) {
    const {
      first_name,
      last_name,
      company_name,
      email,
      mobile_number,
      password,
      GSTIN,
      address,
      country,
      state,
      zip_code,
    } = body;
    const encryptPassword = await encryptText(password);
    try {
      const result = await vendor.insertOne({
        first_name: first_name || "",
        last_name: last_name || "",
        company_name: company_name || "",
        email: email || "",
        mobile_number: mobile_number || "",
        GSTIN: GSTIN || "",
        address: address || "",
        country: country || "",
        state: state || "",
        zip_code: zip_code || "",
        password: encryptPassword,
        created: new Date(),
        modified: new Date(),
      });
      return result;
    } catch (error) {
      return error;
    }
  }

  // Login
  async function vendorLogin({ body }) {
    try {
      const { email } = body;
      const filter = { email: email };
      const result = await vendor.findOne(filter);
      if (!result) {
        return "Nothing to Show -- Collection is Empty";
      } else {
        const filter = { _id: new ObjectId(result._id) };
        await vendor.updateOne(filter, { $set: { last_seen: new Date() } });
        return result;
      }
    } catch (error) {
      return error;
    }
  }

  // Get vendor by ID
  async function getvendorById({ id }) {
    try {
      const filter = { _id: new ObjectId(id) };
      const result = await vendor.findOne(filter);
      if (!result) {
        return "Nothing to Show -- Collection is Empty";
      } else {
        return result;
      }
    } catch (error) {
      return error;
    }
  }
}

exports.vendorModel = vendorModel();
