import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../components/Input';
import { Lock } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { Loader } from 'lucide-react';

const ResetPassword = () => {
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const {isLoading, error, resetPassword} = useAuthStore();
    const navigate = useNavigate();

    
    const {token} = useParams();
    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(password1 !== password2){
            alert("Passwords are not same Please check your password");
            return;
        }
        try {
            await resetPassword(token, password1);
            navigate('/login');
        } catch (error) {
            console.log(error);
        }


    }
    


  return (
    <div className='bg-secondry rounded-xl overflow-hidden shadow-xl pb-5'>
        <div className='py-5 mb-5 text-center px-5 bg-backg'>
            <h1 className='text-primary font-bold text-4xl'>Reset Password</h1>
        </div>
        <div className='px-10'>
            <form onSubmit={handleSubmit}>
                <Input
                    type='password'
                    placeholder='Enter new Password'
                    icon={Lock}
                    value={password1}
                    onChange={(e)=> setPassword1(e.target.value)}
                />
                <Input
                    type='password'
                    placeholder=' Confirm Password'
                    icon={Lock}
                    value={password2}
                    onChange={(e)=> setPassword2(e.target.value)}
                />
                {error && <p className='text-red-500'>{error}</p>}
                <button type='submit' className='w-full bg-backg font-bold text-primary rounded-lg py-3'>{isLoading?<Loader className='animate-spin mx-auto' size={24} />:'Reset Password'}</button>
            </form>
        </div>
    </div>
  )
}

export default ResetPassword