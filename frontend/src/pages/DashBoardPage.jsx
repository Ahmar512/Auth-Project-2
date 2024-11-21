import React from 'react'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom';

const DashBoardPage = () => {
  const {logout, isLoading, error, user} = useAuthStore();
  
  const navigate = useNavigate();
  const handleClick = async () =>{
      try {
        await logout();
        navigate("/signup");
      } catch (error) {
        console.log("error in logout",error);
        console.log(error);
      }
  }
  return (
    <div className='bg-secondry h-fit rounded-xl overflow-hidden m-2 ' >
      <div className='py-5 px-3 bg-backg'>
        <h1 className='text-center text-primary text-4xl font-bold'>Dashboard</h1>
      </div>
      <div className='m-10 p-5 bg-backg rounded-lg text-primary text-lg'>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {/* <p>Created At: {user.createdAt}</p> */}
          
      </div>
      <button className='py-2 w-full bg-backg text-primary font-bold ' onClick={handleClick}>Logout</button>
      

    </div>
  )
}

export default DashBoardPage