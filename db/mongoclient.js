// db/mongoClient.js
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let db;

async function connectDB() {
  try {
    if (!db) {
      await client.connect();
      console.log('Connected to MongoDB');
      db = client.db(process.env.DB_NAME);
    }
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error; // Let the server crash on DB connection errors to avoid inconsistent state.
  }
}


function getDB() {
  if (!db) {
    throw new Error('Database not initialized. Please connect first!');
  }
  return db;
}

module.exports = { connectDB, getDB };
