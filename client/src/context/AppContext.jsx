import { createContext, useEffect, useState } from "react";
import {jobsData } from './../assets/assets';

export const AppContext = createContext(null);

const AppContextProvider = (props) => {
  const [searchedFilter, setSearchedFilter] = useState({title:'',location:''})
  const [isSearched, setIsSearched] = useState(false)
  const [jobs, setJobs] = useState([])
  //function to fetch jobs
  const fetchJobs=async()=>{
    setJobs(jobsData)
  }
  useEffect(()=>{fetchJobs()},[])
  const value = {searchedFilter,setSearchedFilter,isSearched,setIsSearched,jobs,setJobs};
  return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
  );
};
export default AppContextProvider;
