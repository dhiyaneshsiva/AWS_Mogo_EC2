const { ObjectId } = require('mongodb')
const { DatabaseName } = require('../../settings/config')
const { MongoDBclient } = require('../../database/dbIndex')


function addressModel() {
    const Collection = 'addresses'
    // Connecting to Database Collection
    const address = MongoDBclient.db(DatabaseName).collection(Collection)

    return Object.freeze({
        create,
        read,
        update,
        deleteById,
        getById
    })


    async function getById({ userId }) {
        const filter = { user_id: new ObjectId(userId) };
        try {
            const result = await address.find(filter).toArray();
            return result
        }
        catch (error) {
            return error
        }
    }

    async function create({ body }) {
        const {
            address_type,
            first_name,
            last_name,
            email,
            number,
            user_address,
            country,
            state,
            city,
            zip_code,
            user_id,
            vendor_id,
        } = body
        try {
            const result = await address.insertOne({
                address_type: address_type,
                first_name: first_name || '',
                last_name: last_name || '',
                email: email || '',
                number: number || '',
                address: user_address || '',
                country: country || '',
                state: state || '',
                city: city || '',
                zip_code: zip_code || '',
                user_id: new ObjectId(user_id) || '',
                vendor_id: vendor_id ? new ObjectId(vendor_id) : '',
                created: new Date(),
                modified: new Date()
            });
            return result

        } catch (error) {
            return error
        }
    }



    async function read() {
        try {
            const result = await address.find().toArray();
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

    async function update({ addressId, ...body }) {
        const filter = { _id: new ObjectId(addressId) };
        const updateData = body.body
        updateData.modified = new Date()
        const findingIdAvailable = await address.findOne(filter);
        if (findingIdAvailable) {
            try {
                const result = await address.updateOne(filter, { $set: updateData });
                return result
            } catch (error) {
                return error
            }
        }
        else {
            return "Id Not Available"
        }
    }

    async function deleteById(addressDeleteId) {
        const filter = { _id: new ObjectId(addressDeleteId) };
        const findingIdAvailable = await address.findOne(filter);
        if (findingIdAvailable) {
            try {
                const result = await address.deleteOne(filter);
                return result

            } catch (error) {
                return error
            }
        }
        else {
            return "Id Not Available"
        }
    }
}

exports.addressModel = addressModel()