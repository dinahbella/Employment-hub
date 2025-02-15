import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// middlewarre
app.use(express.json());
app.get(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
