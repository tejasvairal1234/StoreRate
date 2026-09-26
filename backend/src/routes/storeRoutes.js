import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { getStores } from "../Controllers/storeController.js";



const storeRouter = express.Router();

storeRouter.get("/", protect, getStores);

export default storeRouter;