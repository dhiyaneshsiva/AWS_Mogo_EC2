const { MongoClient, ServerApiVersion } = require('mongodb');

const url = process.env.MongoDB_URL 

// Connecting Mongoclient
const MongoDBclient = new MongoClient(url, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Connecting to Db
async function connectToDatabase() {
    try {
        await MongoDBclient.connect();
        await MongoDBclient.db("Mogo").command({ ping: 1 });
        console.log("Successfully Connected To MongoDB Database Mogo Happy Hacking");
    }
    catch (error) {
        console.log(`Error in Database Connection : ${error}`);
    }
}

module.exports = {
    connectToDatabase,
    MongoDBclient
}
