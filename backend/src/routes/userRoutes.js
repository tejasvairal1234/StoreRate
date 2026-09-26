import express from "express";
import { updatePassword } from "../Controllers/userController.js";




const userRouter = express.Router();

userRouter.put(
  "/update-password",
  updatePassword
);

export default userRouter