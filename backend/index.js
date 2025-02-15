import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";

dotenv.config({});
const app = express();

app.get("/home", (req, res) => {
  return res.status(200).json({
    message: "Backend",
    success: true,
  });
});

// middlewarre
app.use(express.json());
app.get(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at ${PORT}`);
});
