import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getAuthHeader, isAuthenticated } from "../utils/auth";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8082";

function JobDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const { job } = location.state || {};
    const [hasApplied, setHasApplied] = useState(false);

    useEffect(() => {
        if (isAuthenticated() && job) {
            checkApplicationStatus();
        }
    }, [job]);

    const checkApplicationStatus = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/jobapplication/my`, {
                headers: getAuthHeader()
            });
            if (res.ok) {
                const myApplications = await res.json();
                const alreadyApplied = myApplications.some(app => 
                    app.domainName.trim().toLowerCase() === job.title.trim().toLowerCase()
                );
                setHasApplied(alreadyApplied);
            }
        } catch (err) {
            console.error("Error checking application status:", err);
        }
    };

    if (!job) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">No Job data found</h2>
                    <button onClick={() => navigate("/JobSearch")} className="mt-4 text-brand-ocean font-bold underline">Back to Search</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans pb-20">
            <header className="p-6 bg-white dark:bg-gray-800 shadow-sm flex items-center justify-between sticky top-0 z-40">
                <div className="flex items-center space-x-4">
                    <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-brand-ocean transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    </button>
                    <h2 className="text-2xl font-bold text-brand-ocean cursor-pointer" onClick={() => navigate("/")}>Work Folio</h2>
                </div>
            </header>

            <main className="container mx-auto px-6 py-12 max-w-4xl">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700"
                >
                    {/* Hero Header */}
                    <div className="p-8 md:p-12 bg-gradient-to-br from-brand-ocean to-purple-800 text-white">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div className="space-y-4">
                                <span className="px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-bold tracking-wider">{job.jobType || "Full-time"}</span>
                                <h1 className="text-4xl md:text-5xl font-extrabold">{job.title}</h1>
                                <div className="flex items-center space-x-2 text-xl font-semibold opacity-90">
                                    <span>{job.companyName || "Top Tech Industry"}</span>
                                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                    <span>{job.location}</span>
                                </div>
                            </div>
                            <div className="flex md:flex-col items-center md:items-end gap-2">
                                <span className="text-3xl font-bold">{job.salaryRange || "Not Disclosed"}</span>
                                <span className="opacity-70 text-sm italic">Estimated Salary</span>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 md:p-12 space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-2xl border border-gray-100 dark:border-gray-600">
                                <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Experience Required</div>
                                <div className="text-gray-800 dark:text-white font-bold text-lg">{job.experience || "Any Experience"}</div>
                            </div>
                            <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-2xl border border-gray-100 dark:border-gray-600 md:col-span-2">
                                <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Required Skills</div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {(job.skillsRequired || "Java, Spring, React").split(',').map((skill, i) => (
                                        <span key={i} className="px-3 py-1 bg-brand-ocean/10 text-brand-ocean dark:bg-brand-ocean/20 dark:text-blue-300 rounded-lg text-sm font-bold">
                                            {skill.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white border-b-2 border-brand-ocean w-max pb-1">Job Description</h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
                                {job.description || "Building robust applications with cutting edge technologies..."}
                            </p>
                        </div>

                        <div className="pt-6">
                            <button 
                                onClick={() => {
                                    if (!isAuthenticated()) {
                                        navigate("/Login");
                                    } else if (!hasApplied) {
                                        navigate("/JobApplication", { state: { domainName: job.title } });
                                    }
                                }}
                                disabled={hasApplied}
                                className={`w-full py-5 text-white font-extrabold text-xl rounded-2xl shadow-xl transition-all transform ${
                                    hasApplied 
                                    ? "bg-gray-400 cursor-not-allowed" 
                                    : "bg-brand-ocean hover:bg-blue-700 hover:-translate-y-1 active:scale-[0.98]"
                                }`}
                            >
                                {hasApplied ? "Already Applied" : "Apply Now"}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}

export default JobDetails;
