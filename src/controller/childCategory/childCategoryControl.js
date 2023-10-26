const { childCategoryModel } = require("../../modules/childCategory/childCategoryModel");


const read = async () => {
    const result = await childCategoryModel.read()
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
const listBySubCategory = async (body) => {
    const id = body.params.id
    const result = await childCategoryModel.listBySubCategory({ id })
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
    const result = await childCategoryModel.create({ body })
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

exports.childCategoryControl = {
    read,
    create,
    listBySubCategory
}