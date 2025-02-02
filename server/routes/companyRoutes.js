import express from "express";
import { changeJobApplicationStatus, changeJobVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from "../controllers/companyControllers.js";

const companyRouter = express.Router();

//register a company
companyRouter.post("/register",registerCompany)

//company login
companyRouter.post("/login",loginCompany)

//get company data
companyRouter.get("/data",getCompanyData)

//post a job
companyRouter.post("/post-job",postJob)

//get applicants for a job
companyRouter.post("/applicants",getCompanyJobApplicants)

//get company job list
companyRouter.get("/list-jobs",getCompanyPostedJobs)

//change job visibility
companyRouter.post("/change-visibility",changeJobVisibility)

//change application status
companyRouter.post("/change-status",changeJobApplicationStatus)


export default companyRouter;