import express from "express";
import protect from "../middlewares/authMiddleware.js";
import allowRoles from "../middlewares/roleMiddleware.js";
import { createStore, createUser, dashboard, getUsers } from "../Controllers/adminController.js";



const adminRouter = express.Router();

adminRouter.get(
  "/dashboard",
  protect,
  allowRoles("admin"),
  dashboard
);

adminRouter.post(
  "/users",
  protect,
  allowRoles("admin"),
  createUser
);

adminRouter.get(
  "/users",
  protect,
  allowRoles("admin"),
  getUsers
);

adminRouter.post(
  "/stores",
  protect,
  allowRoles("admin"),
  createStore
);

export default adminRouter;