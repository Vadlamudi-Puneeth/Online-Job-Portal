import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
            <nav className="container mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 shadow-2xl rounded-[2rem] px-8 py-4 flex justify-between items-center transition-all duration-500">
                <div 
                    className="flex items-center space-x-3 cursor-pointer group" 
                    onClick={() => navigate("/")}
                >
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-ocean to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                        <span className="text-white font-black text-2xl">W</span>
                    </div>
                    <div>
                        <h2 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-brand-ocean to-purple-600">Work Folio</h2>
                        <div className="h-1 bg-brand-ocean w-0 group-hover:w-full transition-all duration-300"></div>
                    </div>
                </div>

                <div className="hidden md:flex items-center space-x-8">
                    {[
                        { label: 'About', path: '/Aboutus' },
                        { label: 'Terms', path: '/TermsAndConditions' },
                        { label: 'Contact', path: '/Contactus' }
                    ].map((link) => (
                        <button 
                            key={link.label}
                            onClick={() => navigate(link.path)}
                            className="text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-brand-ocean transition-colors uppercase tracking-widest"
                        >
                            {link.label}
                        </button>
                    ))}
                    <button 
                        onClick={() => navigate("/Login")}
                        className="px-8 py-3 bg-brand-ocean text-white font-black rounded-xl shadow-xl shadow-brand-ocean/20 hover:scale-[1.05] active:scale-[0.95] transition-all"
                    >
                        Sign In
                    </button>
                </div>

                {/* Mobile Menu Icon (Simplified for now) */}
                <div className="md:hidden">
                    <button className="text-gray-500 dark:text-gray-400">
                         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
