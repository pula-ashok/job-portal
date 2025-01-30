import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocations } from '../assets/assets';
import JobCard from './JobCard';
import { useState } from 'react';

const JobListing = () => {
    const {setSearchedFilter,setIsSearched,isSearched,searchedFilter,jobs}=useContext(AppContext)
    const [showFilter, setShowFilter] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState(jobs);
    const handleCategoryChange=(category)=>{
      setSelectedCategories(prev=>prev.includes(category)?prev.filter(c=>c!==category):[...prev,category])
    }
    const hanldeLocationChange=(location)=>{
      setSelectedLocations(prev=>prev.includes(location)?prev.filter(l=>l!==location):[...prev,location])
    }
    useEffect(()=>{
      const matchesCategory=job=> selectedCategories.length===0 || selectedCategories.includes(job.category)
      const matchesLocation=job=> selectedLocations.length===0 || selectedLocations.includes(job.location)
      const matchesTitle=job=>searchedFilter.title==="" || job.title.toLowerCase().includes(searchedFilter.title.toLowerCase())
      const matchesSearchedLocation=job=>searchedFilter.location==="" || job.location.toLowerCase().includes(searchedFilter.location.toLowerCase())
      const newFilteredJobs=jobs.slice().reverse().filter(job=>matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesSearchedLocation(job))
      setFilteredJobs(newFilteredJobs)
      setCurrentPage(1)
    },[selectedCategories,selectedLocations,jobs,searchedFilter])
  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">
      {/* sidebar */}
      <div className='w-full lg:w-1/4  bg-white px-4'>
        {/* search filter from hero component  */}
        {isSearched &&
          (searchedFilter.title !== "" || searchedFilter.location !== "") && (
            <>
              <h3 className='font-medium text-lg mb-4'>Current Search</h3>
              <div className='mb-4 text-gray-600'>
                {searchedFilter.title && (
                  <span className='inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>
                    {searchedFilter.title}{" "}
                    <img className="cursor-pointer" src={assets.cross_icon} onClick={e=>setSearchedFilter(prev=>({...prev,title:""}))}/>
                  </span>
                )}
                {searchedFilter.location && (
                  <span className='ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded'>
                    {searchedFilter.location}{" "}
                    <img className="cursor-pointer" src={assets.cross_icon} onClick={e=>setSearchedFilter(prev=>({...prev,location:""}))}/>
                  </span>
                )}
              </div>
            </>
          )}
        <button onClick={e=>setShowFilter(prev=>!prev)} className='px-6 py-1.5 rounded border border-gray-400 lg:hidden'>{showFilter? "Close":"Filters"}</button>          
          {/* category filter  */}
          <div className={showFilter?"":"max-lg:hidden"}>
            <h4 className='font-medium text-lg py-4'>Search by Categories</h4>
            <ul className='space-y-4 text-gray-600'>
              {JobCategories.map((category,index)=><li key={index} className='flex items-center gap-3'>
                <input type="checkbox" className='scale-125' onChange={()=>handleCategoryChange(category)} checked={selectedCategories.includes(category)}/>
                {category}
              </li>)}
            </ul>
          </div>
          {/* location filter  */}
          <div className={showFilter?"":"max-lg:hidden"}>
            <h4 className='font-medium text-lg py-4 pt-14'>Search by Location</h4>
            <ul className='space-y-4 text-gray-600'>
              {JobLocations.map((location,index)=><li key={index} className='flex items-center gap-3'>
                <input type="checkbox" className='scale-125' onChange={()=>hanldeLocationChange(location)} checked={selectedLocations.includes(location)}/>
                {location}
              </li>)}
            </ul>
          </div>
      </div>
      {/* job listings  */}
      <section className='w-full lg:w-3/4  text-gray-800 max-lg:px-4'>
        <h3 className='font-medium text-3xl py-2' id='job-list'>Latest jobs</h3>
        <p className='mb-8'>Get your desired job from top companies</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
          {filteredJobs?.slice((currentPage-1)*6,currentPage*6)?.map((job,index)=><JobCard key={index} job={job}/>)}
        </div>
        {/* pagination  */}
        {
          filteredJobs?.length>0 && <div className='flex justify-center items-center space-x-2 mt-10'>
            <a href='#job-list'>
              <img src={assets.left_arrow_icon} alt='arrow-left' onClick={()=>setCurrentPage(Math.max(currentPage-1,1))} />
            </a>
            {
              Array.from({length:Math.ceil(filteredJobs?.length/6)}).map((_,index)=>
              <a href='#job-list' key={index} >
                <button onClick={e=>setCurrentPage(index+1)} className={`w-10 h-10 borer-gray-300 rounded border flex justify-center items-center ${currentPage===index+1 ? "bg-blue-100 text-blue-500":"text-gray-500"}`}>{index+1}</button>
              </a>)
            }
            <a href='#job-list'>
              <img src={assets.right_arrow_icon} alt='arrow-right' onClick={()=>setCurrentPage(Math.min(currentPage+1,Math.ceil(filteredJobs?.length/6)))}/>
            </a>
          </div>
        }
      </section>
    </div>
  );
}

export default JobListing