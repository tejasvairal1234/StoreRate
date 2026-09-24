import express from "express";
import dotenv from "dotenv";
import { connect } from "mongoose";
import connectDB from "./src/config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
// app.use();

connectDB();

app.listen(port, () => {
  console.log(`Server is Started`);
  console.log(`http://localhost:${port}`);
});
