import React, { useState } from 'react'
import { Mail } from 'lucide-react'
import Input from '../components/Input'
import { useAuthStore } from '../store/authStore'
import { Link } from 'react-router-dom'
import { Loader } from 'lucide-react';

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setSubmitted] = useState(false);
    const {isLoading, error, forgetPassword} = useAuthStore();


    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await forgetPassword(email);
            setSubmitted(true);
        } catch (error) {
            console.log(error.message);
        }


    }

  return (
    <div className='bg-secondry rounded-xl overflow-hidden pb-5 '>
        <div className='mb-5 bg-backg py-5 px-5'>
            <h1 className='text-primary font-bold text-center text-4xl'>Forget Password</h1>
        </div>
        <div className='px-10'>
            {!isSubmitted?<form onSubmit={handleSubmit}>
                <Input
                    type='email'
                    placeholder="Enter your email"
                    icon={Mail}
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                />

                <button type='submit' className='w-full bg-backg rounded-lg font-bold text-primary py-2'>{isLoading?<Loader className='animate-spin mx-auto' size={24} />:'Send Mail'}</button>

            </form>
        :<div>
            {error?<p className='text-red-500'>{error}</p>:<p className='text-primary'>Email sended on you gamil check your email</p>}
            <div className='py-3 bg-backg w-full text-center mt-3 rounded-lg font-bold text-primary'>
                <Link to={'/login'} className='' >Return to login page</Link>
            </div>
        </div>}
        </div>
    </div>
  )
}

export default ForgetPassword