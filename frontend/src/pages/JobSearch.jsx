import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { getAuthHeader, isAuthenticated } from "../utils/auth";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8082';

function JobSearch() {
    const navigate = useNavigate();
    const location = useLocation();
    const initialSearch = location.state || { title: "", location: "" };

    const [jobs, setJobs] = useState([]);
    const [myApplications, setMyApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        keyword: initialSearch.title || "",
        location: initialSearch.location || "",
        experience: "",
        salary: "",
        jobType: ""
    });

    useEffect(() => {
        fetchJobs();
        if (isAuthenticated()) {
            fetchMyApplications();
        }
    }, []);

    const fetchMyApplications = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/jobapplication/my`, {
                headers: getAuthHeader()
            });
            if (res.ok) {
                const data = await res.json();
                setMyApplications(data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_BASE_URL}/api/jobs`);
            const data = await res.json();
            setJobs(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filteredJobs = jobs.filter(job => {
        const matchesKeyword = (job.title + job.skillsRequired + job.companyName + job.description)
            .toLowerCase().includes(filters.keyword.toLowerCase());
        const matchesLocation = job.location.toLowerCase().includes(filters.location.toLowerCase());
        const matchesType = filters.jobType ? job.jobType === filters.jobType : true;
        const matchesExperience = filters.experience ? job.experience === filters.experience : true;
        
        return matchesKeyword && matchesLocation && matchesType && matchesExperience;
    });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans">
            <header className="p-6 bg-white dark:bg-gray-800 shadow-sm flex items-center justify-between sticky top-0 z-40">
                <h2 className="text-2xl font-bold text-brand-ocean cursor-pointer" onClick={() => navigate("/")}>Work Folio</h2>
                <div className="flex space-x-4">
                    <button onClick={() => navigate("/")} className="text-gray-600 dark:text-gray-300 font-semibold">Home</button>
                    <button onClick={() => navigate("/Login")} className="text-brand-ocean font-bold">Sign In</button>
                </div>
            </header>

            <main className="container mx-auto px-6 py-12 max-w-6xl">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 mb-12"
                >
                    <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-8">Search Your Next Role</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Keyword</label>
                            <input 
                                type="text" 
                                placeholder="Job title, skill..." 
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl border-none focus:ring-2 focus:ring-brand-ocean dark:text-white"
                                value={filters.keyword}
                                onChange={(e) => setFilters({...filters, keyword: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Location</label>
                            <input 
                                type="text" 
                                placeholder="City or remote" 
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl border-none focus:ring-2 focus:ring-brand-ocean dark:text-white"
                                value={filters.location}
                                onChange={(e) => setFilters({...filters, location: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Experience</label>
                            <select 
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl border-none focus:ring-2 focus:ring-brand-ocean dark:text-white"
                                value={filters.experience}
                                onChange={(e) => setFilters({...filters, experience: e.target.value})}
                            >
                                <option value="">Any Experience</option>
                                <option>0-2 years</option>
                                <option>2-4 years</option>
                                <option>4-6 years</option>
                                <option>6-8 years</option>
                                <option>8+ years</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Job Type</label>
                            <select 
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl border-none focus:ring-2 focus:ring-brand-ocean dark:text-white"
                                value={filters.jobType}
                                onChange={(e) => setFilters({...filters, jobType: e.target.value})}
                            >
                                <option value="">Any Type</option>
                                <option>Full-time</option>
                                <option>Part-time</option>
                                <option>Contract</option>
                                <option>Remote</option>
                                <option>Internship</option>
                            </select>
                        </div>
                        <div className="flex items-end">
                            <button className="w-full py-3 bg-brand-ocean text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-lg">
                                Refresh
                            </button>
                        </div>
                    </div>
                </motion.div>

                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-500 dark:text-gray-400 px-2">{filteredJobs.length} Results Found</h2>
                    
                    {loading ? (
                        <div className="flex justify-center py-20">
                             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-ocean"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6">
                            {filteredJobs.length > 0 ? filteredJobs.map((job, idx) => (
                                <motion.div 
                                    key={job.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-l-8 border-brand-ocean flex flex-col md:flex-row justify-between items-center group hover:shadow-2xl transition-all"
                                >
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <div className="text-brand-ocean font-bold text-sm tracking-widest uppercase">{job.companyName || "Top Tech"}</div>
                                            {myApplications.some(app => app.domainName.trim().toLowerCase() === job.title.trim().toLowerCase()) && (
                                                <span className="px-2 py-0.5 bg-green-100 text-green-600 text-[10px] font-black uppercase rounded-md border border-green-200">Applied</span>
                                            )}
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white group-hover:text-brand-ocean transition-colors">{job.title}</h3>
                                        <div className="flex space-x-4 text-gray-500 text-sm">
                                            <span>📍 {job.location}</span>
                                            <span>💰 {job.salaryRange || "Not disclosed"}</span>
                                            <span>🕒 {job.jobType || "Full-time"}</span>
                                        </div>
                                    </div>
                                    {isAuthenticated() ? (
                                        <button 
                                            onClick={() => navigate("/JobDetails", { state: { job } })}
                                            className="mt-6 md:mt-0 px-8 py-3 bg-gray-100 dark:bg-gray-700 text-brand-ocean font-bold rounded-xl hover:bg-brand-ocean hover:text-white transition-all transform active:scale-95"
                                        >
                                            {myApplications.some(app => app.domainName.trim().toLowerCase() === job.title.trim().toLowerCase()) ? "View Info" : "View Details"}
                                        </button>
                                    ) : (
                                        <div className="flex space-x-3 mt-6 md:mt-0">
                                            <button 
                                                onClick={() => navigate("/Login")}
                                                className="px-6 py-3 bg-brand-ocean text-white font-bold rounded-xl hover:bg-blue-700 transition-all transform active:scale-95 shadow-md"
                                            >
                                                Apply Now
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            )) : (
                                <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl shadow">
                                    <p className="text-gray-400 text-xl font-medium italic">No jobs match your criteria.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="mt-20 space-y-8">
                    <h2 className="text-3xl font-black text-gray-800 dark:text-white flex items-center space-x-4">
                        <span className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white">✨</span>
                        <span>Suggested for You</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobs.slice(0, 3).map((job, idx) => (
                            <motion.div 
                                key={`suggested-${job.id}`}
                                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 hover:scale-105 transition-transform cursor-pointer"
                                onClick={() => isAuthenticated() ? navigate("/JobDetails", { state: { job } }) : navigate("/Login")}
                            >
                                <div className="text-purple-600 font-bold text-xs uppercase mb-2 flex items-center justify-between">
                                    <span>{job.companyName}</span>
                                    {myApplications.some(app => app.domainName.trim().toLowerCase() === job.title.trim().toLowerCase()) && (
                                        <span className="text-green-500 font-black text-[10px] tracking-tighter">APPLIED</span>
                                    )}
                                </div>
                                <h4 className="font-bold text-lg dark:text-white mb-4 leading-tight">{job.title}</h4>
                                <div className="flex justify-between items-center text-gray-500 text-xs">
                                    <span>{job.location}</span>
                                    <span className="text-brand-ocean font-bold">Recommended</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default JobSearch;
