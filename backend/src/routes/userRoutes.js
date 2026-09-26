import express from "express";
import { updatePassword } from "../Controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";




const userRouter = express.Router();

userRouter.put(
  "/update-password",
  protect,
  updatePassword
);

export default userRouter