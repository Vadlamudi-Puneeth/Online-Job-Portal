import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatBot1 from "../components/ChatBot1";
import { motion, AnimatePresence } from "framer-motion";
import { isAuthenticated } from "../utils/auth";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8082';

function Home() {
    const navigate = useNavigate();
    const [showChatbot, setShowChatbot] = useState(false);
    const [search, setSearch] = useState({ title: '', location: '' });
    const [featuredJobs, setFeaturedJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/jobs`);
                const data = await res.json();
                setFeaturedJobs(data.slice(0, 3));
            } catch (err) {
                console.error(err);
            }
        };
        fetchJobs();
    }, []);

    const toggleChatbot = () => setShowChatbot(!showChatbot);
    const handlelogin = () => navigate("/Login");
    const handleregister = () => navigate("/Registration");
    const handleAboutus = () => navigate("/Aboutus");
    const handleContactus = () => navigate("/Contactus");
    const handleterms = () => navigate("/TermsAndConditions");

    const handleSearch = (e) => {
        e.preventDefault();
        navigate("/JobSearch", { state: search });
    };

    return (
        <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans">
            
            {/* Header Navbar */}
            <motion.header 
                initial={{ y: -50, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40"
            >
                <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => navigate("/")}>
                    <div className="w-10 h-10 bg-gradient-to-r from-brand-ocean to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                        <span className="text-white font-bold text-xl">W</span>
                    </div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-ocean to-purple-600">Work Folio</h2>
                </div>
                <nav className="hidden md:flex space-x-8 font-semibold text-gray-600 dark:text-gray-300">
                    <button onClick={() => navigate("/")} className="hover:text-brand-ocean transition-colors">Home</button>
                    <button onClick={() => navigate("/JobSearch")} className="hover:text-brand-ocean transition-colors">Jobs</button>
                    <button onClick={handleAboutus} className="hover:text-brand-ocean transition-colors">About</button>
                </nav>
                <div className="flex space-x-4">
                    <button onClick={handlelogin} className="px-6 py-2 text-brand-ocean font-semibold hover:text-blue-800 transition-colors">Sign in</button>
                    <button onClick={handleregister} className="px-6 py-2 bg-brand-ocean hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg transition-transform hover:scale-105">Sign Up</button>
                </div>
            </motion.header>

            {/* Hero Section */}
            <main className="container mx-auto px-6 py-12 flex flex-col items-center text-center space-y-12">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl space-y-6">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800 dark:text-gray-100 leading-tight">
                        Find Your <span className="text-brand-ocean">Dream Job</span> Today
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Connecting passionate job seekers with top global employers. Your career journey starts here.
                    </p>
                </motion.div>

                {/* Search Bar */}
                <motion.form 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    onSubmit={handleSearch}
                    className="w-full max-w-4xl bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-4 border border-gray-100 dark:border-gray-700"
                >
                    <div className="flex-1 relative">
                        <input 
                            type="text" 
                            placeholder="Job Title / Skill" 
                            className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-700 border-none rounded-xl focus:ring-2 focus:ring-brand-ocean dark:text-white"
                            value={search.title}
                            onChange={(e) => setSearch({...search, title: e.target.value})}
                        />
                    </div>
                    <div className="flex-1 relative">
                        <input 
                            type="text" 
                            placeholder="Location" 
                            className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-700 border-none rounded-xl focus:ring-2 focus:ring-brand-ocean dark:text-white"
                            value={search.location}
                            onChange={(e) => setSearch({...search, location: e.target.value})}
                        />
                    </div>
                    <button type="submit" className="px-10 py-4 bg-brand-ocean text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-lg">
                        Search Jobs
                    </button>
                </motion.form>

                {/* Featured Jobs */}
                <section className="w-full max-w-6xl py-12 space-y-8 text-left">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white px-4 border-l-4 border-brand-ocean">Featured Jobs</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredJobs.length > 0 ? featuredJobs.map((job, idx) => (
                            <motion.div 
                                key={job.id}
                                whileHover={{ y: -5 }}
                                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 space-y-4"
                            >
                                <div className="text-brand-ocean font-bold text-sm uppercase tracking-widest">{job.companyName || "Top Tech"}</div>
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{job.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400">{job.location}</p>
                                {isAuthenticated() ? (
                                    <button onClick={() => navigate("/JobDetails", { state: { job } })} className="text-brand-ocean font-bold hover:underline">View Details →</button>
                                ) : (
                                    <button onClick={() => navigate("/Login")} className="text-brand-ocean font-bold hover:underline">Login to Apply →</button>
                                )}
                            </motion.div>
                        )) : (
                            <p className="text-gray-500 italic">No featured jobs available.</p>
                        )}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-gray-800 py-12 shadow-inner mt-20 border-t border-gray-100 dark:border-gray-700">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-500 dark:text-gray-400 text-sm">
                    <p>&copy; 2024 Work Folio. All Rights Reserved.</p>
                    <div className="flex space-x-8 mt-6 md:mt-0 font-semibold uppercase tracking-wider">
                        <button onClick={handleAboutus} className="hover:text-brand-ocean transition-colors">About Us</button>
                        <button onClick={handleContactus} className="hover:text-brand-ocean transition-colors">Contact</button>
                        <button onClick={handleterms} className="hover:text-brand-ocean transition-colors">Privacy Policy</button>
                    </div>
                </div>
            </footer>

            {/* Chatbot SVG Icon */}
            <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-8 right-8 bg-brand-ocean text-white p-4 rounded-full shadow-2xl cursor-pointer z-50 flex items-center justify-center"
                onClick={toggleChatbot}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" className="fill-current text-white">
                    <path d="M12 2C6.486 2 2 6.486 2 12c0 4.411 3.134 8.113 7.248 8.872v1.531c0 .275.224.497.5.497a.494.494 0 0 0 .353-.145L14.5 18H17c5.514 0 10-4.486 10-10S17.514 2 12 2zM12 16H6v-2h6v2zm6-4H6v-2h12v2zm0-4H6V6h12v2z"></path>
                </svg>
            </motion.div>

            {/* Chatbot Modal */}
            <AnimatePresence>
                {showChatbot && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-24 right-8 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden z-50 border border-gray-200 dark:border-gray-700"
                    >
                        <div className="flex justify-between items-center bg-brand-ocean text-white px-4 py-3">
                            <h3 className="font-bold">ChatBot</h3>
                            <button onClick={toggleChatbot} className="text-2xl leading-none hover:text-gray-200">&times;</button>
                        </div>
                        <div className="p-0 max-h-96 overflow-y-auto">
                            <ChatBot1 />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Home;
