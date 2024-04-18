import { MongoClient, ServerApiVersion } from 'mongodb'

if (!process.env.MONGO_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const client = new MongoClient(process.env.MONGO_URI, {
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
      db = client.db('waladLink');
    } catch (e) {
      console.error(e);
    }
  }
  return;
}

async function create(name, data, index) {
  try {
    if(!db) await connectToDB()
    const collection = db.collection(name);
    if (index) {
      await Promise.all(
        index.map((element) =>
          collection.createIndex({ [element]: 1 }, { unique: true })
        )
      );
    }
    await collection.insertOne(data);
  } catch (e) {
    throw new Error(e.message);
  }
}

async function get(name, id) {
  if(!db) await connectToDB()
  const collection = db.collection(name);
  return await collection.findOne(id);
}

async function find(name, id) {
  if(!db) await connectToDB()
  const collection = db.collection(name);
  return await collection.find(id).toArray();
}

async function update(name, command, data, id) {
  if(!db) await connectToDB()
  const collection = db.collection(name);
  await collection.updateOne(id, { [command]: data });
}

async function deleteOne(name, id) {
  if(!db) await connectToDB()
  const collection = db.collection(name);
  await collection.deleteOne(id);
}

export { create, get, update, deleteOne, find };
