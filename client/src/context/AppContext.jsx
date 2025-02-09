import { createContext, useEffect, useState } from "react";
import {jobsData } from './../assets/assets';
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext(null);

const AppContextProvider = (props) => {
  const [searchedFilter, setSearchedFilter] = useState({title:'',location:''})
  const [isSearched, setIsSearched] = useState(false)
  const [jobs, setJobs] = useState([])
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)
  const [companyToken, setCompanyToken] = useState(null)
  const [companyData, setCompanyData] = useState(null)
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  //function to fetch jobs
  const fetchJobs=async()=>{
    try {
      const {data} =await axios.get(backendUrl+"/jobs");
      if(data?.success){
        setJobs(data?.jobs)
        console.log(jobs)
      }
      else{
        toast.error(data.message)
      }      
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(()=>{fetchJobs()},[])
  useEffect(()=>{
    const storedToken =localStorage.getItem("companyToken");
    if(storedToken){setCompanyToken(storedToken)}
  },[])
  //function to get company data
  const fetchCompanyData=async()=>{
    try {
      const {data} =await axios.get(backendUrl+"/company/data",{
        headers:{token:companyToken}
      })
      if(data.success){
        setCompanyData(data.company)
        // console.log(data)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    if(companyToken){fetchCompanyData()}
  },[companyToken])
  const value = {
    searchedFilter,
    setSearchedFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    showRecruiterLogin,
    setShowRecruiterLogin,
    backendUrl,
    companyToken,
    setCompanyToken,
    companyData,
    setCompanyData
  };
  return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
  );
};
export default AppContextProvider;
