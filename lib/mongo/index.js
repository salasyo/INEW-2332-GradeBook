import { MongoClient, ServerApiVersion } from 'mongodb';

const URI = process.env.MONGODB_URI // Will hold URI from MongoDb

if (!URI) throw new Error('Please add your Mongo URI to .env.local') // Throws an error if no URI is received from MongoDb

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
