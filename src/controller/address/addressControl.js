const { addressModel } = require("../../modules/address/addressModel");

const getById = async (body) => {
    const userId = body.params.id
    const result = await addressModel.getById({
        userId
    })

    if (result === null) {
        return {
            statusCode: 500,
            data: {
                success: false,
                error: "Failed to List Address",
                message: result,
            },
        };
    }
    else {
        return {
            statusCode: 201,
            data: {
                success: true,
                data: result
            },
        };
    }
}


const createAddress = async ({ body }) => {
    const result = await addressModel.create({
        body
    })
    if (result.error) {
        return {
            statusCode: 500,
            data: {
                success: false,
                error: "Failed to Add Address",
                message: result.message,
            },
        };
    }

    return {
        statusCode: 201,
        data: {
            success: true,
            data: {
                ...result,
            },
        },
    };
}


const readAddress = async () => {
    const result = await addressModel.read()
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
    }
    else {
        return {
            statusCode: 500,
            data: {
                success: false,
                error: "Failed to List Data",
                message: result.message,
            },
        };
    }
}


const updateAddress = async (body) => {
    const addressId = body.params.id
    const result = await addressModel.update({ addressId, ...body })
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
    }
    else {
        return {
            statusCode: 500,
            data: {
                success: false,
                error: "Failed to Update",
                message: result.message,
            },
        };
    }
}


const deleteAddress = async (body) => {
    const addressDeleteId = body.params.id;
    const result = await addressModel.deleteById(addressDeleteId)
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
    }
    else {
        return {
            statusCode: 500,
            data: {
                success: false,
                error: "Failed to Delete",
                message: result.message,
            },
        };
    }
}


exports.addressControl = {
    createAddress,
    readAddress,
    updateAddress,
    deleteAddress,
    getById
};