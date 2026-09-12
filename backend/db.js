const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri);

let db;

async function connectToDatabase() {
  if (!db) {
    await client.connect();

    db = client.db("giftlink");

    console.log("MongoDB connected successfully");
  }

  return db;
}

module.exports = {
  connectToDatabase,
  client
};