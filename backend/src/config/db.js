import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURL =
      process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/store_rating";
    const conn = await mongoose.connect(mongoURL);
    console.log(
      `Connected Successfully ${conn.connection.host}/${conn.connection.name}`,
    );
  } catch (error) {
    console.error(`Connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;