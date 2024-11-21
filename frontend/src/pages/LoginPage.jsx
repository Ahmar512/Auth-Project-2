import React, { useState } from 'react'
import Input from '../components/Input';
import {Lock, Mail} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useNavigate, Link } from 'react-router-dom';
import { Loader } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login , error, isLoading} = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (error) {
            console.log("error in loging", error);
            console.log(error);
            
        }
    }

  return (
    <div className='bg-secondry pb-5 rounded-xl overflow-hidden shadow-xl'>
        <div className='py-5 mb-5 bg-backg'>
            <h1 className='font-bold text-center text-4xl text-primary'>Login</h1>
        </div>
        <div className='px-10'>
            <form onSubmit={handleSubmit}>
                <Input
                    type="email"
                    icon={Mail}
                    placeholder="Email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    icon={Lock}
                    placeholder="Password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                />
                <Link to={'/forget-password'} className='hover:underline text-primary' >Forget Password?</Link>
                {error && <p className='text-red-600'>{error}</p>}
                <button className='py-2 rounded-lg w-full bg-backg text-primary mt-3 font-bold' type='submit'>{isLoading?<Loader className='animate-spin mx-auto' size={24} />:'Login'}</button>
                <p className='text-center mt-5 text-primary'>Create new account? <Link to={'/signup'} className='hover:underline text-backg '>SignUp</Link> </p>
            </form>
        </div>
        
        
    </div>
  )
}

export default LoginPage