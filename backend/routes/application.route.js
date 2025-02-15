import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  applyJob,
  getAppliedJobs,
  getApplicants,
  updateStatus,
} from "../controllers/application.controllers.js";

const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getAppliedJobs);
router.route("/get/:id").get(isAuthenticated, getApplicants);
router.route("/update/:id").post(isAuthenticated, updateStatus);

export default router;
