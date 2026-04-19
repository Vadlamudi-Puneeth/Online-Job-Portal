import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { getAuthHeader, isAdmin, getAuth } from "../utils/auth";

const API_BASE_URL = "http://localhost:8082";

function AdminApplications() {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Get job filter from URL if present
    const queryParams = new URLSearchParams(location.search);
    const initialJobFilter = queryParams.get("job") || "";

    const [applications, setApplications] = useState([]);
    const [filteredApps, setFilteredApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(initialJobFilter);
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [selectedJob, setSelectedJob] = useState(initialJobFilter || "All");

    // Modal states
    const [selectedApp, setSelectedApp] = useState(null);
    const [notifyData, setNotifyData] = useState({ status: "Selected", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        fetchApplications();
    }, []);

    useEffect(() => {
        const lowerSearch = searchTerm.toLowerCase();
        let filtered = [...applications];

        if (selectedStatus !== "All") {
            filtered = filtered.filter(app => (app.status || "Pending") === selectedStatus);
        }

        if (selectedJob !== "All") {
            filtered = filtered.filter(app => app.domainName === selectedJob);
        }

        setFilteredApps(filtered.filter(app => 
            (app.domainName && app.domainName.toLowerCase().includes(lowerSearch)) || 
            (app.firstname && app.firstname.toLowerCase().includes(lowerSearch)) || 
            (app.email && app.email.toLowerCase().includes(lowerSearch))
        ));
        setCurrentPage(1);
    }, [searchTerm, applications, selectedStatus, selectedJob]);

    const domains = ["All", ...new Set(applications.map(app => app.domainName))];
    const statuses = ["All", "Pending", "Reviewed", "Selected", "Rejected"];

    const fetchApplications = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/api/jobapplication`, {
                headers: { "Content-Type": "application/json", ...getAuthHeader() },
            });
            if (!response.ok) throw new Error("Failed to fetch applications");
            const data = await response.json();
            
            // If they are a recruiter, we should ideally only show their jobs.
            // For now, sorting by newest first.
            const sorted = data.sort((a, b) => (b.id || 0) - (a.id || 0));
            setApplications(sorted);
            setFilteredApps(sorted);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Pagination Calculation
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentApps = filteredApps.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredApps.length / itemsPerPage);

    const handleNotify = async (e) => {
        e.preventDefault();
        if (!selectedApp) return;
        
        setIsSubmitting(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/jobapplication/notify`, {
                method: "POST",
                headers: { "Content-Type": "application/json", ...getAuthHeader() },
                body: JSON.stringify({
                    id: selectedApp.id,
                    email: selectedApp.email,
                    status: notifyData.status,
                    message: notifyData.message
                }),
            });
            
            if (response.ok) {
                toast.success(`Success! Candidate notified via email.`);
                setSelectedApp(null);
                setNotifyData({ status: "Selected", message: "" });
                fetchApplications(); 
            } else {
                toast.error("Failed to send notification. Check Brevo settings.");
            }
        } catch (error) {
            toast.error("Network error sending notification");
        } finally {
            setIsSubmitting(false);
        }
    };

    const downloadCv = (cvFile, cvFileName) => {
        if (!cvFile) {
            toast.error("No CV uploaded.");
            return;
        }
        const link = document.createElement("a");
        link.href = cvFile;
        link.download = cvFileName || "resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Selected": return "text-green-600 bg-green-50 dark:bg-green-900/20";
            case "Rejected": return "text-red-600 bg-red-50 dark:bg-red-900/20";
            case "Interview": return "text-purple-600 bg-purple-50 dark:bg-purple-900/20";
            case "Test": return "text-amber-600 bg-amber-50 dark:bg-amber-900/20";
            default: return "text-blue-600 bg-blue-100 dark:bg-blue-900/20";
        }
    };

    const scheduleTemplate = (type) => {
        if (type === 'interview') {
            setNotifyData({
                status: "Interview",
                message: `Dear ${selectedApp.firstname},\n\nWe are impressed with your profile and would like to schedule an interview for the ${selectedApp.domainName} position.\n\nPlease let us know your availability for a 30-minute technical discussion tomorrow between 2 PM and 5 PM IST.\n\nBest regards,\nWork Folio Hiring Team`
            });
        } else {
            setNotifyData({
                status: "Test",
                message: `Dear ${selectedApp.firstname},\n\nThank you for applying for the ${selectedApp.domainName} role. We invite you to complete a technical assessment as the next step.\n\nTest Duration: 60 mins\nDeadline: Within 48 hours\nLink: [Internal Portal Link]\n\nGood luck!\nWork Folio Hiring Team`
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12 font-sans transition-colors duration-300">
            <motion.header 
                initial={{ y: -50, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                className="flex items-center justify-between p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-md sticky top-0 z-40"
            >
                <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => navigate("/HomeAfterLogin")}>
                    <div className="w-10 h-10 bg-gradient-to-br from-brand-ocean to-purple-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg">
                        <span className="text-white font-black text-xl">W</span>
                    </div>
                    <h2 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-brand-ocean to-purple-600">Admin Panel</h2>
                </div>
                <button onClick={() => navigate("/HomeAfterLogin")} className="px-6 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold rounded-xl transition-all active:scale-95 shadow-sm">
                    Back to Hub
                </button>
            </motion.header>

            <main className="container mx-auto px-6 pt-12 max-w-7xl">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 space-y-8">
                    <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
                        <div>
                            <h1 className="text-4xl font-black text-gray-800 dark:text-white mb-2">Application <span className="text-brand-ocean">Manager</span></h1>
                            <p className="text-gray-500 font-medium">Review submissions and manage candidate communication.</p>
                        </div>
                    </div>

                    {/* Filters Bar */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="relative group">
                            <input 
                                type="text"
                                placeholder="Search by Name, Job or Email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-700 rounded-2xl border-2 border-transparent focus:border-brand-ocean transition-all outline-none dark:text-white"
                            />
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-brand-ocean transition-colors">🔍</span>
                        </div>

                        <div className="relative">
                            <select 
                                value={selectedJob}
                                onChange={(e) => setSelectedJob(e.target.value)}
                                className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-700 rounded-2xl border-2 border-transparent focus:border-brand-ocean appearance-none transition-all outline-none dark:text-white font-semibold"
                            >
                                {domains.map(d => <option key={d} value={d}>{d === "All" ? "💼 All Job Titles" : d}</option>)}
                            </select>
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</span>
                        </div>

                        <div className="relative">
                            <select 
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-700 rounded-2xl border-2 border-transparent focus:border-brand-ocean appearance-none transition-all outline-none dark:text-white font-semibold"
                            >
                                {statuses.map(s => <option key={s} value={s}>{s === "All" ? "📊 All Statuses" : s}</option>)}
                            </select>
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</span>
                        </div>
                    </div>
                </motion.div>

                {loading ? (
                    <div className="flex flex-col justify-center items-center h-96 space-y-4">
                         <div className="w-16 h-16 border-4 border-brand-ocean border-t-transparent rounded-full animate-spin"></div>
                         <p className="text-gray-400 font-bold animate-pulse">Syncing Applications...</p>
                    </div>
                ) : currentApps.length === 0 ? (
                    <div className="text-center py-32 bg-white dark:bg-gray-800 rounded-[3rem] shadow-xl border border-gray-100 dark:border-gray-700">
                        <div className="text-6xl mb-6">📂</div>
                        <p className="text-2xl text-gray-400 dark:text-gray-500 font-black">No candidates found.</p>
                        <p className="text-gray-400 mt-2">Try adjusting your search or filter.</p>
                        <button onClick={() => { setSearchTerm(""); setSelectedStatus("All"); setSelectedJob("All"); }} className="mt-8 text-brand-ocean font-bold underline">Show all applications</button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
                            {currentApps.map((app, index) => (
                                <motion.div 
                                    key={app.id || index}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-xl border border-gray-50 dark:border-gray-700 hover:shadow-2xl transition-all group relative overflow-hidden"
                                >
                                    <div className={`absolute top-0 right-0 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity -mr-8 -mt-8 font-black text-8xl pointer-events-none`}>
                                        {index + 1}
                                    </div>

                                    <div className="flex justify-between items-start mb-8">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 flex-wrap gap-y-2">
                                                <h3 className="text-2xl font-black text-gray-800 dark:text-white truncate max-w-[200px]">{app.firstname} {app.lastname}</h3>
                                                <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusColor(app.status)}`}>
                                                    {app.status || 'Pending'}
                                                </span>
                                            </div>
                                            <p className="text-brand-ocean font-black uppercase tracking-widest text-[10px] bg-blue-50 dark:bg-blue-900/40 inline-block px-3 py-1 rounded-lg mt-3">{app.domainName}</p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button 
                                                onClick={() => downloadCv(app.cvFile, app.cvFileName)}
                                                className="p-4 bg-gray-50 dark:bg-gray-700 text-brand-ocean rounded-2xl hover:bg-brand-ocean hover:text-white transition-all shadow-sm active:scale-90"
                                                title="View Resume"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                            </button>
                                            <button 
                                                onClick={() => setSelectedApp(app)}
                                                className="p-4 bg-white dark:bg-gray-700 text-purple-600 rounded-2xl hover:bg-purple-600 hover:text-white border-2 border-purple-50 dark:border-purple-900/30 transition-all shadow-sm active:scale-90"
                                                title="Notify Candidate"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Email</span>
                                                <p className="text-gray-700 dark:text-gray-300 font-bold text-sm truncate">{app.email}</p>
                                            </div>
                                            <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Contact</span>
                                                <p className="text-gray-700 dark:text-gray-300 font-bold text-sm">{app.contact || "N/A"}</p>
                                            </div>
                                        </div>

                                        {app.coverLetter && (
                                            <div className="space-y-2">
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Cover Note</span>
                                                <div className="p-5 bg-gray-50 dark:bg-gray-700 rounded-3xl text-sm italic text-gray-600 dark:text-gray-400 whitespace-pre-wrap max-h-32 overflow-y-auto font-medium border-l-4 border-brand-ocean">
                                                    "{app.coverLetter}"
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center mt-12 space-x-2">
                                <button 
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(p => p - 1)}
                                    className="p-3 rounded-xl bg-white dark:bg-gray-800 border-none shadow-md disabled:opacity-30"
                                >
                                    ◀
                                </button>
                                {[...Array(totalPages)].map((_, i) => (
                                    <button 
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`w-10 h-10 rounded-xl font-bold transition-all ${
                                            currentPage === i + 1 
                                            ? 'bg-brand-ocean text-white' 
                                            : 'bg-white dark:bg-gray-800 text-gray-400'
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button 
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(p => p + 1)}
                                    className="p-3 rounded-xl bg-white dark:bg-gray-800 border-none shadow-md disabled:opacity-30"
                                >
                                    ▶
                                </button>
                            </div>
                        )}
                    </>
                )}
            </main>

            {/* Notification Modal */}
            <AnimatePresence>
                {selectedApp && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-xl">
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-[3.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.3)] overflow-hidden"
                        >
                            <div className="p-10 bg-gradient-to-r from-brand-ocean to-purple-600 text-white relative">
                                <h3 className="text-3xl font-black">Quick Notification</h3>
                                <div className="flex gap-2 mt-4">
                                    <button onClick={() => scheduleTemplate('interview')} className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold transition-all">🗓️ Schedule Interview</button>
                                    <button onClick={() => scheduleTemplate('test')} className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold transition-all">📝 Schedule Test</button>
                                </div>
                                <button onClick={() => setSelectedApp(null)} className="absolute top-8 right-8 text-4xl leading-none opacity-50 hover:opacity-100 transition-opacity">&times;</button>
                            </div>
                            
                            <form onSubmit={handleNotify} className="p-10 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Candidate Email</label>
                                        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl text-gray-500 font-bold text-sm truncate">
                                            {selectedApp.email}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Application Context</label>
                                        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl text-gray-500 font-bold text-sm truncate">
                                            {selectedApp.domainName}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Assign Status</label>
                                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                                        {["Pending", "Selected", "Rejected", "Interview", "Test"].map((s) => (
                                            <button
                                                key={s}
                                                type="button"
                                                onClick={() => setNotifyData({ ...notifyData, status: s })}
                                                className={`py-4 rounded-2xl font-black text-[10px] transition-all border-2 ${
                                                    notifyData.status === s 
                                                    ? 'bg-brand-ocean text-white border-brand-ocean shadow-lg shadow-brand-ocean/20' 
                                                    : 'bg-transparent text-gray-400 border-gray-100 dark:border-gray-700 hover:border-brand-ocean/30 hover:text-brand-ocean'
                                                }`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Next Steps / Feedback</label>
                                    <textarea
                                        required
                                        value={notifyData.message}
                                        onChange={(e) => setNotifyData({ ...notifyData, message: e.target.value })}
                                        placeholder="Write a clear, professional message for the candidate..."
                                        className="w-full px-8 py-6 bg-gray-50 dark:bg-gray-900 border-none rounded-[2rem] dark:text-white font-medium focus:ring-2 focus:ring-brand-ocean outline-none transition-all resize-none h-40 shadow-inner"
                                    ></textarea>
                                </div>

                                <div className="flex space-x-6 pt-4">
                                    <button 
                                        type="button"
                                        onClick={() => setSelectedApp(null)}
                                        className="flex-1 py-5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-black rounded-2xl hover:bg-gray-200 transition-all active:scale-95"
                                    >
                                        Dismiss
                                    </button>
                                    <button 
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-[2] py-5 bg-brand-ocean text-white font-black rounded-2xl shadow-2xl shadow-brand-ocean/30 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center group"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                Proceed & Send Notice
                                                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default AdminApplications;
