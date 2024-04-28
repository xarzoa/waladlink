import { MongoClient } from 'mongodb';

if (!process.env.AUTHDB_URI) {
  throw new Error('Invalid/Missing environment variable: "AUTHDB_URI"');
}

const uri = process.env.AUTHDB_URI;
const options = {};

const client = new MongoClient(uri, options);
const clientPromise = client.connect();

async function update(name, command, data, id) {
  const client = await clientPromise;
  const db = client.db('authData');
  const collection = db.collection(name);
  await collection.updateOne(id, { [command]: data });
}

export { clientPromise, update };
