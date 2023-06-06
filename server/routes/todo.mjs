import { Router } from "express";
const recordRoutes = Router();
import { auth } from "../middleware/auth.js"; // Import the authMiddleware
import { create, fetchData, remove, update } from "../controllers/todo.js";

recordRoutes.route("/todo/create").post(auth, create);
recordRoutes.route("/todo/remove").post(auth, remove);
recordRoutes.route("/todo/update").post(auth, update);
recordRoutes.route("/todo/fetchData").post(auth, fetchData);

export default recordRoutes;
