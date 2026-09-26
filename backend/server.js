import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRouter from "./src/routes/authRoute.js";
import userRouter from "./src/routes/userRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/stores", storeRoutes);
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

app.listen(port, () => {
  console.log(`Server is Started`);
  console.log(`http://localhost:${port}`);
});
