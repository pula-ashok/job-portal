import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from './../context/AppContext';
import Loading from '../components/Loading';
import Navbar from './../components/Navbar';
import { assets } from '../assets/assets';
import kconvert from 'k-convert';
import moment, {} from 'moment'
import JobCard from './../components/JobCard';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';

const ApplyJob = () => {
  const {id}=useParams()
  const {jobs,backendUrl,userData,userApplications,fetchUserApplications}=useContext(AppContext)
  const [jobData, setJobData] = useState(null)
  const [alreadyApplied, setAlreadyApplied] = useState(false)
  const navigate = useNavigate()
  const {getToken} =useAuth()
  //fetch job using id
  const fetchJob=async()=>{
    try {
      const {data} =await axios.get(backendUrl+`/jobs/${id}`)
      if(data.success){
        setJobData(data.job)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    fetchJob()
  },[id])
  const applyJobHandler = async()=>{
    try {
      if(!userData){
        return toast.error("Login to apply for job")
      }
      if(!userData?.resume){
        navigate("/applications")
        return toast.error("Upload resume to apply job")
      }
      const token = await getToken();

      const {data} = await axios.post(backendUrl+"/users/apply-job",{jobId:jobData?._id},{headers:{Authorization:`Bearer ${token}`}})
      if(data.success){
        toast.success(data.message)
        fetchUserApplications();
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const checkAlreadyApplied=()=>{
    const applied = userApplications.some(application=>application?.jobId?._id===id)
    setAlreadyApplied(applied)
  }
  useEffect(()=>{
    if(userApplications.length>0 && jobData){
      checkAlreadyApplied()
    }
  },[userApplications,jobData,id])

  return jobData ?
    <>
    <Navbar/>
    <div className='min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto'>
      <div className=' text-black rounded-lg w-full'>
        <div className='flex justify-center md:justify-between flex-wrap gap-8 bg-sky-50 px-14 py-20 border border-sky-400 rounded-xl'>
          <div className='flex flex-col md:flex-row items-center'>
            <img src={jobData?.companyId?.image} alt="company id" className='h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border' />
            <div className=' text-center md:text-left text-neutral-700'>
              <h1 className='text-2xl sm:text-4xl font-bold'>{jobData?.title}</h1>
              <div className='flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2'>
                <span className='flex items-center gap-1'>
                  <img src={assets.suitcase_icon} alt="suitcase" />
                  {jobData?.companyId?.name}
                </span>
                <span className='flex items-center gap-1'>
                  <img src={assets.location_icon} alt="location" />
                  {jobData?.location}
                </span>
                <span className='flex items-center gap-1'>
                  <img src={assets.person_icon} alt="person" />
                  {jobData?.level}
                </span>
                <span className='flex items-center gap-1'>
                  <img src={assets.money_icon} alt="money" />
                  CTC: $ {kconvert.convertTo(jobData?.salary)}
                </span>
              </div>
            </div>
          </div>
          <div className='flex  flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center'>
            <button className='bg-blue-600 p-2.5 px-10 text-white rounded' onClick={applyJobHandler} disabled={alreadyApplied}>{alreadyApplied?'Already Applied':'Apply Now'}</button>
            <p className='mt-1 text-gray-600'>Posted {moment(jobData?.date).fromNow()}</p>
          </div>
        </div>
        <div className='flex flex-col md:flex-row justify-between items-start mt-10'>
        {/* left section  */}
        <div className='w-full lg:w-2/3'>
          <h2 className='font-bold text-2xl mb-4'>Job description</h2>
          <div className='rich-text' dangerouslySetInnerHTML={{__html:jobData?.description}}></div>
          <button className='mt-10 bg-blue-600 p-2.5 px-10 text-white rounded' onClick={applyJobHandler} disabled={alreadyApplied}>{alreadyApplied?'Already Applied':'Apply Now'}</button>
        </div>
        {/* right section  */}
        <div className='w-full lg:w-1/3 mt-10 lg:mt-0 lg:ml-8 space-y-5'>
          <h2>More jobs from {jobData?.companyId?.name}</h2>
          {jobs.filter(job=>job._id!==jobData?._id && job.companyId._id===jobData?.companyId._id)
          .filter(job=>true).slice(0,4).map(job=>(
            <JobCard job={job} key={job._id}/>))}
        </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
    : <Loading />
}

export default ApplyJob