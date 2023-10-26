const { cartModel } = require("../../modules/cart/cartModel");

const createCart = async (body) => {
    const user = body.user
    const result = await cartModel.createCart({ ...body, user })
    if (result.error) {
        return {
            statusCode: 500,
            data: {
                success: false,
                error: "Failed to Create Products",
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

const getCartById = async (body) => {
    const id = body.params.id
    const result =await cartModel.getById({ id })
    if (result.error) {
        return {
            statusCode: 500,
            data: {
                success: false,
                error: "Failed to Create Products",
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
const getCartByUserId = async (body) => {
    const id = body.params.id
    const result = await cartModel.getCartByUserID({ id })
    if (result.error) {
        return {
            statusCode: 500,
            data: {
                success: false,
                error: "Failed to Create Products",
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
const deleteCartById = async (body) => {
    const id = body.params.id
    const result =await cartModel.deleteById({ id })
    if (result.error) {
        return {
            statusCode: 500,
            data: {
                success: false,
                error: "Failed to Create Products",
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

exports.cartControl = {
    createCart,
    getCartByUserId,
    getCartById,
    deleteCartById
}