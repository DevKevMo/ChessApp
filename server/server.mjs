import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
import recordsRoutes from "./routes/user.mjs";
app.use(recordsRoutes);

// Start the server
import { connectMongoDB } from "./db/conn.mjs";
app.listen(port, async () => {
  // perform a database connection when the server starts
  await connectMongoDB();
  console.log(`Server listening on port ${port}`);
});
