const { DatabaseName } = require("../../settings/config");
const { ObjectId } = require('mongodb');
const { MongoDBclient } = require("../../database/dbIndex");


function subCategoryModel() {
    // collection Name
    const subCategorycollection = 'sub_category'

    // Connecting to Db
    const subCategory = MongoDBclient.db(DatabaseName).collection(subCategorycollection)

    return Object.freeze({
        createSubCategory,
        getSubCategory,
        listByCategoryId,
        getById
    })

    // Create Category
    async function createSubCategory({ body }) {
        const {
            name,
            category_id
        } = body
        const filter = {
            name: name,
            category_id: new ObjectId(category_id)
        }
        try {
            const findingAvailability = await subCategory.findOne(filter)
            if (findingAvailability) {
                return 'Sub Category Already Exists in Same Category'
            }
            else {
                const result = await subCategory.insertOne({
                    name: name,
                    category_id: new ObjectId(category_id),
                    created: new Date(),
                    modified: new Date()
                })
                return result
            }
        }
        catch (err) {
            return err
        }
    }

    // List All Category
    async function getSubCategory() {
        try {
            const result = await subCategory.find().toArray();
            if (result.length < 0 || result == "" || null || undefined) {
                return 'Nothing to Show -- Collection is Empty'
            }
            else {
                return result
            }

        } catch (error) {
            return error
        }
    }

    // List By CategoryID
    async function listByCategoryId({ id }) {
        try {
            const result = await subCategory.find({ category_id: new ObjectId(id) }).toArray()
            if (result.length <= 0) {
                return 'No Sub Category Found in Category List'
            }
            else {
                return result
            }
        } catch (error) {
            return error
        }
    }

    async function getById({ id }) {
        const filter = { _id: new ObjectId(id) }
        try {
            const result = await subCategory.findOne(filter)
            return result
        }
        catch (error) {
            return error
        }
    }
}

exports.subCategoryModel = subCategoryModel()