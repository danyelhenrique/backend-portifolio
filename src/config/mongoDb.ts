import mongoose from "mongoose";

const mongoUri = process.env.MONGO_URL ? process.env.MONGO_URL : "";

const connection = mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch(console.error);

export default connection;
