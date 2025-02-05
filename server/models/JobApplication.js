import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema({
    userId:{type:String,ref:"User",required:true},
    jobId:{type:mongoose.Schema.Types.ObjectId,ref:"Job",required:true},
    companyId:{type:mongoose.Schema.Types.ObjectId,ref:"Company",required:true},
    date:{type:Number,required:true},
    status:{type:String,default:"Pending"},
},{timestamps:true});

const JobApplication = mongoose.models.JobApplication || mongoose.model("JobApplication",jobApplicationSchema);

export default JobApplication;