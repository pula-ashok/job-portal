import React, { useContext, useEffect, useState } from 'react'
import Navbar from './../components/Navbar';
import { assets, jobsApplied } from '../assets/assets';
import moment from 'moment';
import { AppContext } from '../context/AppContext';
import { useAuth, useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [resume, setResume] = useState(null)
  const {userData,userApplications,backendUrl,fetchUserData,fetchUserApplications} =useContext(AppContext)
  const {getToken} = useAuth();
  const {user} = useUser();
  useEffect(()=>{
    if(user){
      fetchUserApplications()
    }
  },[user])
  const updateResume=async()=>{
      const formData = new FormData()
      formData.append("resume",resume)
      const token =await getToken();
      try {
        const {data} =await axios.put(backendUrl+"/users/update-resume",formData,{headers:{Authorization:`Bearer ${token}`}})
        if(data.success){
          toast.success(data.message)
          setIsEdit(false)
          fetchUserData()
          setResume(null)
        }
        else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
  }
  return (
    <>
    <Navbar/>
    <div className='container px-4 2xl:px-20 mx-auto min-h-[65vh] my-10'>
      <h2 className='text-2xl font-semibold'>Your Resume</h2>
      <div className='flex gap-2 mb-6 mt-3'>
        {isEdit || userData && userData?.resume ==="" ?<>
        <label htmlFor="resumeUpload" className='flex items-center cursor-pointer'>
          <p className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2'>{resume ? resume.name : "Select Resume"}</p>
          <input type="file" id='resumeUpload' accept='application/pdf' onChange={e=>setResume(e.target.files[0])} hidden/>
          <img src={assets.profile_upload_icon} alt="upload" />
        </label>
        <button className='bg-green-100 border border-green-400 rounded-lg px-4 py-2' onClick={updateResume}>Save</button>
        </>:<div>
          <div className='flex gap-2'>
            <a href='#' className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg'>Resume</a>
            <button className='text-gray-500 border border-gray-300 px-4 py-2 rounded-lg' onClick={e=>setIsEdit(true)}>Edit</button>
          </div>
          </div>}
      </div>
      <h2 className='text-2xl font-semibold mb-4'>Jobs Applied</h2>
      <table className='min-w-full bg-white border rounded-lg'>
        <thead>
          <tr>
            <th className='py-3 px-4 border-b text-left'>Company</th>
            <th className='py-3 px-4 border-b text-left'>Job Title</th>
            <th className='py-3 px-4 border-b text-left max-sm:hidden'>Location</th>
            <th className='py-3 px-4 border-b text-left max-sm:hidden'>Date</th>
            <th className='py-3 px-4 border-b text-left'>Status</th>
          </tr>
        </thead>
        <tbody>
            {
              userApplications?.map((job,index)=>true?
              <tr key={index}>
                <td className='py-3 px-4 flex items-center gap-2 border-b'>
                  <img src={job?.companyId?.image} alt="company logo" className='h-8 w-8'/>
                  {job.company}
                </td>
                <td className='py-2 px-4 border-b'>{job?.jobId?.category}</td>
                <td className='py-2 px-4 border-b max-sm:hidden'>{job?.jobId?.location}</td>
                <td className='py-2 px-4 border-b max-sm:hidden'>{moment(job.date).format("ll")}</td>
                <td className='py-2 px-4 border-b'>
                  <span className={`${job.status==="Accepted"?'bg-green-100':job.status==="Rejected"?'bg-red-100':'bg-blue-100'} px-4 py-1 rounded-lg text-${job.status==="Accepted"?'green-600':job.status==="Rejected"?'red-600':'yellow-600'} px-4 py-1 rounded-lg`}>{job.status}</span>
                </td>
              </tr>
              :null)
            }
        </tbody>
      </table>
    </div>
    </>
  )
}

export default Applications