import { MongoClient } from 'mongodb';

if (!process.env.MONGO_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGO_URI;
const options = {};

const client = new MongoClient(uri, options);

let clientPromise
try{
  clientPromise = client.connect();
}catch(e){
  console.log(e)
}finally{
  clientPromise = client.connect();
}

async function create(name, data, index) {
  try {
    const client = await clientPromise;
    const db = client.db('waladLink');
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
  const client = await clientPromise;
  const db = client.db('waladLink');
  const collection = db.collection(name);
  return await collection.findOne(id);
}

async function update(name, command, data, id) {
  const client = await clientPromise;
  const db = client.db('waladLink');
  const collection = db.collection(name);
  await collection.updateOne(id, { [command]: data });
}

async function deleteOne(name, id) {
  const client = await clientPromise;
  const db = client.db('waladLink');
  const collection = db.collection(name);
  await collection.deleteOne(id);
}

export { create, get, update, deleteOne };
