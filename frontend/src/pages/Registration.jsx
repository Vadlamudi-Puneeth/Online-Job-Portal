import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE_URL = 'http://localhost:8082';

const Registration = () => {
    const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Details
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [user, setUser] = useState({
        username: '',
        password: '',
        cpassword: '',
        phoneNumber: '',
        role: 'JOB_SEEKER'
    });
    const [redirect, setRedirect] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const validatePassword = (password) => {
        const capitalLetterRegex = /[A-Z]/;
        const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (password.length < 8 || password.length > 14) return 'Password must be 8-14 characters.';
        if (!capitalLetterRegex.test(password)) return 'Password must contain an uppercase letter.';
        if (!symbolRegex.test(password)) return 'Password must contain a symbol.';
        return '';
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/send-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (response.ok) {
                toast.success('OTP sent successfully!');
                setStep(2);
            } else if (response.status === 409) {
                toast.error(data.message || 'Email already registered.');
            } else {
                toast.error(data.message || 'Failed to send OTP.');
            }
        } catch (error) {
            toast.error('Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp }),
            });
            if (response.ok) {
                toast.success('OTP verified successfully!');
                setStep(3);
            } else {
                toast.error('Invalid or expired OTP.');
            }
        } catch (error) {
            toast.error('Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const pErr = validatePassword(user.password);
        if (pErr) return toast.error(pErr);
        if (user.password !== user.cpassword) return toast.error('Passwords must match.');

        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...user, email }),
            });
            const data = await response.json();
            if (response.ok) {
                toast.success('Registration successful!');
                setTimeout(() => setRedirect(true), 1500);
            } else {
                throw new Error(data.message || 'Registration failed');
            }
        } catch (error) {
            toast.error(error.message || 'Registration failed.');
        } finally {
            setIsLoading(false);
        }
    };

    if (redirect) return <Navigate to="/Login" />;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6 transition-colors duration-500">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700"
            >
                {/* Header / Brand */}
                <div className="p-8 bg-gradient-to-r from-brand-ocean to-purple-600 text-white text-center">
                    <h1 className="text-4xl font-black mb-2 tracking-tight">Work Folio</h1>
                    <p className="opacity-80 font-medium">Create your professional profile today</p>
                </div>

                {/* Step Indicator */}
                <div className="flex justify-between px-12 pt-8">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black transition-all ${
                                step >= s ? 'bg-brand-ocean text-white shadow-lg' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                            }`}>
                                {s}
                            </div>
                            <span className={`text-[10px] font-bold uppercase mt-2 tracking-widest ${
                                step >= s ? 'text-brand-ocean' : 'text-gray-400'
                            }`}>
                                {s === 1 ? 'Email' : s === 2 ? 'Verify' : 'Details'}
                            </span>
                        </div>
                    ))}
                    {/* Connectors */}
                    <div className="absolute left-[20%] top-[25%] right-[20%] h-1 bg-gray-100 dark:bg-gray-700 -z-10"></div>
                </div>

                <div className="p-10">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-black dark:text-white">Let's Get <span className="text-brand-ocean">Started</span></h3>
                                    <p className="text-gray-400 text-sm mt-1 font-medium">Enter your email to receive an OTP.</p>
                                </div>
                                <form onSubmit={handleSendOtp} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
                                        <input 
                                            type="email" 
                                            required 
                                            value={email} 
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="jane.doe@example.com"
                                            className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl dark:text-white focus:ring-2 focus:ring-brand-ocean outline-none transition-all font-bold"
                                        />
                                    </div>
                                    <button 
                                        disabled={isLoading}
                                        type="submit"
                                        className="w-full py-5 bg-brand-ocean text-white font-black rounded-2xl shadow-xl shadow-brand-ocean/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                                    >
                                        {isLoading ? "Sending OTP..." : "Send Verification Code"}
                                    </button>
                                </form>
                                <div className="text-center pt-4">
                                    <span className="text-gray-400 font-medium">Already have an account? </span>
                                    <Link to="/Login" className="text-brand-ocean font-black hover:underline">Login</Link>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-black dark:text-white">Verify Your <span className="text-brand-ocean">Email</span></h3>
                                    <p className="text-gray-400 text-sm mt-1 font-medium">Sent to: <span className="text-brand-ocean font-bold">{email}</span></p>
                                </div>
                                <form onSubmit={handleVerifyOtp} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">One-Time Password</label>
                                        <input 
                                            type="text" 
                                            required 
                                            value={otp} 
                                            onChange={(e) => setOtp(e.target.value)}
                                            placeholder="••••••"
                                            maxLength={6}
                                            className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl dark:text-white focus:ring-2 focus:ring-brand-ocean outline-none transition-all font-black text-center text-2xl tracking-[0.5em]"
                                        />
                                    </div>
                                    <button 
                                        disabled={isLoading}
                                        type="submit"
                                        className="w-full py-5 bg-brand-ocean text-white font-black rounded-2xl shadow-xl shadow-brand-ocean/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                                    >
                                        {isLoading ? "Verifying..." : "Verify & Continue"}
                                    </button>
                                    <button type="button" onClick={() => setStep(1)} className="w-full text-gray-400 font-bold text-sm hover:text-brand-ocean transition-colors">Change email address?</button>
                                </form>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-black dark:text-white">Finalize <span className="text-brand-ocean">Profile</span></h3>
                                    <p className="text-gray-400 text-sm mt-1 font-medium">Just a few more details to get you onboard.</p>
                                </div>
                                <form onSubmit={handleRegister} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-tighter pl-1">Full Name</label>
                                            <input type="text" required value={user.username} onChange={(e) => setUser({...user, username: e.target.value})} className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl dark:text-white font-bold focus:ring-2 focus:ring-brand-ocean outline-none" placeholder="Jane Doe" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-tighter pl-1">Phone Number</label>
                                            <input type="tel" required value={user.phoneNumber} onChange={(e) => setUser({...user, phoneNumber: e.target.value})} className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl dark:text-white font-bold focus:ring-2 focus:ring-brand-ocean outline-none" placeholder="+91 00000 00000" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Choose Account Type</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {[
                                                { id: 'JOB_SEEKER', label: 'Job Seeker', icon: '👤' },
                                                { id: 'RECRUITER', label: 'Recruiter', icon: '🏢' }
                                            ].map((r) => (
                                                <div 
                                                    key={r.id}
                                                    onClick={() => setUser({...user, role: r.id})}
                                                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center space-y-2 ${
                                                        user.role === r.id 
                                                        ? 'bg-brand-ocean/5 border-brand-ocean ring-1 ring-brand-ocean' 
                                                        : 'bg-transparent border-gray-100 dark:border-gray-700'
                                                    }`}
                                                >
                                                    <span className="text-2xl">{r.icon}</span>
                                                    <span className={`text-xs font-black ${user.role === r.id ? 'text-brand-ocean' : 'text-gray-400'}`}>{r.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-tighter pl-1">Password</label>
                                            <input type="password" required value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl dark:text-white font-bold focus:ring-2 focus:ring-brand-ocean outline-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-tighter pl-1">Confirm Password</label>
                                            <input type="password" required value={user.cpassword} onChange={(e) => setUser({...user, cpassword: e.target.value})} className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl dark:text-white font-bold focus:ring-2 focus:ring-brand-ocean outline-none" />
                                        </div>
                                    </div>

                                    <button 
                                        disabled={isLoading}
                                        type="submit"
                                        className="w-full py-5 bg-gradient-to-r from-brand-ocean to-purple-600 text-white font-black rounded-2xl shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 mt-4"
                                    >
                                        {isLoading ? "Creating Account..." : "Complete Registration"}
                                    </button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default Registration;
