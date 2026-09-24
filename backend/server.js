import express from "express";
import dotenv from "dotenv";
import cors from "cros";
import connectDB from "./src/config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

connectDB();

// app.use("/api/auth", )
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

app.listen(port, () => {
  console.log(`Server is Started`);
  console.log(`http://localhost:${port}`);
});
