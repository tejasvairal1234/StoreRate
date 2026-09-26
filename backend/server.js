import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRouter from "./src/routes/authRoute.js";
import userRouter from "./src/routes/userRoutes.js";
import storeRouter from "./src/routes/storeRoutes.js";
import ratingRouter from "./src/routes/ratingRoutes.js";
import adminRouter from "./src/routes/adminRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB database
connectDB();

// Root route - Basic health check endpoint to verify server is running
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Store Rating API is running successfully",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/stores", storeRouter);
app.use("/api/ratings", ratingRouter);
app.use("/api/admin", adminRouter);
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
