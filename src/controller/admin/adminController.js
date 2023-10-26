const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = require("../../settings/config");
const { isEncryptedTextMatch } = require("../../helpers/encrypt");
const { adminModel } = require("../../modules/admin/adminModel");
const { JwtPayload } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

const createAccessToken = (id) => {
  return jwt.sign({ id }, ACCESS_TOKEN_SECRET, {
    expiresIn: "48h", // 1hr - expiresIn should be in seconds (e.g., '1h' for 1 hour)
  });
};

const createRefreshToken = (id) => {
  return jwt.sign({ id }, REFRESH_TOKEN_SECRET, {
    expiresIn: "96h", // 24hrs - expiresIn should be in seconds (e.g., '24h' for 24 hours)
  });
};

// Admin Create
const createAdmin = async ({ body }) => {
  const result = await adminModel.createAdmin({
    body,
  });
  if (result.error) {
    return {
      statusCode: 500,
      data: {
        success: false,
        error: "Failed to register",
        message: result.message,
      },
    };
  }

  const accessToken = createAccessToken(result.id);
  const refreshToken = createRefreshToken(result.id);

  return {
    statusCode: 201,
    refreshToken,
    data: {
      success: true,
      data: {
        ...result,
        accessToken,
      },
    },
  };
};

// Login
const adminLogin = async ({ body }) => {
  const result = await adminModel.adminLogin({
    body,
  });
  if (!result) {
    return {
      statusCode: 302,
      data: {
        success: false,
        error: "User not found!",
        message: result.message,
      },
    };
  }

  const { password, _id, ...userData } = result;

  //comparing passwords
  const passwordValid = isEncryptedTextMatch(body.password, password);

  // checking if password was valid and send response accordingly
  if (!passwordValid) {
    return {
      statusCode: 401,
      data: {
        success: false,
        error: "Invalid Password!",
      },
    };
  }
  const accessToken = createAccessToken(_id);
  const refreshToken = createRefreshToken(_id);

  return {
    statusCode: 201,
    data: {
      success: true,
      data: {
        _id,
        ...userData,
        accessToken,
        refreshToken,
      },
      message: "Login successful.",
    },
  };
};

// Verify Auth
const verifyAuth = async ({ Authorization }) => {
  const authHeader = Authorization;
  if (authHeader === undefined) {
    return {
      statusCode: 401,
      data: {
        success: false,
        error: "Unauthorized User!",
      },
    };
  }

  try {
    const jwtToken = authHeader.split(" ")[1];
    const decoded = jwt.verify(jwtToken, ACCESS_TOKEN_SECRET);
    return {
      statusCode: 201,
      data: {
        success: true,
        data: {
          id: decoded.id,
        },
      },
    };
  } catch (e) {
    return {
      statusCode: 403,
      data: {
        success: false,
        error: "Forbidden!",
        Result: "User Not Allowed To Access",
      },
    };
  }
};

const getAdminById = async (body) => {
  const id = body.params.id;
  const result = await adminModel.getAdminById({
    id,
  });
  if (result.error) {
    return {
      statusCode: 500,
      data: {
        success: false,
        error: "Failed to List Admin Data",
        message: result.message,
      },
    };
  }

  const accessToken = createAccessToken(result.id);
  const refreshToken = createRefreshToken(result.id);

  return {
    statusCode: 201,
    data: {
      success: true,
      data: {
        ...result,
      },
    },
  };
};

const updateWithOutImage = async (body) => {
  const id = body.params.id;
  const result = await adminModel.updateAdminWithoutImage({ id, ...body });
  if (result) {
    return {
      statusCode: 201,
      data: {
        success: true,
        data: {
          result,
        },
      },
    };
  } else {
    return {
      statusCode: 500,
      data: {
        success: false,
        error: "Failed to Update",
        message: result.message,
      },
    };
  }
};
const withProfile = async (body) => {
  const file = body.file;
  const id = body.params.id;
  const result = await adminModel.withProfile({ file, id, ...body });
  if (result) {
    return {
      statusCode: 201,
      data: {
        success: true,
        data: {
          result,
        },
      },
    };
  } else {
    return {
      statusCode: 500,
      data: {
        success: false,
        error: "Failed to Update",
        message: result.message,
      },
    };
  }
};

const changePassword = async (body) => {
  const id = body.params.id;
  const result = await adminModel.changePassword({ id, ...body });
  if (result) {
    return {
      statusCode: 201,
      data: {
        success: true,
        data: {
          result,
        },
      },
    };
  } else {
    return {
      statusCode: 500,
      data: {
        success: false,
        error: "Failed to Update",
        message: result.message,
      },
    };
  }
};

const getAllAdmin = async () => {
  const result = await adminModel.getAllAdmin();
  if (result) {
    return {
      statusCode: 201,
      data: {
        success: true,
        data: {
          result,
        },
      },
    };
  } else {
    return {
      statusCode: 500,
      data: {
        success: false,
        error: "Failed to Update",
        message: result.message,
      },
    };
  }
};

exports.adminControl = {
  createAdmin,
  adminLogin,
  verifyAuth,
  getAdminById,
  updateWithOutImage,
  withProfile,
  changePassword,
  getAllAdmin,
};
