import express from "express";
import protect from "../middlewares/authMiddleware.js";
import allowRoles from "../middlewares/roleMiddleware.js";
import { submitRating } from "../Controllers/ratingController.js";


const ratingRouter = express.Router();

ratingRouter.post(
  "/",
  protect,
  allowRoles("user"),
  submitRating
);

export default ratingRouter;