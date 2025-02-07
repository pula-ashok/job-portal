import React, { useContext, useEffect, useRef, useState } from 'react'
import { JobCategories, JobLocations } from '../assets/assets'
import Quill from 'quill'
import { AppContext } from './../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddJob = () => {
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState("Bangalore")
  const [category, setCategory] = useState("Programming")
  const [level, setLevel] = useState("Beginner level")
  const [salary, setSalary] = useState(0)
  const editorRef=useRef(null)
  const quillRef=useRef(null)
  useEffect(()=>{
    // initiate quill only once
    if(!quillRef.current && editorRef.current){
      quillRef.current =  new Quill(editorRef.current, {
        theme: 'snow',
      })
    }
  },[])
  const {companyToken,backendUrl} = useContext(AppContext)
  const onSubmitHandler=async(e)=>{
    e.preventDefault();
    try {
      const description = quillRef.current.root.innerHTML;
      const {data} = await axios.post(backendUrl +"/company/post-job",{title,description,location,category,level,salary},{headers:{token:companyToken}});
      if(data.success){
        toast.success("Job added successfully");
        setTitle('');
        quillRef.current.root.innerHTML = '';
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col gap-3 items-start w-full container p-4 outline-none'>
        <div className='w-full'>
          <p className='mb-2'>Job Title</p>
          <input type="text" placeholder='Job Title' required value={title} onChange={e=>setTitle(e.target.value)} className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded'/>
        </div>
        <div className='w-full max-w-lg '>
          <p className='my-2'>Description</p>
          <div ref={editorRef}></div>
        </div>
        <div className='flex flex-col sm:flex-row gap-2 sm:gap-8 w-full'>
          <div>
            <p className='mb-2'>Job Category</p>
            <select className='w-full px-3 py-2 border-2 border-gray-300 rounded'  name="" id="" value={category} onChange={e=>setCategory(e.target.value)}>
              {JobCategories.map((category,index)=><option key={index} value={category}>{category}</option>)}
            </select>
          </div>
          <div>
            <p className='mb-2'>Job Location</p>
            <select  className='w-full px-3 py-2 border-2 border-gray-300 rounded' name="" id="" value={location} onChange={e=>setLocation(e.target.value)}>
              {JobLocations.map((location,index)=><option key={index} value={location}>{location}</option>)}
            </select>
          </div>
          <div>
            <p className='mb-2'>Job Level</p>
            <select className='w-full px-3 py-2 border-2 border-gray-300 rounded'  name="" id="" value={level} onChange={e=>setLevel(e.target.value)}>
              <option value="Beginner level">Beginner level</option>
              <option value="Intermediate level">Intermediate level</option>
              <option value="Senior level">Senior level</option>
            </select>
          </div>
        </div>
        <div>
          <p className='mb-2'>Job Salary</p>
          <input type="number" placeholder='2500' min={0} value={salary} onChange={e=>setSalary(e.target.value)} className='w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]'/>
        </div>
      <button className='w-28 py-3 mt-4 bg-black text-white rounded' type='submit'>ADD</button>
    </form>
  )
}

export default AddJob