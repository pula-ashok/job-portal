import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext(null);

const AppContextProvider = (props) => {
  const [searchedFilter, setSearchedFilter] = useState({title:'',location:''})
  const [isSearched, setIsSearched] = useState(false)
  const [jobs, setJobs] = useState([])
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)
  const [companyToken, setCompanyToken] = useState(null)
  const [companyData, setCompanyData] = useState(null)
  const [userData, setUserData] = useState(null)
  const [userApplications, setUserApplications] = useState([])
  const {user} = useUser()
  const {getToken} = useAuth()
  const backendUrl = import.meta.env.VITE_BACKEND_URL
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
  //function to get user data
  const fetchUserData=async()=>{
    try {
      const token = await getToken();
      const {data} =await axios.get(backendUrl+"/users/user",{headers:{Authorization:`Bearer ${token}`}})
      if(data.success){
        setUserData(data.user)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    if(user){
      fetchUserData()
    }
  },[user])
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
    setCompanyData,
    userData,setUserData,userApplications,setUserApplications
  };
  return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
  );
};
export default AppContextProvider;
