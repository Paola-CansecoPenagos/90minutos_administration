import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';
const dbName = '90minutos_Analisis';

export const connectDB = async () => {
  const client = new MongoClient(url);
  await client.connect();
  console.log("Connected successfully to MongoDB");
  return client.db(dbName);
};
