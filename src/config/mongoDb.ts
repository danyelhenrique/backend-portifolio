import mongoose from "mongoose";

const connection = mongoose.connect(process.env.MONGO_PRODUCTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

export default connection;
