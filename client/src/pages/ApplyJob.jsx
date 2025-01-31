import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from './../context/AppContext';
import Loading from '../components/Loading';

const ApplyJob = () => {
  const {id}=useParams()
  const {jobs}=useContext(AppContext)
  const [jobData, setJobData] = useState(null)
  const fetchJob=async()=>{
    const data=jobs.filter(job=>job._id===id)
    if(data.length !==0){
      setJobData(data[0])
    }
  }
  useEffect(()=>{
    if(jobs.length>0){
      fetchJob()
    }
  },[id,jobs])
  return false ?
    <div>ApplyJob</div>
    : <Loading />
}

export default ApplyJob