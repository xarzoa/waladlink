import { MongoClient } from 'mongodb';

if (!process.env.AUTHDB_URI) {
  throw new Error('Invalid/Missing environment variable: "AUTHDB_URI"');
}

const uri = process.env.AUTHDB_URI;
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

async function update(name, command, data, id) {
  const client = await clientPromise;
  const db = client.db('authData');
  const collection = db.collection(name);
  await collection.updateOne(id, { [command]: data });
}

async function deleteOne(name, id) {
  const client = await clientPromise;
  const db = client.db('authData');
  const collection = db.collection(name);
  await collection.deleteOne(id);
}

export { clientPromise, update, deleteOne as deleteUser };
