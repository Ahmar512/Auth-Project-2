import React, { useState } from 'react'
import { Loader, Lock, Mail, User } from 'lucide-react'
import Input from '../components/Input'
import { Link, useNavigate } from 'react-router-dom'
import {useAuthStore} from '../store/authStore'
 


const SignUpPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const {signup, error, isLoading} = useAuthStore();

    

    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log({name, email, password});
        try {
            await signup(email, password, name);
            navigate("/verify-email");
        } catch (err) {
            console.log("error in signup", err);
            console.log(error);
            

        }

    }
  return (
    <div className='h-fit max-w-md bg-secondry rounded-xl overflow-hidden shadow-2xl pb-5'>
        <div className='h-fit bg-backg mb-5'>
            <h1 className='text-primary font-bold text-4xl text-center py-5'>Sign Up</h1>
        </div>
        <div className='px-10'>
            <form onSubmit={handleSubmit}>
                <Input
                    type='text'
                    placeholder="Full Name"
                    icon = {User}
                    value = {name}
                    onChange={(e)=> setName(e.target.value)}
                />
                <Input
                    type='email'
                    placeholder="Email"
                    icon = {Mail}
                    value = {email}
                    onChange={(e)=> setEmail(e.target.value)}
                />
                <Input
                    type='password'
                    placeholder="Password"
                    icon = {Lock}
                    value = {password}
                    onChange={(e)=> setPassword(e.target.value)}
                />
                {error && <p className='text-red-600'>{error}</p>}
                <button type='submit' className='w-full  py-2 bg-backg text-primary font-bold rounded-lg' >{isLoading?<Loader className='animate-spin mx-auto' size={24} />:'Sign Up'}</button>
            </form>
        </div>
        <p className='text-center mt-4 text-primary'>Already have account? <Link to={'/login'} className='hover:underline text-backg'>Login</Link> </p>
    </div>
  )
}

export default SignUpPage