import React, { useState } from 'react'
import Navbar from './../components/Navbar';
import { assets } from '../assets/assets';

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [resume, setResume] = useState(null)
  return (
    <>
    <Navbar/>
    <div className='container px-4 2xl:px-20 mx-auto min-h-[65vh] my-10'>
      <h2 className='text-2xl font-semibold'>Your Resume</h2>
      <div className='flex gap-2 mb-6 mt-3'>
        {isEdit ?<>
        <label htmlFor="resumeUpload" className='flex items-center cursor-pointer'>
          <p className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2'>Select Resume</p>
          <input type="file" id='resumeUpload' accept='application/pdf' onChange={e=>setResume(e.target.files[0])} hidden/>
          <img src={assets.profile_upload_icon} alt="upload" />
        </label>
        <button className='bg-green-100 border border-green-400 rounded-lg px-4 py-2' onClick={e=>setIsEdit(false)}>Save</button>
        </>:<div>
          <div className='flex gap-2'>
            <a href='#' className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg'>Resume</a>
            <button className='text-gray-500 border border-gray-300 px-4 py-2 rounded-lg' onClick={e=>setIsEdit(true)}>Edit</button>
          </div>
          </div>}
      </div>
    </div>
    </>
  )
}

export default Applications