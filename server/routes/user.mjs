import { Router } from "express";
const recordRoutes = Router();
import { connectMongoDB } from "../db/conn.mjs";
import User from "../models/user.js";
import {
  signup,
/*   signin,
  forgotPassword,
  resetPassword, */
} from "../controllers/user.js";

recordRoutes.route("/signup").post(signup);
/* recordRoutes.route("/signin").post(signin);
recordRoutes.route("/forgotPassword").post(forgotPassword);
recordRoutes.route("/resetPassword").post(resetPassword); */

export default recordRoutes;
