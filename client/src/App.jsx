import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Applications from './pages/Applications'
import ApplyJob from './pages/ApplyJob'
import RecruterLogin from './components/RecruterLogin'
import { AppContext } from './context/AppContext'

const App = () => {
  const {showRecruiterLogin}=useContext(AppContext)
  return (
    <div>
     {showRecruiterLogin && <RecruterLogin/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/applications' element={<Applications/>} />
        <Route path='/apply-job/:id' element={<ApplyJob/>} />
      </Routes>
    </div>
  )
}

export default App