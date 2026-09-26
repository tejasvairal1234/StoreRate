import mongoose from "mongoose";

// Function to connect to MongoDB database
const connectDB = async () => {
  try {
    // Read connection string from environment variables or use local MongoDB default
    const mongoURI =
      process.env.MONGODB_URI ||
      process.env.MONGODB_URL ||
      "mongodb://127.0.0.1:27017/store_rating";

    const conn = await mongoose.connect(mongoURI);
    console.log(
      `MongoDB Connected Successfully: ${conn.connection.host}/${conn.connection.name}`
    );
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;