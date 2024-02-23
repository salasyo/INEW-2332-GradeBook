import { client } from './index';

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
    