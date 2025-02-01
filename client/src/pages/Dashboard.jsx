import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from './../assets/assets';
import Applications from './Applications';

const Dashboard = () => {
  const navigate=useNavigate()
  return (
    <div className='min-h-screen'>
      {/* navbar for recruiter panel */}
      <div className='shadow py-4'>
        <div className='flex justify-between items-center px-5'>
          <img src={assets.logo} alt="logo" className='max-sm:w-32 cursor-pointer' onClick={()=>navigate("/")}/>
          <div className='flex items-center gap-3'>
            <p className='max-sm:hidden'>Welcome , Ashok</p>
            <div className='relative group'>
              <img src={assets.company_icon} alt="company" className='w-8 border rounded-full cursor-pointer'/>
              <div className='hidden group-hover:block absolute top-0 right-0 z-10 text-black rounded pt-12'>
                <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                  <li className='py-1 px-2 cursor-pointer pr-10'>Logout</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex items-start'>
        {/* left sidebar */}
        <div className='inline-block min-h-screen border-r-2'>
          <ul className='flex flex-col items-start pt-5 text-gray-800'>
            <NavLink to="/dashboard/add-job" className={({isActive})=>`flex items-center  p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`}>
              <img src={assets.add_icon} alt="add" className='min-w-4'/>
              <p className='max-sm:hidden'>Add Job</p>
            </NavLink>
            <NavLink to="/dashboard/manage-jobs" className={({isActive})=>`flex items-center  p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`}>
              <img src={assets.home_icon} alt="manage" className='min-w-4'/>
              <p className='max-sm:hidden'>Manage Jobs</p>
            </NavLink>
            <NavLink to="/dashboard/view-applications" className={({isActive})=>`flex items-center  p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`}>
              <img src={assets.person_tick_icon} alt="tick" className='min-w-4'/>
              <p className='max-sm:hidden'>View Applications</p>
            </NavLink>
          </ul>
        </div>
        {/* add job manage jobs view applications components  */}
        <div>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard