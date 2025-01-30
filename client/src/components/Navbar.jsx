import React from 'react'
import { assets } from './../assets/assets';

const Navbar = () => {
  return (
    <div className='shadow py-4'>
        <div className='container flex justify-between items-center px-4 2xl:px-20 mx-auto'>
            <img src={assets.logo} alt='logo'/>
            <div className='flex gap-4 max-sm:text-xs'>
                <button className='text-gray-600'>Recruiter Login</button>
                <button className='bg-blue-600 text-white px-6 sm:px-8 py-2 rounded-full'>Login</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar