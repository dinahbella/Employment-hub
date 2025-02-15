import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";

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

// api
app.use("/api/user", userRoute);
app.use("/api/company", companyRoute);

("http://localhost:9000/api/user/register");

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at ${PORT}`);
});
