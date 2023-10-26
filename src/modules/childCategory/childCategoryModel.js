const { ObjectId } = require("mongodb");
const { DatabaseName } = require("../../settings/config");
const { MongoDBclient } = require("../../database/dbIndex");


function childCategoryModel() {
    // collection Name
    const childCategorycollection = 'child_category'

    // Connecting to Db
    const childCategory = MongoDBclient.db(DatabaseName).collection(childCategorycollection)

    return Object.freeze({
        create,
        read,
        listBySubCategory
    })

    // Create Category
    async function create({ body }) {
        const {
            name,
            category_id,
            sub_category_id
        } = body
        const filter = {
            name: name,
            category_id: new ObjectId(category_id),
            sub_category_id: new ObjectId(sub_category_id),
        }
        const findAvailability = await childCategory.find(filter).toArray()
        try {
            if (findAvailability.length > 0) {
                return "Child Name Exists"
            }
            else {
                const result = await childCategory.insertOne({
                    name: name,
                    category_id: new ObjectId(category_id),
                    sub_category_id: new ObjectId(sub_category_id),
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
    async function read() {
        try {
            const result = await childCategory.find().toArray();
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

    //List By Sub Category 
    async function listBySubCategory({ id }) {
        const filter = { sub_category_id: new ObjectId(id) }
        try {
            const result = await childCategory.find(filter).toArray();
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
}

exports.childCategoryModel = childCategoryModel()