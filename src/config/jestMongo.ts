import { MongoMemoryServer } from "mongodb-memory-server";
const mongod = new MongoMemoryServer({ autoStart: false });

const globalSetup = async () => {
  await mongod.start();

  const MONGO_URI = await mongod.getConnectionString();

  process.env.MONGO_URL = MONGO_URI;

  return MONGO_URI;
};

export default globalSetup;
