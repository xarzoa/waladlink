import { MongoClient, ServerApiVersion } from 'mongodb'
import { comma } from 'postcss/lib/list';

if (!process.env.MONGO_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const client = new MongoClient(process.env.AUTHDB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

async function connectToDB() {
  if (!db) {
    try {
      await client.connect();
      console.info('Client connected successfully to MongoDB.');
      db = client.db('authData');
    } catch (e) {
      console.error(e);
    }
  }
  return;
}

async function update(name, command, data, id) {
  if(!db) await connectToDB()
  const collection = db.collection(name);
  await collection.updateOne(id, { [command]: data });
}

export { update };
