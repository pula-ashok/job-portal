import express from "express";
import { changeJobApplicationStatus, changeJobVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from "../controllers/companyController.js";
import upload from "../config/multer.js";
import { protectCompany } from "../middleware/authMiddleware.js";

const companyRouter = express.Router();

//register a company
companyRouter.post("/register",upload.single("image"),registerCompany)

//company login
companyRouter.post("/login",loginCompany)

//get company data
companyRouter.get("/data",protectCompany ,getCompanyData)

//post a job
companyRouter.post("/post-job",protectCompany ,postJob)

//get applicants for a job
companyRouter.get("/applicants",protectCompany ,getCompanyJobApplicants)

//get company job list
companyRouter.get("/list-jobs",protectCompany ,getCompanyPostedJobs)

//change job visibility
companyRouter.post("/change-visibility",protectCompany ,changeJobVisibility)

//change application status
companyRouter.post("/change-status",protectCompany ,changeJobApplicationStatus)


export default companyRouter;