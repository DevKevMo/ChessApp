import { Router } from "express";
const recordRoutes = Router();
import { auth } from "../middleware/auth.js"; // Import the authMiddleware
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

recordRoutes.route("/userData").post(auth, getUserData); // Add the new route with authMiddleware

export default recordRoutes;
