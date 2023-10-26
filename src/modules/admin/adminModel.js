const { DatabaseName } = require("../../settings/config");
const { encryptText, isEncryptedTextMatch } = require("../../helpers/encrypt");
const { ObjectId } = require("mongodb");
const { MongoDBclient } = require("../../database/dbIndex");

function adminModel() {
  // collection Name
  const adminCollection = "admin";

  // Connecting to Db
  const admin = MongoDBclient.db(DatabaseName).collection(adminCollection);

  return Object.freeze({
    createAdmin,
    adminLogin,
    getAdminById,
    updateAdminWithoutImage,
    withProfile,
    changePassword,
    getAllAdmin,
  });
  // List All Admin
  async function getAllAdmin() {
    try {
      const result = await admin.find().toArray();
      return result;
    } catch (err) {
      return err;
    }
  }

  // Change User Password
  async function changePassword({ id, ...body }) {
    const filter = { _id: new ObjectId(id) };
    try {
      const findingUser = await admin.findOne(filter);
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
          const result = await admin.updateOne(filter, { $set: password });
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
        const result = await admin.updateOne(filter, { $set: updateData });
        return result;
      } else {
        return "Profile Image is Compulsory";
      }
    } catch (err) {
      return err;
    }
  }

  async function updateAdminWithoutImage({ id, ...body }) {
    const filter = { _id: new ObjectId(id) };
    const updateData = body.body;
    updateData.modified = new Date();
    try {
      const result = await admin.updateOne(filter, { $set: updateData });
      return result;
    } catch (err) {
      return err;
    }
  }

  // Create
  async function createAdmin({ body }) {
    const { first_name, last_name, email, password, employeeId, status } = body;
    const encryptPassword = await encryptText(password);
    if (
      email !== null ||
      undefined ||
      ("" && password !== null) ||
      undefined ||
      ""
    ) {
      try {
        const result = await admin.insertOne({
          first_name: first_name || "",
          last_name: last_name || "",
          email: email,
          password: encryptPassword,
          employee_id: employeeId || "",
          status: status || "Active",
          created: new Date(),
          modified: new Date(),
        });
        return result;
      } catch (error) {
        return error;
      }
    } else {
      return "Email id , Password ";
    }
  }

  // Login
  async function adminLogin({ body }) {
    try {
      const { email } = body;
      const filter = { email: email };
      const result = await admin.findOne(filter);
      if (!result) {
        return "Nothing to Show -- Collection is Empty";
      } else {
        const filter = { _id: new ObjectId(result._id) };
        await admin.updateOne(filter, { $set: { last_seen: new Date() } });
        return result;
      }
    } catch (error) {
      return error;
    }
  }

  // Get Admin by ID
  async function getAdminById({ id }) {
    try {
      const filter = { _id: new ObjectId(id) };
      const result = await admin.findOne(filter);
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

exports.adminModel = adminModel();
