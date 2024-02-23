import { MongoClient, ServerApiVersion } from 'mongodb';

const URI = process.env.MONGODB_URI // Will hold URI from MongoDb

if (!URI) throw new Error('Please add your Mongo URI to .env.local') // Throws an error if no URI is received from MongoDb

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function testConnection() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    return "Ping successful!"
  } 
  catch (error) {
    console.dir
  }
  finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}