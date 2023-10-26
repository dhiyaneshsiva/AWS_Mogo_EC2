const { productsModel } = require("../../modules/products/productModels");


// Admin Create
const createProduct = async (body) => {
    const result = await productsModel.createProducts({
        body
    })
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


// List Product
const listProducts = async () => {
    const result = await productsModel.getProducts()
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

const getById = async (body) => {
    const id = body.params.id
    const result = await productsModel.getById({ id })
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

const getArrayOfId = async ({ body }) => {
    const result = await productsModel.getArryOfId({ body })
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

exports.productControl = {
    createProduct,
    listProducts,
    getById,
    getArrayOfId
}