import bcrypt from "bcrypt"
import Company from '../models/Company.js';
import {v2 as cloudinary} from "cloudinary";
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";

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
        const imageUpload = await cloudinary.uploader.upload(imageFile.path);
        const {secure_url} = imageUpload;
        const company = await Company.create({name,email,password:hashedPassword,image:secure_url});
        res.json({success:true,
            company:{_id:company._id,name:company.name,email:company.email,image:company.image},
            token:generateToken(company._id)});
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}

//company login
export const loginCompany=async(req,res)=>{
        const {email,password} =req.body;
        if(!email || !password){
            return res.json({success:false,message:"Missing details"})
        }
        try {
            const company = await Company.findOne({email})
            if(!company){
             return   res.json({success:false,message:"Company not found"})
            }
            const passwordMatch =  await bcrypt.compare(password,company.password);
            if(!passwordMatch){
              return  res.json({success:false,message:"Email or password is incorrect"})
            }
          return  res.json({success:true,
                company:{_id:company._id,name:company.name,email:company.email,image:company.image},
                token:generateToken(company._id)})
        } catch (error) {
          return  res.json({success:false,message:error.message})
        }
}

//get company data
export const getCompanyData=(req,res)=>{
    try {
        const company = req.company;
        return res.json({success:true,company})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}

//post a new job
export const postJob=async(req,res)=>{
    const {title,description,location,category,level,salary} =req.body;
    const companyId = req?.company?._id;
    if(!title || !description || !location || !category || !level || !salary || !companyId){
        return res.json({success:false,message:"Missing details"})
    }
    try {
        const newJob = new Job({title,description,location,category,level,salary,date:Date.now(),companyId});
        await newJob.save();
        return res.json({success:true,newJob})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}

//get job applicants
export const getCompanyJobApplicants=(req,res)=>{
    
}

//get company posted jobs
export const getCompanyPostedJobs=(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}

//change job application status
export const changeJobApplicationStatus=(req,res)=>{
    
}

//change job visibility
export const changeJobVisibility=(req,res)=>{
    
}