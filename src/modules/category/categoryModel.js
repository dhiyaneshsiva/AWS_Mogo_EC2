const { ObjectId } = require("mongodb");
const { DatabaseName } = require("../../settings/config");
const { MongoDBclient } = require("../../database/dbIndex");


function categoryModel() {
    // collection Name
    const categorycollection = 'category'

    // Connecting to Db
    const category = MongoDBclient.db(DatabaseName).collection(categorycollection)

    return Object.freeze({
        createCategory,
        getCategory,
        getCategoryById
    })

    // Create Category
    async function createCategory({ body }) {
        const {
            name
        } = body
        const filter = { name: name }
        const findingAvailablity = await category.findOne(filter)
        try {
            if (findingAvailablity) {
                return 'Category Name Already Exists'
            }
            else {
                const result = await category.insertOne({
                    name: name,
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
    async function getCategory() {
        try {
            const result = await category.find().toArray();
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

    async function getCategoryById({ id }) {
        const filter = { _id: new ObjectId(id) }
        try {
            const result = await category.findOne(filter)
            return result
        }
        catch (error) {
            return error
        }
    }
}

exports.categoryModel = categoryModel()