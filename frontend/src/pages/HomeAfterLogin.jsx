import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ChatBot1 from "../components/ChatBot1";
import Footer from "../components/Footer";
import { clearAuth, getAuth, getAuthHeader } from "../utils/auth";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8082';

function HomeAfterLogin() {
    const navigate = useNavigate();
    const auth = getAuth();
    const [showChatbot, setShowChatbot] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    // User Stats & Data
    const [myApplications, setMyApplications] = useState([]);
    const [recruiterJobs, setRecruiterJobs] = useState([]);
    const [platformStats, setPlatformStats] = useState({ users: 0, jobs: 0, applications: 0 });

    // Pagination Stats
    const [seekPage, setSeekPage] = useState(1);
    const [recPage, setRecPage] = useState(1);
    const itemsPerPage = 6;

    // Search/Filter State
    const [seekSearch, setSeekSearch] = useState("");
    const [seekStatusFilter, setSeekStatusFilter] = useState("All");
    const [recSearch, setRecSearch] = useState("");

    useEffect(() => {
        if (!auth) {
            navigate("/Login");
            return;
        }

        if (auth.role === 'JOB_SEEKER' || auth.role === 'USER') {
            fetchMyApplications();
        } else if (auth.role === 'RECRUITER') {
            fetchRecruiterJobs();
        } else if (auth.role === 'ADMIN') {
            fetchPlatformStats();
        }
    }, [auth?.role]);

    // Job Seeker Filtered + Paginated
    const filteredSeekApps = myApplications.filter(app => {
        const matchesSearch = (app.domainName || "").toLowerCase().includes(seekSearch.toLowerCase());
        const matchesStatus = seekStatusFilter === "All" || (app.status || "Pending") === seekStatusFilter;
        return matchesSearch && matchesStatus;
    });
    const seekStatuses = ["All", ...new Set(myApplications.map(a => a.status || "Pending"))];
    const indexOfLastSeek = seekPage * itemsPerPage;
    const indexOfFirstSeek = indexOfLastSeek - itemsPerPage;
    const currentSeekApps = filteredSeekApps.slice(indexOfFirstSeek, indexOfLastSeek);
    const seekTotalPages = Math.ceil(filteredSeekApps.length / itemsPerPage);

    // Recruiter Filtered + Paginated
    const filteredRecJobs = recruiterJobs.filter(job =>
        (job.title || "").toLowerCase().includes(recSearch.toLowerCase())
    );
    const indexOfLastRec = recPage * itemsPerPage;
    const indexOfFirstRec = indexOfLastRec - itemsPerPage;
    const currentRecJobs = filteredRecJobs.slice(indexOfFirstRec, indexOfLastRec);
    const recTotalPages = Math.ceil(filteredRecJobs.length / itemsPerPage);

    const fetchMyApplications = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/jobapplication/my`, {
                headers: getAuthHeader()
            });
            if (res.ok) setMyApplications(await res.json());
        } catch (err) { console.error(err); }
    };

    const fetchRecruiterJobs = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/jobs/recruiter/${auth.email}`, {
                headers: getAuthHeader()
            });
            if (res.ok) {
                const jobs = await res.json();
                const enrichedJobs = await Promise.all(jobs.map(async (job) => {
                    const appRes = await fetch(`${API_BASE_URL}/api/jobapplication/domain/${job.title}`, {
                        headers: getAuthHeader()
                    });
                    const apps = appRes.ok ? await appRes.json() : [];
                    return { ...job, applicantCount: apps.length };
                }));
                setRecruiterJobs(enrichedJobs);
            }
        } catch (err) { console.error(err); }
    };

    const fetchPlatformStats = async () => {
        try {
            const [u, j, a] = await Promise.all([
                fetch(`${API_BASE_URL}/api/auth/users`, { headers: getAuthHeader() }).then(r => r.json()),
                fetch(`${API_BASE_URL}/api/jobs`, { headers: getAuthHeader() }).then(r => r.json()),
                fetch(`${API_BASE_URL}/api/jobapplication`, { headers: getAuthHeader() }).then(r => r.json())
            ]);
            setPlatformStats({ users: u.length, jobs: j.length, applications: a.length });
        } catch (err) { console.error(err); }
    };

    const handleLogout = () => {
        setIsLoading(true);
        setTimeout(() => {
            clearAuth();
            toast.info("Logged out successfully");
            navigate("/Login");
        }, 800);
    };

    // --- DASHBOARD RENDERS ---

    const renderJobSeekerDashboard = () => (
        <div className="space-y-8 md:space-y-12">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 p-6 md:p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-700"
            >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <h2 className="text-3xl font-black text-gray-800 dark:text-white">Applied <span className="text-brand-ocean">Jobs</span></h2>
                    <button onClick={() => navigate("/JobOpenings")} className="text-brand-ocean font-bold flex items-center group">
                        Browse More <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </button>
                </div>

                {/* Seeker Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="relative group">
                        <input 
                            type="text" placeholder="Search applied jobs..."
                            value={seekSearch}
                            onChange={(e) => { setSeekSearch(e.target.value); setSeekPage(1); }}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-2xl border-2 border-transparent focus:border-brand-ocean transition-all outline-none dark:text-white"
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
                    </div>
                    <div className="relative">
                        <select 
                            value={seekStatusFilter}
                            onChange={(e) => { setSeekStatusFilter(e.target.value); setSeekPage(1); }}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-2xl border-2 border-transparent focus:border-brand-ocean appearance-none transition-all outline-none dark:text-white font-semibold"
                        >
                            {seekStatuses.map(s => <option key={s} value={s}>{s === "All" ? "📊 All Statuses" : s}</option>)}
                        </select>
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</span>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentSeekApps.length > 0 ? currentSeekApps.map((app, idx) => (
                        <motion.div 
                            key={idx} 
                            whileHover={{ scale: 1.02 }}
                            className="p-6 bg-gray-50 dark:bg-gray-700 rounded-[2rem] border border-gray-100 dark:border-gray-600 flex justify-between items-center transition-all"
                        >
                            <div className="space-y-1">
                                <h4 className="text-xl font-bold text-gray-800 dark:text-white">{app.domainName}</h4>
                                <div className="flex items-center space-x-2">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                        app.status === 'Selected' ? 'bg-green-100 text-green-600' : 
                                        app.status === 'Rejected' ? 'bg-red-100 text-red-600' : 
                                        'bg-blue-100 text-blue-600'
                                    }`}>
                                        {app.status || 'Pending'}
                                    </span>
                                </div>
                            </div>
                            <button onClick={() => navigate("/JobOpenings")} className="p-3 bg-white dark:bg-gray-600 rounded-2xl shadow-sm hover:text-brand-ocean transition-all">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                            </button>
                        </motion.div>
                    )) : (
                        <div className="col-span-full py-12 text-center bg-gray-50 dark:bg-gray-700/30 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-600">
                             <p className="text-gray-400 font-medium italic">No applications found on this page.</p>
                             <button onClick={() => navigate("/JobOpenings")} className="mt-4 px-6 py-2 bg-brand-ocean text-white font-bold rounded-xl shadow-lg">Start Applying</button>
                        </div>
                    )}
                </div>

                {/* Pagination for Seeker */}
                {seekTotalPages > 1 && (
                    <div className="flex justify-center mt-10 gap-2">
                         {[...Array(seekTotalPages)].map((_, i) => (
                            <button 
                                key={i}
                                onClick={() => setSeekPage(i + 1)}
                                className={`w-10 h-10 rounded-xl font-bold transition-all ${seekPage === i + 1 ? 'bg-brand-ocean text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:bg-gray-200'}`}
                            >
                                {i + 1}
                            </button>
                         ))}
                    </div>
                )}
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: "Search Jobs", desc: "Discover your next career move.", icon: "🔍", color: "bg-brand-ocean", path: "/JobOpenings" },
                    { title: "Mock Tests", desc: "Sharpen your technical skills.", icon: "⚡", color: "bg-purple-600", path: "/MockTest" },
                    { title: "My Profile", desc: "Update your resume and details.", icon: "👤", color: "bg-teal-500", path: "/Profile" }
                ].map((item, i) => (
                    <motion.div 
                        key={i}
                        whileHover={{ y: -5 }}
                        onClick={() => navigate(item.path)}
                        className={`${item.color} p-8 rounded-[2.5rem] text-white space-y-4 shadow-2xl cursor-pointer relative overflow-hidden group`}
                    >
                        <div className="relative z-10">
                            <div className="text-4xl mb-4">{item.icon}</div>
                            <h3 className="text-2xl font-black">{item.title}</h3>
                            <p className="opacity-80 font-medium">{item.desc}</p>
                        </div>
                        <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-150 transition-transform duration-500">
                             <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></svg>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );

    const renderRecruiterDashboard = () => (
        <div className="space-y-12">
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col md:flex-row justify-between items-center gap-6"
            >
                <div>
                    <h2 className="text-4xl font-black text-gray-800 dark:text-white">Recruiter <span className="text-brand-ocean">Hub</span></h2>
                    <p className="text-gray-500 mt-2 font-medium">Empowering your hiring journey efficiently.</p>
                </div>
                <button 
                   onClick={() => navigate("/JobOpenings")}
                   className="w-full md:w-auto px-10 py-4 bg-brand-ocean text-white font-black rounded-2xl shadow-2xl shadow-brand-ocean/30 hover:bg-blue-700 transition transform active:scale-95 flex items-center justify-center"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path></svg>
                    Post New Job
                </button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-700">
                    <h3 className="text-2xl font-black mb-6 dark:text-white flex items-center">
                        <span className="w-3 h-8 bg-brand-ocean rounded-full mr-4"></span>
                        Active Job Postings
                    </h3>
                    {/* Recruiter Search */}
                    <div className="relative group mb-6">
                        <input 
                            type="text" placeholder="Search your jobs..."
                            value={recSearch}
                            onChange={(e) => { setRecSearch(e.target.value); setRecPage(1); }}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-2xl border-2 border-transparent focus:border-brand-ocean transition-all outline-none dark:text-white"
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
                    </div>
                    <div className="space-y-4">
                        {currentRecJobs.length > 0 ? currentRecJobs.map((job, i) => (
                            <div 
                                key={i} 
                                onClick={() => navigate(`/AdminApplications?job=${job.title}`)}
                                className="group p-6 bg-gray-50 dark:bg-gray-700/50 rounded-3xl border border-transparent hover:border-brand-ocean transition-all cursor-pointer flex justify-between items-center"
                            >
                                <div>
                                    <h4 className="text-xl font-bold dark:text-white group-hover:text-brand-ocean transition-colors">{job.title}</h4>
                                    <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest">{job.applicantCount || 0} Applicants</p>
                                </div>
                                <div className="w-10 h-10 bg-white dark:bg-gray-600 rounded-xl flex items-center justify-center shadow-sm">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                </div>
                            </div>
                        )) : (
                            <p className="text-gray-400 italic text-center py-8">No jobs found on this page.</p>
                        )}
                    </div>
                    {/* Pagination for Recruiter */}
                    {recTotalPages > 1 && (
                        <div className="flex justify-center mt-8 gap-2">
                            {[...Array(recTotalPages)].map((_, i) => (
                                <button 
                                    key={i}
                                    onClick={() => setRecPage(i + 1)}
                                    className={`w-8 h-8 rounded-lg font-bold text-xs transition-all ${recPage === i + 1 ? 'bg-brand-ocean text-white shadow-lg' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    )}
                 </div>

                 <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="p-8 bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-700 text-center">
                            <div className="text-brand-ocean text-4xl font-black">{recruiterJobs.length}</div>
                            <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-2">Open Positions</div>
                        </div>
                        <div className="p-8 bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-700 text-center">
                            <div className="text-purple-600 text-4xl font-black">
                                {recruiterJobs.reduce((acc, j) => acc + (j.applicantCount || 0), 0)}
                            </div>
                            <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-2">Total Candidates</div>
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                        <h3 className="text-2xl font-black mb-2">Hiring Analytics</h3>
                        <p className="opacity-80 text-sm">Your applicant response rate is up by <span className="font-black">12%</span> this week!</p>
                        <button className="mt-8 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl font-bold transition-all">View Full Report</button>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                    </div>
                 </div>
            </div>
        </div>
    );

    const renderAdminDashboard = () => (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h2 className="text-4xl font-black text-gray-800 dark:text-white">Admin <span className="text-brand-ocean">Center</span></h2>
                    <p className="text-gray-500 mt-2 font-medium">Master control of the Work Folio ecosystem.</p>
                </div>
                <div className="flex space-x-3">
                    <div className="px-5 py-3 bg-green-100 text-green-600 rounded-xl font-bold flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                        System Online
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                 {[
                    { label: 'Users', val: platformStats.users, color: 'from-blue-500 to-blue-700', icon: "👥" },
                    { label: 'Live Jobs', val: platformStats.jobs, color: 'from-emerald-500 to-teal-700', icon: "💼" },
                    { label: 'Applies', val: platformStats.applications, color: 'from-amber-400 to-orange-600', icon: "📝" },
                    { label: 'Reports', val: '24', color: 'from-purple-500 to-indigo-700', icon: "📊" }
                 ].map((stat, i) => (
                    <motion.div 
                        key={i} 
                        whileHover={{ scale: 1.05 }}
                        className={`bg-gradient-to-br ${stat.color} p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden`}
                    >
                        <div className="relative z-10">
                            <div className="text-4xl font-black">{stat.val}</div>
                            <div className="opacity-80 font-bold uppercase tracking-widest text-[10px] mt-1">{stat.label}</div>
                        </div>
                        <div className="absolute top-2 right-4 text-3xl opacity-20">{stat.icon}</div>
                    </motion.div>
                 ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
                <button onClick={() => navigate("/AdminApplications")} className="group p-10 bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-700 font-black text-xl text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-750 transition-all flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/40 rounded-3xl flex items-center justify-center text-3xl group-hover:rotate-12 transition-transform">📋</div>
                    <span>Manage Applicants</span>
                </button>
                <button onClick={() => navigate("/AdminManageUsers")} className="group p-10 bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-700 font-black text-xl text-gray-700 dark:text-white hover:bg-gray-50 transition-all flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/40 rounded-3xl flex items-center justify-center text-3xl group-hover:rotate-12 transition-transform">👥</div>
                    <span>Manage Users</span>
                </button>
                <button onClick={() => navigate("/NotifyStatus")} className="group p-10 bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-700 font-black text-xl text-gray-700 dark:text-white hover:bg-gray-50 transition-all flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 bg-purple-50 dark:bg-purple-900/40 rounded-3xl flex items-center justify-center text-3xl group-hover:rotate-12 transition-transform">✉️</div>
                    <span>Global Notify</span>
                </button>
                <button onClick={() => navigate("/JobOpenings")} className="group p-10 bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-700 font-black text-xl text-gray-700 dark:text-white hover:bg-gray-50 transition-all flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 bg-teal-50 dark:bg-teal-900/40 rounded-3xl flex items-center justify-center text-3xl group-hover:rotate-12 transition-transform">🏢</div>
                    <span>Platform Jobs</span>
                </button>
            </div>
        </div>
    );

    return (
        <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500 font-sans pb-20 md:pb-0">
            {isLoading && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xl">
                    <div className="w-16 h-16 border-4 border-brand-ocean border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            <header className="flex items-center justify-between p-6 px-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
                <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => navigate("/HomeAfterLogin")}>
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-ocean to-purple-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:rotate-6 transition-transform">
                        <span className="text-white font-black text-2xl">W</span>
                    </div>
                    <div className="hidden sm:block">
                        <h2 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-brand-ocean to-purple-600 leading-tight">Work Folio</h2>
                        <div className="h-1 bg-brand-ocean w-0 group-hover:w-full transition-all duration-300"></div>
                    </div>
                </div>
                
                <div className="flex items-center space-x-4 md:space-x-8">
                    <div className="hidden md:flex flex-col items-end">
                        <span className="font-black text-gray-800 dark:text-white capitalize leading-none mb-1">Hi, {auth?.username}</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">{auth?.role?.replace('_', ' ')}</span>
                    </div>
                    <button 
                        onClick={handleLogout} 
                        className="px-6 py-3 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white font-black rounded-2xl shadow-sm transition-all transform active:scale-95 text-sm"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <main className="container mx-auto px-6 py-12 md:px-12">
                {auth?.role === 'ADMIN' ? renderAdminDashboard() : 
                 auth?.role === 'RECRUITER' ? renderRecruiterDashboard() : 
                 renderJobSeekerDashboard()}
            </main>

            {/* Mobile Bottom Nav (Tablet/Mobile Only) */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border-t border-gray-100 dark:border-gray-700 py-4 px-8 flex justify-between items-center z-50 shadow-2xl">
                 <button onClick={() => navigate("/HomeAfterLogin")} className="flex flex-col items-center">
                    <span className="text-2xl">🏠</span>
                    <span className="text-[10px] font-bold uppercase mt-1">Home</span>
                 </button>
                 <button onClick={() => navigate("/JobOpenings")} className="flex flex-col items-center">
                    <span className="text-2xl">💼</span>
                    <span className="text-[10px] font-bold uppercase mt-1">Jobs</span>
                 </button>
                 <button onClick={() => navigate("/Profile")} className="flex flex-col items-center">
                    <span className="text-2xl">👤</span>
                    <span className="text-[10px] font-bold uppercase mt-1">Profile</span>
                 </button>
            </div>

            <AnimatePresence>
                {showChatbot && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        className="fixed bottom-32 right-8 z-[100] w-[calc(100%-4rem)] max-w-[400px] bg-white dark:bg-gray-800 rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.3)] overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col"
                    >
                        <div className="p-6 bg-brand-ocean text-white flex justify-between items-center shadow-lg">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                    <span className="text-xl">🤖</span>
                                </div>
                                <div>
                                    <span className="font-black tracking-widest uppercase text-[10px] block">Global Career Assistant</span>
                                    <span className="text-[9px] font-bold opacity-70">Always Online</span>
                                </div>
                            </div>
                            <button onClick={() => setShowChatbot(false)} className="text-3xl opacity-50 hover:opacity-100 transition-opacity">&times;</button>
                        </div>
                        <div className="h-[500px] overflow-hidden">
                            <ChatBot1 />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button 
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowChatbot(!showChatbot)}
                className="fixed bottom-10 right-10 z-[101] w-20 h-20 bg-gradient-to-br from-brand-ocean to-purple-600 rounded-[2rem] flex items-center justify-center shadow-2xl text-3xl shadow-brand-ocean/40 group border-4 border-white dark:border-gray-900"
            >
                <span className="group-hover:animate-bounce transition-all">
                    {showChatbot ? '❌' : '🤖'}
                </span>
            </motion.button>

            <Footer />
        </div>
    );
}

export default HomeAfterLogin;
