import express from "express";
import { applyForJob, getUserAppliedApplications, getUserData, updateUserResume } from "../controllers/userController.js";
import upload from "../config/multer.js";

const userRouter = express.Router();

// get user data
userRouter.get("/user",getUserData)

//apply for a job
userRouter.post("/apply-job",applyForJob)

//get user applied applications
userRouter.get("/applications",getUserAppliedApplications)

//update user resume
userRouter.put("/update-resume",upload.single("resume"),updateUserResume)

export default userRouter