import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { saveAuth } from '../utils/auth';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8082';

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [redirect, setRedirect] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });
            const data = await response.json();
            if (response.ok) {
                saveAuth(data);
                toast.success('Login successful!');
                setRedirect(true);
            } else {
                toast.error(data.message || 'Invalid credentials');
            }
        } catch (error) {
            toast.error('Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (redirect) return <Navigate to="/HomeAfterLogin" />;

    return (
        <div className="min-h-screen bg-gray-50 transition-colors duration-300 py-12 flex flex-col justify-center">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-ocean to-purple-600 shadow-glow transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative p-10 bg-white shadow-2xl sm:rounded-3xl sm:p-20 border border-gray-100">
                    <div className="max-w-md mx-auto">
                        <div className="text-center mb-10">
                            <h2 className="text-4xl font-extrabold text-gray-800 cursor-pointer hover:text-brand-ocean transition-colors" onClick={()=>navigate('/')}>
                                Work Folio
                            </h2>
                            <p className="mt-2 text-gray-500 font-medium">Please sign in to your account</p>
                        </div>
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-1">Email</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    required 
                                    onChange={handleChange}
                                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-ocean outline-none transition-all"
                                    placeholder="Enter your email" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-1">Password</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    required 
                                    onChange={handleChange}
                                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-ocean outline-none transition-all"
                                    placeholder="••••••••" 
                                />
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">Remember me</span>
                                <button type="button" className="text-brand-ocean font-bold hover:underline">Forgot password?</button>
                            </div>
                            <button 
                                disabled={isLoading} 
                                type="submit" 
                                className="w-full py-4 px-4 bg-brand-ocean hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-lg transition-transform transform hover:-translate-y-1"
                            >
                                {isLoading ? 'Authenticating...' : 'Sign In'}
                            </button>
                        </form>
                        
                        <div className="mt-8 text-center text-gray-500 font-medium">
                            New user? <button onClick={() => navigate('/Registration')} className="text-brand-ocean font-bold hover:underline">Register Here</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;