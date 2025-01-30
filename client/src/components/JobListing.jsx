import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocations } from '../assets/assets';
import JobCard from './JobCard';
import { useState } from 'react';

const JobListing = () => {
    const {setSearchedFilter,setIsSearched,isSearched,searchedFilter,jobs}=useContext(AppContext)
    const [showFilter, setShowFilter] = useState(true)
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
                <input type="checkbox" className='scale-125'/>
                {category}
              </li>)}
            </ul>
          </div>
          {/* location filter  */}
          <div className={showFilter?"":"max-lg:hidden"}>
            <h4 className='font-medium text-lg py-4 pt-14'>Search by Location</h4>
            <ul className='space-y-4 text-gray-600'>
              {JobLocations.map((location,index)=><li key={index} className='flex items-center gap-3'>
                <input type="checkbox" className='scale-125'/>
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
          {jobs.map((job,index)=><JobCard key={index} job={job}/>)}
        </div>
      </section>
    </div>
  );
}

export default JobListing