import React from 'react'

import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { Loader, CodeSquareIcon } from 'lucide-react';
import Input from '../components/Input';

const VerifyEmail = () => {
    const [code, setCode] = useState("");
    const {isLoading, error, verifyEmail} = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            await verifyEmail(code);
            navigate('/');

        } catch (error) {
            console.log("error in verification", error);
            console.log(error);
        }
    }
  return (
    <div className='bg-secondry rounded-xl overflow-hidden'>
        <div className='mb-5 py-5 bg-backg'>
            <h1 className='text-center font-bold text-4xl text-primary px-10'>Email Verification</h1>
        </div>
        <div className='px-10'>
            <form onSubmit={handleSubmit}> 
                <Input 
                    type='text' 
                    placeholder='Enter verification code' 
                    icon={CodeSquareIcon}
                    value={code} 
                    onChange={(e)=> setCode(e.target.value)}
                />
                {error && <p className='text-red-600'>{error}</p>}
                <button type='submit' className='w-full text-center bg-backg mb-5 py-2 rounded-xl font-bold text-primary'>{isLoading?<Loader className='animate-spin mx-auto' size={24} />:'Submit'}</button>
            </form>
        </div>
    </div>
  )
}

export default VerifyEmail