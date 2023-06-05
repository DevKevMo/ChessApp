import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    // Additional session options
  })
);

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
