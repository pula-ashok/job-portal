
import JobApplication from '../models/JobApplication.js';
import User from './../models/User.js';
import Job from './../models/Job.js';
// get user data
export const getUserData=async(req,res)=>{
        const userId = req?.auth?.userId;
        try {
            const user = await User.findById(userId);
            if(!user){
                return res.json({success:false,message:"User not found"});
            }
            res.json({success:true,user})
        } catch (error) {
            res.json({success:false,message:error.message})
        }
}

//apply for a job
export const applyForJob=async(req,res)=>{
    const userId =  req?.auth?.userId;
    const {jobId} = req?.body;
    try {
        const isAppliedAlready = await JobApplication.find({jobId,userId});
        if(isAppliedAlready.length >0){
            return res.json({success:false,message:"Already applied for this job"});
        }
        const jobData = await Job.findById(jobId)
        if(!jobData){
            return res.json({success:false,message:"Job not found"});   
        }
        const jobApplication = new JobApplication({
            userId,
            jobId,
            companyId:jobData.companyId,
            date:Date.now(),
        })
        await jobApplication.save();
        res.json({success:true,message:"Applied successfully"})

    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

// get user applied applications
export const getUserAppliedApplications=(req,res)=>{
    
}

// update user profile (resume)
export const updateUserResume=(req,res)=>{
    
}