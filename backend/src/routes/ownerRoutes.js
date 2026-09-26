import express from "express";
import protect from "../middlewares/authMiddleware.js";
import allowRoles from "../middlewares/roleMiddleware.js";
import {
  getOwnerDashboard,
  getOwnerRatings,
} from "../Controllers/ownerController.js";

const ownerRouter = express.Router();

// Owner Dashboard: View store info, average rating and total ratings
ownerRouter.get(
  "/dashboard",
  protect,
  allowRoles("owner"),
  getOwnerDashboard
);

// Owner Ratings: View list of users who rated their store
ownerRouter.get(
  "/ratings",
  protect,
  allowRoles("owner"),
  getOwnerRatings
);

export default ownerRouter;
