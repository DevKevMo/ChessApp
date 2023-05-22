import {
  Router
} from "express";
const recordRoutes = Router();
import {
  connectMongoDB
} from "../db/conn.mjs";
import User from "../models/user.js";
import {
  signin,
  signup,
  forgotPassword,
  resetPassword
} from '../controllers/user.js'

recordRoutes.route("/signup").post(signup);

export default recordRoutes;