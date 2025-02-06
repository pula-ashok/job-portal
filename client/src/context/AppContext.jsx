import { createContext, useEffect, useState } from "react";
import {jobsData } from './../assets/assets';

export const AppContext = createContext(null);

const AppContextProvider = (props) => {
  const [searchedFilter, setSearchedFilter] = useState({title:'',location:''})
  const [isSearched, setIsSearched] = useState(false)
  const [jobs, setJobs] = useState([])
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)
  const [companyToken, setCompanyToken] = useState(null)
  const [getCompanyData, setCompanyData] = useState(null)
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  //function to fetch jobs
  const fetchJobs=async()=>{
    setJobs(jobsData)
  }
  useEffect(()=>{fetchJobs()},[])
  useEffect(()=>{
    const storedToken =localStorage.getItem("companyToken");
    if(storedToken){setCompanyToken(storedToken)}
  },[])
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
    getCompanyData,
    setCompanyData
  };
  return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
  );
};
export default AppContextProvider;
