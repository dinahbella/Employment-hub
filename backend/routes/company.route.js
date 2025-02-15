import express from "express";
import {
  getCompany,
  registerCompany,
  updateCompany,
} from "../controllers/company.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(isAuthenticated, registerCompany);
router.route("/get").post(isAuthenticated, getCompany);
router.route("/get/:id").get(isAuthenticated);
router.route("/update/:id").post(isAuthenticated, updateCompany);

export default router;
