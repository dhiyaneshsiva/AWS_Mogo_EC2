const { ObjectId } = require("mongodb");
const { DatabaseName } = require("../../settings/config");
const { MongoDBclient } = require("../../database/dbIndex");

function cartModel() {
    // collection Name
    const cartcollection = 'cart'
    const productcollection = 'products'

    // Connecting to Db
    const cart = MongoDBclient.db(DatabaseName).collection(cartcollection)
    const Product = MongoDBclient.db(DatabaseName).collection(productcollection)

    return Object.freeze({
        createCart,
        getCartByUserID,
        getById,
        deleteById
    })

    async function createCart({ body, user }) {
        const {
            product_id,
        } = body
        try {
            const result = await cart.insertOne({
                product_id: new ObjectId(product_id),
                user_id: new ObjectId(user.id),
                created: new Date(),
                modified: new Date()
            })
            return result
        }
        catch (error) {
            return error
        }
    }


    async function getCartByUserID({ id }) {
        const filter = { user_id: new ObjectId(id) }
        try {
            const resultApi = await cart.find(filter).toArray()
            const productIds = resultApi.map(item => item.product_id);
            const productDetails = await Product.find({ _id: { $in: productIds } }).toArray();

            const result = resultApi.map(cartItem => {
                const productDetail = productDetails.find(product => product._id.equals(cartItem.product_id));
                return {
                    _id: cartItem._id,
                    product_id: cartItem.product_id,
                    user_id: cartItem.user_id,
                    product_details: productDetail
                };
            });
            return result
        }
        catch (error) {
            return error
        }
    }

    async function getById({ id }) {
        const filter = { _id: new ObjectId(id) }
        try {
            const result = await cart.findOne(filter)
            return result
        }
        catch (error) {
            return error
        }
    }

    async function deleteById({ id }) {
        const filter = { _id: new ObjectId(id) }
        try {
            const result = await cart.deleteOne(filter)
            return result
        }
        catch (error) {
            return error
        }
    }
}

exports.cartModel = cartModel()