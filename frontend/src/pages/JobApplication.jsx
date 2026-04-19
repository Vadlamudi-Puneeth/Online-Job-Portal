import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { getAuth, getAuthHeader, isAuthenticated } from "../utils/auth";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8082";

function JobApplication() {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = getAuth();

    const [redirect, setRedirect] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/Login");
        }
    }, [navigate]);

    const [formData, setFormData] = useState({
        firstname: auth?.username || '',
        email: auth?.email || '',
        domainName: location.state?.domainName || '',
        cvFileName: '',
        cvFile: '',
        coverLetter: '',
        // Keep other fields with defaults to avoid null errors in backend if validation is strict
        lastname: '-', fathername: '-', contact: '-', course: '-', university: '-',
        passoutyear: 2024, marks: 0.0, country: '-', state: '-', district: '-',
        city: '-', pincode: '000000', skill1: '-', skill1Level: 'Basic'
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, cvFileName: file.name, cvFile: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!formData.cvFile) return toast.error("Please upload your resume.");
        
        setSubmitting(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/jobapplication`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to submit application');
            }
            toast.success("Application submitted successfully!");
            setRedirect(true);
        } catch (error) {
            toast.error(error.message || "Failed to submit. Try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (redirect) return <Navigate to="/HomeAfterLogin" />;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-6 font-sans">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 dark:border-gray-700">
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-black text-gray-800 dark:text-white">Apply for Job</h1>
                        <p className="text-brand-ocean font-bold">{formData.domainName}</p>
                    </div>
                    <button onClick={() => navigate(-1)} className="text-gray-400 font-bold hover:text-gray-600 transition">Cancel</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-4">
                        <label className="block text-sm font-black uppercase tracking-widest text-gray-400">Upload Resume</label>
                        <div className="relative border-4 border-dashed border-gray-100 dark:border-gray-700 rounded-2xl p-8 text-center hover:border-brand-ocean transition group cursor-pointer">
                            <input 
                                type="file" 
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                required
                            />
                            <div className="space-y-2">
                                <span className="text-4xl">📄</span>
                                <p className="text-gray-500 font-medium">
                                    {formData.cvFileName ? `Selected: ${formData.cvFileName}` : 'Drag and drop your CV or click to browse'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-black uppercase tracking-widest text-gray-400">Cover Letter</label>
                        <textarea 
                            rows={6} 
                            placeholder="Tell us why you are a great fit..."
                            className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-2xl border-none focus:ring-2 focus:ring-brand-ocean dark:text-white shadow-inner"
                            value={formData.coverLetter}
                            onChange={(e) => setFormData({...formData, coverLetter: e.target.value})}
                        />
                    </div>

                    <button 
                        disabled={submitting}
                        className="w-full py-5 bg-brand-ocean text-white font-black text-xl rounded-2xl shadow-xl hover:bg-blue-700 transition transform hover:-translate-y-1 active:scale-95 disabled:opacity-50"
                    >
                        {submitting ? "Submitting..." : "Submit Application"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}

export default JobApplication;
