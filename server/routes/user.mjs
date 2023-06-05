import { Router } from "express";
const recordRoutes = Router();
import { connectMongoDB } from "../db/conn.mjs";
import User from "../models/user.js";
import auth from "../middlewares/auth"; // Import the authMiddleware
import {
  signup,
  signin,
  forgotPassword,
  resetPassword,
  getUserData,
} from "../controllers/user.js";

recordRoutes.route("/signup").post(signup);
recordRoutes.route("/signin").post(signin);
recordRoutes.route("/forgotPassword").post(forgotPassword);
recordRoutes.route("/resetPassword").post(resetPassword);

recordRoutes.route("/userData").get(auth, getUserData); // Add the new route with authMiddleware

export default recordRoutes;
