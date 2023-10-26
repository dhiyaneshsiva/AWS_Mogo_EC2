const { subCategoryModel } = require("../../modules/subCategory/subCategoryModel");

const read = async () => {
    const result = await subCategoryModel.getSubCategory()
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
    const result = await subCategoryModel.createSubCategory({ body })
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
const listByCategory = async (body) => {
    const id = body.params.id
    const result = await subCategoryModel.listByCategoryId({ id })
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
    const result = await subCategoryModel.getById({ id })
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

exports.subCategoryControl = {
    read,
    create,
    listByCategory,
    getById
}