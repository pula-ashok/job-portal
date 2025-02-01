import React, { useState } from 'react'
import { assets } from '../assets/assets';

const RecruterLogin = () => {
    const [state, setState] = useState("Login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(false);
    const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false)
  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 bg-black/30 back-blur-sm flex justify-center items-center'>
        <form action="" className='relative bg-white p-10 rounded-xl text-slate-500'>
            <h1 className='text-center text-2xl text-neutral-700 font-medium'>Recruiter {state}</h1>
            <p className='text-sm'>Welcome back! Please sign in to continue</p>
            <>
            {state !== "Login" &&
            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
               <img src={assets.person_icon} alt='person'/>
               <input type="text" placeholder='Company Name' onChange={e=>setName(e.target.value)} /> 
            </div>}
            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                <img src={assets.email_icon} alt='email'/>
                <input type="email" placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
            </div>
            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                <img src={assets.lock_icon} alt='lock' />
                <input type="password" onChange={e=>setPassword(e.target.value)} placeholder="Password" />
            </div>
            </>
            <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot password?</p>
            <button className='w-full bg-blue-600 text-white px-4 py-2 rounded-full'>{state==='Login'?'Login':'Sign Up'}</button>
           {state==="Login"? <p  className='mt-5 text-center'>Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={()=>setState('Sign Up')} >Sign up</span></p>
           : <p className='mt-5 text-center'>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={()=>setState('Login')}>Login</span></p>}
        </form>
    </div>
  )
}

export default RecruterLogin