import mongoose from "mongoose";

const mongoUri = process.env.MONGO_PRODUCTION_URL
  ? process.env.MONGO_PRODUCTION_URL
  : "";

const connection = mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

export default connection;
