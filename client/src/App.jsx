import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Applications from './pages/Applications'
import ApplyJob from './pages/ApplyJob'
import RecruiterLogin from './components/RecruiterLogin'
import { AppContext } from './context/AppContext'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import ViewApplications from './pages/ViewApplications'
import ManageJobs from './pages/ManageJobs'
import "quill/dist/quill.snow.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const {showRecruiterLogin , companyToken}=useContext(AppContext)
  return (
    <div>
     {showRecruiterLogin && <RecruiterLogin/>}
     <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/applications' element={<Applications/>} />
        <Route path='/apply-job/:id' element={<ApplyJob/>} />
        <Route path="/dashboard" element={<Dashboard/>}>
        {
          companyToken ? <>
            <Route path='add-job' element={<AddJob/>}/>
            <Route path='view-applications' element={<ViewApplications/>}/>
            <Route path='manage-jobs' element={<ManageJobs/>} />
          </>:null
        }
        </Route>
      </Routes>
    </div>
  )
}

export default App