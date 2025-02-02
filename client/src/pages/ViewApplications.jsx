import React from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'

const ViewApplications = () => {
  return (
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
            {viewApplicationsPageData.map((application,index)=>
            <tr key={index} className='text-gray-700 '>
              <td className='py-2 px-4 border-b text-center'>{index+1}</td>
              <td className='py-2 px-4 border-b text-center flex items-center'>
                <img src={application.imgSrc} alt='user' className='w-10 h-10 rounded-full mr-3 max-sm:hidden'/>
                <p>{application.name}</p>
              </td>
              <td className='py-2 px-4 border-b text-left max-sm:hidden'>{application.jobTitle}</td>
              <td className='py-2 px-4 border-b text-left max-sm:hidden'>{application.location}</td>
              <td className='py-2 px-4 border-b '>
                <a href='#' target='_blank' className='bg-blue-50 text-blue-400 px-3 rounded py-1 inline-flex gap-2 items-center'>
                 Resume <img src={assets.resume_download_icon}/>
                </a>
              </td>
              <td className='py-2 px-4 border-b relative'>
                <div className='relative inline-block text-left group'>
                  <button className='text-gray-500 action-button'>...</button>
                  <div className='hidden z-10 absolute right-0 md:left-0  w-32 bg-white border border-gray-200  group-hover:block'>
                    <button  className='block text-left px-4 py-2 text-blue-500 hover:bg-gray-100 w-full'>Accept</button>
                    <button className='block text-left px-4 py-2 text-red-500 hover:bg-gray-100 w-full'>Reject</button>
                  </div>
                </div>
              </td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewApplications