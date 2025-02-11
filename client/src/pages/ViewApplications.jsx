import React, { useContext, useEffect, useState } from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import Loading from '../components/Loading'

const ViewApplications = () => {
  const {backendUrl,companyToken} = useContext(AppContext)
  const [applicants, setApplicants] = useState([])
  const fetchCompanyApplicants =async()=>{
    try {
      const {data} = await axios.get(backendUrl+"/company/applicants",{headers:{token:companyToken}});
      if(data.success){
        setApplicants(data.jobApplications)
      }
    } catch (error) {
      toast.error(error.meesage)
    }
  }
  useEffect(()=>{
    if(companyToken){
      fetchCompanyApplicants()
    }
  },[companyToken])
  const changeApplicationStatus=async(id,status)=>{
    try {
      const {data} = await axios.post(backendUrl+"/company/change-status",{id,status},{headers:{token:companyToken}});
      if(data.success){
        toast.success(data.message)
        fetchCompanyApplicants()
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return applicants.length>0?
    <div className='container mx-auto p-4'>
      <div>
        <table className='w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm'>
          <thead>
            <tr className='border-b'>
              <th className='py-2 px-4 text-left'>#</th>
              <th className='py-2 px-4 text-left'>User Name</th>
              <th className='py-2 px-4 text-left max-sm:hidden'>Job Title</th>
              <th className='py-2 px-4 text-left max-sm:hidden'>Location</th>
              <th className='py-2 px-4 text-left'>Resume</th>
              <th className='py-2 px-4 text-left'>Action</th>
            </tr>
          </thead>
          <tbody>
            {applicants?.filter(app=>app.userId&&app.jobId)?.map((application,index)=>
            <tr key={index} className='text-gray-700 '>
              <td className='py-2 px-4 border-b text-center'>{index+1}</td>
              <td className='py-2 px-4 border-b text-center flex items-center'>
                <img src={application?.userId?.image} alt='user' className='w-10 h-10 rounded-full mr-3 max-sm:hidden'/>
                <p>{application?.userId?.name}</p>
              </td>
              <td className='py-2 px-4 border-b text-left max-sm:hidden'>{application?.jobId?.title}</td>
              <td className='py-2 px-4 border-b text-left max-sm:hidden'>{application?.jobId?.location}</td>
              <td className='py-2 px-4 border-b '>
                <a href={application?.userId?.resume} target='_blank' className='bg-blue-50 text-blue-400 px-3 rounded py-1 inline-flex gap-2 items-center'>
                 Resume <img src={assets.resume_download_icon}/>
                </a>
              </td>
              <td className='py-2 px-4 border-b relative'>
               {
                application?.status==='Pending'?
                <div className='relative inline-block text-left group'>
                  <button className='text-gray-500 action-button'>...</button>
                  <div className='hidden z-10 absolute right-0 md:left-0  w-32 bg-white border border-gray-200  group-hover:block'>
                    <button  className='block text-left px-4 py-2 text-blue-500 hover:bg-gray-100 w-full' onClick={()=>changeApplicationStatus(application?._id,"Accepted")}>Accept</button>
                    <button className='block text-left px-4 py-2 text-red-500 hover:bg-gray-100 w-full' onClick={()=>changeApplicationStatus(application?._id,"Rejected")}>Reject</button>
                  </div>
                </div>
                :<div>{application?.status}</div>
               }
              </td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    :<Loading/>
  
}

export default ViewApplications