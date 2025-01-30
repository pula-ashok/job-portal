import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex justify-between items-center px-4 2xl:px-20 mx-auto gap-4 py-3 mt-20'>
        <img src={assets.logo} width={160} alt="logo" />
        <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>All right reserved. Copyright @job-portal</p>
        <div className='flex gap-2.5'>
            <img src={assets.facebook_icon} alt="facebook" width={38}/>
            <img src={assets.twitter_icon} alt="twitter" width={38}/>
            <img src={assets.instagram_icon} alt="instagram" width={38}/>
        </div>
    </div>
  )
}

export default Footer