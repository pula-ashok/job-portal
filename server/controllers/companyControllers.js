import bcrypt from "bcrypt"
import Company from './../models/Company.js';

//register a new company
export const registerCompany=async(req,res)=>{
    const {name,email,password} = req.body;
    const imageFile = req.file;
    if(!name || !email || !password || !imageFile){
        return res.json({success:false,message:"Missing details"})
    }
    try {
        const companyExists =  await Company.findOne({email});
        if(companyExists){
            return res.json({success:false,message:"Company already registered"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
    } catch (error) {
        
    }
}

//company login
export const loginCompany=(req,res)=>{

}

//get company data
export const getCompanyData=(req,res)=>{
    
}

//post a new job
export const postJob=(req,res)=>{
    
}

//get job applicants
export const getCompanyJobApplicants=(req,res)=>{
    
}

//get company posted jobs
export const getCompanyPostedJobs=(req,res)=>{
    
}

//change job application status
export const changeJobApplicationStatus=(req,res)=>{
    
}

//change job visibility
export const changeJobVisibility=(req,res)=>{
    
}