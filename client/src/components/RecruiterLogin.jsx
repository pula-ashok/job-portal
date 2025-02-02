import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const RecruiterLogin = () => {
    const [state, setState] = useState("Login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(false);
    const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false)
    const {setShowRecruiterLogin} = useContext(AppContext)
    const onSubmitHandler=async(e)=>{
        e.preventDefault();
        if(state==="Sign Up" && !isTextDataSubmitted){
            setIsTextDataSubmitted(true)
        }
    }
    useEffect(()=>{
      document.body.style.overflow="hidden";
      return ()=>{
      document.body.style.overflow="unset";
      }
    },[])
  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 bg-black/30 back-blur-sm flex justify-center items-center'>
        <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500'>
            <h1 className='text-center text-2xl text-neutral-700 font-medium'>Recruiter {state}</h1>
            <p className='text-sm'>Welcome back! Please sign in to continue</p>
            {state==="Sign Up" && isTextDataSubmitted ? <> 
              <div className='flex items-center gap-4 my-10'>
                <label htmlFor="image">
                  <img src={image?URL.createObjectURL(image):assets.upload_area} alt='upload' className='w-16 rounded-full'/>
                  <input type="file" id='image' onChange={e=>setImage(e.target.files[0])}  hidden/>
                </label>
                <p>Upload Company <br/> Logo</p>
              </div>
            </>:
            <>
            {state !== "Login" &&
            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
               <img src={assets.person_icon} alt='person'/>
               <input type="text" placeholder='Company Name' onChange={e=>setName(e.target.value)} required className='outline-none text-sm'/> 
            </div>}
            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                <img src={assets.email_icon} alt='email'/>
                <input type="email" placeholder="Email" onChange={e=>setEmail(e.target.value)}required className='outline-none text-sm'/>
            </div>
            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                <img src={assets.lock_icon} alt='lock' />
                <input type="password" onChange={e=>setPassword(e.target.value)} placeholder="Password" required className='outline-none text-sm'/>
            </div>
            </>}
          {state==="Login" &&  <p className='text-sm text-blue-600 mt-4 cursor-pointer'>Forgot password?</p>}
            <button type="submit" className='w-full bg-blue-600 text-white px-4 py-2 rounded-full mt-4'>{state==='Login'?'Login':isTextDataSubmitted?'Sign Up':"Next"}</button>
           {state==="Login"? <p  className='mt-5 text-center'>Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={()=>setState('Sign Up')} >Sign up</span></p>
           : <p className='mt-5 text-center'>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={()=>setState('Login')}>Login</span></p>}
          <img onClick={()=>setShowRecruiterLogin(false)}  src={assets.cross_icon} alt="cross" className='top-5 right-5 absolute cursor-pointer' />
        </form>
    </div>
  )
}

export default RecruiterLogin