const { DatabaseName } = require("../../settings/config");
const { encryptText, isEncryptedTextMatch } = require("../../helpers/encrypt");
const { ObjectId } = require("mongodb");
const { MongoDBclient } = require("../../database/dbIndex");

function userModel() {
  // collection Name
  const userCollection = "users";

  // Connecting to Db
  const user = MongoDBclient.db(DatabaseName).collection(userCollection);

  return Object.freeze({
    createuser,
    userLogin,
    getuserById,
    updateUser,
    changePassowrd,
    updateUserWithutImages,
    getAllUsers,
  });

  async function getAllUsers() {
    try {
      const result = await user.find().toArray();
      return result;
    } catch (err) {
      return err;
    }
  }

  // Create
  async function createuser({ body }) {
    const { email, password, first_name, last_name, status } = body;
    const encryptPassword = await encryptText(password);
    if (
      email !== null ||
      undefined ||
      ("" && password !== null) ||
      undefined ||
      ""
    ) {
      try {
        const result = await user.insertOne({
          email: email,
          password: encryptPassword,
          first_name: first_name || "",
          last_name: last_name || "",
          last_seen: new Date(),
          status: status || "Active",
          created: new Date(),
          modified: new Date(),
        });
        return result;
      } catch (error) {
        return error;
      }
    } else {
      return "Email id , Password is Compulsory";
    }
  }

  // Login
  async function userLogin({ body }) {
    try {
      const { email } = body;
      const filter = { email: email };
      const result = await user.findOne(filter);
      if (!result) {
        return "Nothing to Show -- Collection is Empty";
      } else {
        const filter = { _id: new ObjectId(result._id) };
        await user.updateOne(filter, { $set: { last_seen: new Date() } });
        return result;
      }
    } catch (error) {
      return error;
    }
  }

  //  Get Admin by ID
  async function getuserById({ id }) {
    try {
      const filter = { _id: new ObjectId(id) };
      const result = await user.findOne(filter);
      if (!result) {
        return "Nothing to Show -- Collection is Empty";
      } else {
        return result;
      }
    } catch (error) {
      return error;
    }
  }

  // update User
  async function updateUser({ id, ...body }) {
    const filter = { _id: new ObjectId(id) };
    const updateData = body.body;
    updateData.modified = new Date();
    if (body.file.filename) {
      const profile_image = body.file.filename;
      updateData.profile_image = profile_image;
    }
    const findingIdAvailable = await user.findOne(filter);
    if (findingIdAvailable) {
      if (body.body.password) {
        const encryptPassword = await encryptText(body.body.password);
        updateData.password = encryptPassword;
        try {
          const result = await user.updateOne(filter, { $set: updateData });
          return result;
        } catch (error) {
          return error;
        }
      } else {
        try {
          const result = await user.updateOne(filter, { $set: updateData });
          return result;
        } catch (error) {
          return error;
        }
      }
    } else {
      return "Id Not Available";
    }
  }
  // update User Without Image
  async function updateUserWithutImages({ id, ...body }) {
    const filter = { _id: new ObjectId(id) };
    const updateData = body.body;
    updateData.modified = new Date();
    const findingIdAvailable = await user.findOne(filter);
    if (findingIdAvailable) {
      if (body.body.password) {
        const encryptPassword = await encryptText(body.body.password);
        updateData.password = encryptPassword;
        try {
          const result = await user.updateOne(filter, { $set: updateData });
          return result;
        } catch (error) {
          return error;
        }
      } else {
        try {
          const result = await user.updateOne(filter, { $set: updateData });
          return result;
        } catch (error) {
          return error;
        }
      }
    } else {
      return "Id Not Available";
    }
  }

  async function changePassowrd({ id, ...body }) {
    const filter = { _id: new ObjectId(id) };
    try {
      const findingUser = await user.findOne(filter);
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
          const result = await user.updateOne(filter, { $set: password });
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
}

exports.userModel = userModel();
