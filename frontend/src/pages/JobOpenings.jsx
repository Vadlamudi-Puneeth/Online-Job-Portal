import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { getAuth, getAuthHeader, isAdmin } from "../utils/auth";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8082";

function JobOpenings() {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create"); // "create" or "edit"
    const [jobForm, setJobForm] = useState({
        id: null,
        title: "",
        location: "",
        description: "",
        companyName: "",
        experience: "0-2 Years",
        salaryRange: "",
        skillsRequired: "",
        jobType: "Full-time",
    });

    const userAuth = getAuth();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Search and Filter State
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCompany, setSelectedCompany] = useState("All");
    const [selectedSalary, setSelectedSalary] = useState("All");

    const loadJobs = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/api/jobs`, {
                headers: { "Content-Type": "application/json", ...getAuthHeader() },
            });

            if (!response.ok) throw new Error("Unable to fetch jobs");
            const data = await response.json();
            setJobs(data.sort((a, b) => b.id - a.id));
        } catch (error) {
            toast.error("Failed to load jobs");
        } finally {
            setLoading(false);
        }
    };

    // Derived Filtered Data
    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             (job.companyName && job.companyName.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesCompany = selectedCompany === "All" || job.companyName === selectedCompany;
        
        const matchesSalary = selectedSalary === "All" || (job.salaryRange && job.salaryRange.includes(selectedSalary));

        return matchesSearch && matchesCompany && matchesSalary;
    });

    const companies = ["All", ...new Set(jobs.map(j => j.companyName).filter(Boolean))];
    const salaries = ["All", "10-15 LPA", "15-20 LPA", "20-30 LPA", "30-50 LPA", "50+ LPA"];

    // Pagination Calculation
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

    useEffect(() => { loadJobs(); }, []);

    const handlehome = () => navigate("/HomeAfterLogin");
    const handleNotify = () => navigate("/NotifyStatus");
    const handleJobApplication = (job) => navigate("/JobApplication", { state: { domainName: job.title } });

    const handleInput = (event) => {
        const { name, value } = event.target;
        setJobForm((prev) => ({ ...prev, [name]: value }));
    };

    const openCreateModal = () => {
        setModalMode("create");
        setJobForm({ 
            id: null, title: "", location: "", description: "", 
            companyName: "", experience: "0-2 Years", salaryRange: "", 
            skillsRequired: "", jobType: "Full-time" 
        });
        setIsModalOpen(true);
    };

    const openEditModal = (job) => {
        setModalMode("edit");
        setJobForm({ 
            id: job.id, title: job.title, location: job.location, 
            description: job.description, companyName: job.companyName || "", 
            experience: job.experience || "0-2 Years", salaryRange: job.salaryRange || "", 
            skillsRequired: job.skillsRequired || "", jobType: job.jobType || "Full-time" 
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveJob = async (event) => {
        event.preventDefault();
        try {
            setIsSubmitting(true);
            const isEdit = modalMode === "edit";
            const url = isEdit ? `${API_BASE_URL}/api/jobs/${jobForm.id}` : `${API_BASE_URL}/api/jobs`;
            const method = isEdit ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json", ...getAuthHeader() },
                body: JSON.stringify({ ...jobForm, postedByEmail: userAuth.email }),
            });

            if (!response.ok) {
                const responseBody = await response.json().catch(() => ({}));
                throw new Error(responseBody.message || `Failed to ${isEdit ? 'update' : 'add'} job`);
            }

            toast.success(`Job ${isEdit ? 'updated' : 'added'} successfully`);
            closeModal();
            loadJobs();
        } catch (error) {
            toast.error(error.message || "Operation failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteJob = async (id) => {
        if (!window.confirm("Are you sure you want to delete this job?")) return;
        try {
            const response = await fetch(`${API_BASE_URL}/api/jobs/${id}`, {
                method: "DELETE",
                headers: { ...getAuthHeader() },
            });
            if (!response.ok) throw new Error("Failed to delete job");
            toast.success("Job deleted successfully");
            loadJobs();
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans pb-12 relative">
            <motion.header 
                initial={{ y: -50, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                className="flex flex-col md:flex-row items-center justify-between p-6 bg-white dark:bg-gray-800 shadow-md sticky top-0 z-30 font-sans"
            >
                <div className="flex items-center space-x-3 cursor-pointer group mb-4 md:mb-0" onClick={handlehome}>
                    <div className="w-10 h-10 bg-gradient-to-r from-brand-ocean to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                        <span className="text-white font-bold text-xl">W</span>
                    </div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-ocean to-purple-600">Work Folio</h2>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <span className="px-4 py-1.5 bg-blue-100 text-brand-ocean dark:bg-gray-700 dark:text-blue-300 rounded-full font-bold text-sm">
                        {userAuth?.role} Account
                    </span>
                    <button onClick={handlehome} className="px-5 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold rounded-xl transition-colors">
                        Dashboard
                    </button>
                </div>
            </motion.header>

            <main className="container mx-auto px-6 pt-12 max-w-7xl">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col mb-12 space-y-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="max-w-xl w-full">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white">Job Library</h1>
                            <p className="mt-4 text-gray-500 dark:text-gray-400 text-lg">Manage and explore platform-wide job listings.</p>
                        </div>
                        {(isAdmin() || userAuth?.role === 'RECRUITER') && (
                            <button onClick={openCreateModal} className="px-8 py-4 bg-brand-ocean text-white font-bold rounded-xl shadow-xl hover:scale-105 transition-transform active:scale-95">
                                + Post New Job
                            </button>
                        )}
                    </div>

                    {/* Filters Bar */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="relative group">
                            <input 
                                type="text"
                                placeholder="Search by Title or Company..."
                                value={searchTerm}
                                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-700 rounded-2xl border-2 border-transparent focus:border-brand-ocean transition-all outline-none dark:text-white"
                            />
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-brand-ocean transition-colors">🔍</span>
                        </div>

                        <div className="relative">
                            <select 
                                value={selectedCompany}
                                onChange={(e) => { setSelectedCompany(e.target.value); setCurrentPage(1); }}
                                className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-700 rounded-2xl border-2 border-transparent focus:border-brand-ocean appearance-none transition-all outline-none dark:text-white font-semibold"
                            >
                                {companies.map(c => <option key={c} value={c}>{c === "All" ? "🏢 All Companies" : c}</option>)}
                            </select>
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</span>
                        </div>

                        <div className="relative">
                            <select 
                                value={selectedSalary}
                                onChange={(e) => { setSelectedSalary(e.target.value); setCurrentPage(1); }}
                                className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-700 rounded-2xl border-2 border-transparent focus:border-brand-ocean appearance-none transition-all outline-none dark:text-white font-semibold"
                            >
                                {salaries.map(s => <option key={s} value={s}>{s === "All" ? "💰 All Packages" : s}</option>)}
                            </select>
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</span>
                        </div>
                    </div>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand-ocean"></div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {currentJobs.map((job, index) => (
                                <motion.div key={job.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col hover:shadow-2xl transition">
                                    <div className="p-8 space-y-4 flex-1">
                                        <div className="flex justify-between items-start">
                                            <div className="text-brand-ocean font-black text-xs uppercase tracking-tighter">{job.companyName || "Work Folio Partner"}</div>
                                            {(isAdmin() || (userAuth?.role === 'RECRUITER' && job.postedByEmail === userAuth.email)) && (
                                                <div className="flex space-x-1">
                                                    <button onClick={() => openEditModal(job)} className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-blue-50 transition-colors">✏️</button>
                                                    <button onClick={() => handleDeleteJob(job.id)} className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-red-50 transition-colors">🗑️</button>
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{job.title}</h3>
                                        <div className="flex items-center text-sm font-semibold text-gray-500 space-x-3">
                                            <span>📍 {job.location}</span>
                                            <span>🕒 {job.jobType || "Full-time"}</span>
                                        </div>
                                        <p className="text-gray-500 h-12 overflow-hidden">{job.description}</p>
                                        <div className="pt-4 flex items-center justify-between">
                                            <span className="text-brand-ocean font-bold">{job.salaryRange || "Competitive"}</span>
                                            <button onClick={() => navigate("/JobDetails", { state: { job } })} className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white font-bold rounded-lg text-sm transition font-sans">Details</button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center mt-12 space-x-2">
                                <button 
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(p => p - 1)}
                                    className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                                >
                                    ◀
                                </button>
                                {[...Array(totalPages)].map((_, i) => (
                                    <button 
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`w-10 h-10 rounded-xl font-bold transition-all ${
                                            currentPage === i + 1 
                                            ? 'bg-brand-ocean text-white shadow-lg' 
                                            : 'bg-white dark:bg-gray-800 text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-brand-ocean'
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button 
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(p => p + 1)}
                                    className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                                >
                                    ▶
                                </button>
                            </div>
                        )}
                    </>
                )}
            </main>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 overflow-y-auto">
                        <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-3xl p-8 w-full max-w-3xl border border-gray-200 shadow-2xl my-8">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-3xl font-black text-gray-800 dark:text-white">{modalMode === 'edit' ? 'Edit Posting' : 'Publish Job'}</h2>
                                <button onClick={closeModal} className="text-3xl text-gray-400 hover:text-red-500">&times;</button>
                            </div>
                            <form onSubmit={handleSaveJob} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 select-none pointer-events-none">Job Title</label>
                                    <input name="title" required value={jobForm.title} onChange={handleInput} className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl focus:ring-2 focus:ring-brand-ocean border border-transparent focus:border-brand-ocean outline-none dark:text-white transition-all shadow-sm" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 select-none pointer-events-none">Company Name</label>
                                    <input name="companyName" required value={jobForm.companyName} onChange={handleInput} className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl focus:ring-2 focus:ring-brand-ocean border border-transparent focus:border-brand-ocean outline-none dark:text-white transition-all shadow-sm" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 select-none pointer-events-none">Location</label>
                                    <input name="location" required value={jobForm.location} onChange={handleInput} className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl focus:ring-2 focus:ring-brand-ocean border border-transparent focus:border-brand-ocean outline-none dark:text-white transition-all shadow-sm" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 select-none pointer-events-none">Experience</label>
                                    <select name="experience" value={jobForm.experience} onChange={handleInput} className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl focus:ring-2 focus:ring-brand-ocean border border-transparent focus:border-brand-ocean outline-none dark:text-white transition-all shadow-sm">
                                        <option>0-2 Years</option><option>3-5 Years</option><option>5+ Years</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 select-none pointer-events-none">Salary Range</label>
                                    <input name="salaryRange" value={jobForm.salaryRange} onChange={handleInput} placeholder="e.g. 15-20 LPA" className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl focus:ring-2 focus:ring-brand-ocean border border-transparent focus:border-brand-ocean outline-none dark:text-white transition-all shadow-sm" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 select-none pointer-events-none">Job Type</label>
                                    <select name="jobType" value={jobForm.jobType} onChange={handleInput} className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl focus:ring-2 focus:ring-brand-ocean border border-transparent focus:border-brand-ocean outline-none dark:text-white transition-all shadow-sm">
                                        <option>Full-time</option><option>Part-time</option><option>Remote</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 select-none pointer-events-none">Skills Required</label>
                                    <input name="skillsRequired" value={jobForm.skillsRequired} onChange={handleInput} placeholder="Java, Spring Boot, React..." className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl focus:ring-2 focus:ring-brand-ocean border border-transparent focus:border-brand-ocean outline-none dark:text-white transition-all shadow-sm" />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 select-none pointer-events-none">Job Description</label>
                                    <textarea name="description" rows={4} required value={jobForm.description} onChange={handleInput} className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl focus:ring-2 focus:ring-brand-ocean border border-transparent focus:border-brand-ocean outline-none dark:text-white shadow-inner transition-all" />
                                </div>
                                <div className="md:col-span-2 flex justify-end gap-4 mt-8">
                                    <button type="button" onClick={closeModal} className="px-8 py-4 text-gray-400 font-bold hover:text-gray-800 transition">Cancel</button>
                                    <button type="submit" disabled={isSubmitting} className="px-12 py-4 bg-brand-ocean text-white font-black rounded-xl shadow-xl shadow-brand-ocean/20 hover:scale-[1.03] transition active:scale-95 disabled:opacity-50">
                                        {isSubmitting ? "Processing..." : "Publish Job"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default JobOpenings;
