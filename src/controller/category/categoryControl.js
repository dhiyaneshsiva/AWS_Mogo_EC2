const { categoryModel } = require("../../modules/category/categoryModel");


const readCategory = async () => {
    const result = await categoryModel.getCategory()
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


const create = async ({ body }) => {
    const result = await categoryModel.createCategory({ body })
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
    const result = await categoryModel.getCategoryById({ id })
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

exports.categoryControl = {
    readCategory,
    create,
    getById
}