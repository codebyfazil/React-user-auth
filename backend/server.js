import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors"
import authRoutes from "./routes/auth.js";
import { connectDB } from "./config/db.js";
import mongoose from "mongoose";
import session from "express-session";

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
const PORT = process.env.PORT || 5000;

// frontend > backend
app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/auth", authRoutes);

connectDB();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection failed:", err));
