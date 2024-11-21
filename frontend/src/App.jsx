import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import DashBoardPage from './pages/DashBoardPage'
import SignUpPage from './pages/SignUpPage'
import VerifyEmail from './pages/VerifyEmail'
import LoginPage from './pages/LoginPage'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
import { useAuthStore } from './store/authStore'
import LoaderSpinner from './components/LoaderSpinner'

const ProtectRoute = ({children}) =>{
  const {isAuthenticated, user} = useAuthStore()
  if(!isAuthenticated){
    return <Navigate to={'/login'} replace />
  }
  if(!user.isVerified){
    return <Navigate to={'/verify-email'} replace />
  }

  return children

}
const RedirectAuthenticatedUser = ({children}) =>{
  const {isAuthenticated, user}  = useAuthStore();
  if(isAuthenticated && user.isVerified){
    return <Navigate to={'/'} replace />
  }
  return children;
}


function App() {

  const {checkAuth, isAuthenticated, isCheckingAuth, user} = useAuthStore();
  useEffect(()=>{
    checkAuth();
  },[checkAuth])
  if(isCheckingAuth) return <LoaderSpinner />
  

  return (
    <div className=' h-screen flex justify-center items-center bg-[#F6D6D6]'>
      
      <Routes>
        <Route path='/' element={<ProtectRoute><DashBoardPage /></ProtectRoute>} />
        <Route path='/signup' element={<RedirectAuthenticatedUser><SignUpPage /></RedirectAuthenticatedUser>} />
        <Route path='/verify-email' element={<RedirectAuthenticatedUser><VerifyEmail /></RedirectAuthenticatedUser>} />
        <Route path='/login' element={<RedirectAuthenticatedUser><LoginPage /></RedirectAuthenticatedUser>} />
        <Route path='/forget-password' element= {<RedirectAuthenticatedUser><ForgetPassword /></RedirectAuthenticatedUser>} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        <Route path='*' element={<Navigate to='/' replace />} />
 
      </Routes>
    </div>
  )
}

export default App
