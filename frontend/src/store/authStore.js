import {create} from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.MODE === 'development' ? "http://localhost:5000/api/auth" : '/api/auth';
axios.defaults.withCredentials = true;

export const useAuthStore = create((set)=>({
    user: null,
    isLoading:false,
    isAuthenticated: false,
    error: null,
    isCheckingAuth: true,
    message: null,
    signup: async (email, password, name) =>{
        set({isLoading:true, error: null});
        console.log({email, password, name})
        try {
            const response = await axios.post(`${API_URL}/signup`,({email, password, name}));
            set({user:response.data.user, isAuthenticated: true, isLoading: false});

        } catch (error) {
            console.log(error);
            set({error: error.response.data.message || "Error signing up", isLoading:false});
            throw error;
        }
    },
    verifyEmail: async (code) =>{
        set({isLoading:true, error:null});
        try {
            const response = await axios.post(`${API_URL}/verify-email`, ({code}));
            set({isLoading:false, user:response.data.user, isAuthenticated:true});
            return response.data;
        } catch (error) {
            set({error:error.response.data.message || "Error in verification", isLoading: false });
            throw error;
        }
    },
    login: async (email, password) =>{
        set({isLoading:true, error:null});
        try {
            const response = await axios.post(`${API_URL}/login`,({email, password}));
            set({isLoading:false, user:response.data.user, isAuthenticated:true});
        } catch (error) {
            set({error:error.response.data.message || "Error in login", isLoading:false});
            throw error;
        }
    },
    logout: async() =>{
        set({isLoading:true, error:null});
        try {
            const response = await axios.post(`${API_URL}/logout`);
            set({isLoading:false, isAuthenticated:false});
        } catch (error) {
            set({error:error.response.data.message ||"Invalid credentials", isLoading:false});
            throw error;
            
        }
    },
    forgetPassword: async(email) =>{
        set({isLoading:true, error:false});
        try {
            const response  = await axios.post(`${API_URL}/forgot-password`,({email}));
            set({isLoading:false});
        } catch (error) {
            set({error:error.message || "error in send reset password mail", isLoading:false});
            console.log(error);
        }
    },
    resetPassword: async(token, password) =>{
        set({isLoading:true, error:null});
        try {
            const response = await axios.post(`${API_URL}/reset-password/${token}`,({password}));
            set({isLoading:false});
        } catch (error) {
            set({error:error.message || "Error in resetting password", isLoading:false});
            console.log(error.message);
            
        }
    },
    checkAuth: async() =>{
        set({isAuthenticated:false, isCheckingAuth:true, user:null, error:null});
        try {
            const response = await axios.get(`${API_URL}/check-auth`);
            set({isAuthenticated:true, isCheckingAuth:false, user:response.data.user});
        } catch (error) {
            set({error:null, isCheckingAuth:false});
            console.log(error.message);
            
        }
    }
}))