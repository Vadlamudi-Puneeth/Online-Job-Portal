import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAuth, getAuthHeader } from '../utils/auth';
import { toast } from 'react-toastify';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8082';

const Profile = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(getAuth());
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const [profile, setProfile] = useState({
        username: '',
        email: '',
        role: '',
        phoneNumber: '',
        cvFileName: '',
        cvFile: '',
        bio: 'Passionate professional looking for new opportunities in tech.',
        skills: ['React', 'Java', 'Spring Boot']
    });

    useEffect(() => {
        if (!auth) {
            navigate("/Login");
            return;
        }
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
                headers: getAuthHeader()
            });
            if (res.ok) {
                const data = await res.json();
                setProfile({
                    username: data.username,
                    email: data.email,
                    role: data.role,
                    phoneNumber: data.phoneNumber || '',
                    cvFileName: data.cvFileName || '',
                    cvFile: data.cvFile || '',
                    bio: 'Passionate professional looking for new opportunities in tech.',
                    skills: ['React', 'Java', 'Spring Boot']
                });
            }
        } catch (err) {
            toast.error("Failed to load profile data");
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error("File size too large (max 5MB)");
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            setProfile({ ...profile, cvFile: event.target.result, cvFileName: file.name });
            toast.info(`Resume "${file.name}" ready to save.`);
        };
        reader.readAsDataURL(file);
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/profile`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
                body: JSON.stringify({
                    username: profile.username,
                    phoneNumber: profile.phoneNumber,
                    cvFile: profile.cvFile,
                    cvFileName: profile.cvFileName
                })
            });

            if (res.ok) {
                toast.success("Profile updated successfully!");
                setIsEditing(false);
                fetchUserData();
            } else {
                toast.error("Failed to update profile");
            }
        } catch (err) {
            toast.error("An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const downloadCv = () => {
        if (!profile.cvFile) return;
        const link = document.createElement("a");
        link.href = profile.cvFile;
        link.download = profile.cvFileName || "resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans pb-12">
            <header className="p-6 bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => navigate("/HomeAfterLogin")}>
                        <div className="w-10 h-10 bg-brand-ocean rounded-lg flex items-center justify-center group-hover:rotate-6 transition-transform">
                            <span className="text-white font-bold text-xl">W</span>
                        </div>
                        <h2 className="text-2xl font-black text-brand-ocean">Work Folio</h2>
                    </div>
                    <button onClick={() => navigate("/HomeAfterLogin")} className="px-5 py-2 bg-gray-100 dark:bg-gray-700 dark:text-white font-bold rounded-xl hover:bg-gray-200 transition">Back</button>
                </div>
            </header>

            <main className="container mx-auto px-6 py-12 max-w-6xl">
                <div className="flex flex-col lg:flex-row gap-10">
                    
                    {/* Sidebar */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full lg:w-1/3 space-y-6"
                    >
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-gray-700 text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-brand-ocean to-purple-600 opacity-10"></div>
                            <div className="relative z-10">
                                <img 
                                    src={`https://ui-avatars.com/api/?name=${profile.username}&size=200&background=007BFF&color=fff&bold=true`} 
                                    className="w-32 h-32 rounded-[2rem] border-4 border-white dark:border-gray-700 shadow-2xl mx-auto mb-6"
                                    alt="Avatar"
                                />
                                <h2 className="text-2xl font-black dark:text-white capitalize">{profile.username || 'Loading...'}</h2>
                                <p className="text-brand-ocean font-bold uppercase tracking-widest text-[10px] bg-blue-50 dark:bg-blue-900/40 inline-block px-4 py-1 rounded-full mt-2">
                                    {profile.role.replace('_', ' ')}
                                </p>
                            </div>
                            
                            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700 grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-[10px] font-black text-gray-400 uppercase">Member Since</div>
                                    <div className="text-sm font-bold dark:text-white">April 2026</div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-black text-gray-400 uppercase">Verification</div>
                                    <div className="text-sm font-bold text-green-500">Verified</div>
                                </div>
                            </div>
                        </div>

                        {/* Resume Card */}
                        {profile.role === 'JOB_SEEKER' && (
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-gray-700">
                                <h3 className="text-xl font-black mb-6 dark:text-white">Professional <span className="text-brand-ocean">Resume</span></h3>
                                
                                {profile.cvFile ? (
                                    <div className="space-y-4">
                                        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl flex items-center space-x-4 border border-gray-100 dark:border-gray-600">
                                            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center text-xl font-black">PDF</div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold dark:text-white truncate">{profile.cvFileName}</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase">Ready to view</p>
                                            </div>
                                        </div>
                                        <button onClick={downloadCv} className="w-full py-4 bg-brand-ocean text-white font-black rounded-2xl shadow-xl shadow-brand-ocean/30 hover:bg-blue-700 transition active:scale-95">Download PDF</button>
                                        <label className="block w-full py-3 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl text-center text-gray-400 font-bold text-sm cursor-pointer hover:border-brand-ocean hover:text-brand-ocean transition-all">
                                            Replace Resume
                                            <input type="file" className="hidden" accept=".pdf" onChange={handleFileUpload} />
                                        </label>
                                    </div>
                                ) : (
                                    <div className="text-center py-6">
                                        <div className="text-4xl mb-4">📄</div>
                                        <p className="text-gray-400 text-sm mb-6 px-4">Upload your resume to stand out to recruiters instantly.</p>
                                        <label className="px-8 py-3 bg-brand-ocean text-white font-black rounded-xl cursor-pointer hover:bg-blue-700 transition">
                                            Upload Resume
                                            <input type="file" className="hidden" accept=".pdf" onChange={handleFileUpload} />
                                        </label>
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>

                    {/* Main Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex-1 space-y-8"
                    >
                        <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-[3.5rem] shadow-2xl border border-gray-100 dark:border-gray-700">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                                <h3 className="text-4xl font-black dark:text-white">Profile <span className="text-brand-ocean">Settings</span></h3>
                                <div className="flex space-x-3 w-full md:w-auto">
                                    {isEditing ? (
                                        <>
                                            <button onClick={() => setIsEditing(false)} className="flex-1 md:flex-none px-8 py-3 bg-gray-100 dark:bg-gray-700 dark:text-white font-bold rounded-xl outline-none">Cancel</button>
                                            <button 
                                                onClick={handleSave} 
                                                disabled={isLoading}
                                                className="flex-1 md:flex-none px-8 py-3 bg-green-500 text-white font-bold rounded-xl shadow-lg shadow-green-200 dark:shadow-none hover:bg-green-600 transition"
                                            >
                                                {isLoading ? 'Saving...' : 'Save Changes'}
                                            </button>
                                        </>
                                    ) : (
                                        <button onClick={() => setIsEditing(true)} className="w-full md:w-auto px-10 py-3 bg-brand-ocean text-white font-black rounded-xl shadow-xl shadow-brand-ocean/20 hover:bg-blue-700 transition outline-none">Edit Profile</button>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Full Name</label>
                                    <input 
                                        type="text" 
                                        disabled={!isEditing}
                                        value={profile.username}
                                        onChange={(e) => setProfile({...profile, username: e.target.value})}
                                        className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-brand-ocean rounded-2xl dark:text-white font-bold transition-all disabled:opacity-50"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
                                    <input 
                                        type="email" 
                                        disabled
                                        value={profile.email}
                                        className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border-2 border-transparent rounded-2xl dark:text-white font-bold opacity-50 cursor-not-allowed"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Phone Number</label>
                                    <input 
                                        type="text" 
                                        disabled={!isEditing}
                                        value={profile.phoneNumber}
                                        onChange={(e) => setProfile({...profile, phoneNumber: e.target.value})}
                                        placeholder="Enter your phone number"
                                        className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-brand-ocean rounded-2xl dark:text-white font-bold transition-all disabled:opacity-50"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Identity Role</label>
                                    <div className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 rounded-2xl dark:text-brand-ocean font-black flex items-center">
                                        <span className="w-2 h-2 bg-brand-ocean rounded-full mr-3"></span>
                                        {profile.role}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Professional Headline</label>
                                <textarea 
                                    rows="4"
                                    disabled={!isEditing}
                                    value={profile.bio}
                                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                                    className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-brand-ocean rounded-2xl dark:text-white font-medium transition-all disabled:opacity-50 resize-none h-32"
                                ></textarea>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-10 rounded-[3.5rem] shadow-2xl border border-gray-100 dark:border-gray-700">
                             <h3 className="text-2xl font-black mb-8 dark:text-white">Professional <span className="text-brand-ocean">Skillset</span></h3>
                             <div className="flex flex-wrap gap-3">
                                 {profile.skills.map((skill, i) => (
                                     <div key={i} className="px-5 py-3 bg-gray-50 dark:bg-gray-700/50 dark:text-white rounded-2xl font-bold border border-gray-100 dark:border-gray-600 flex items-center shadow-sm">
                                         {skill}
                                     </div>
                                 ))}
                                 <button className="px-5 py-3 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl text-gray-400 hover:border-brand-ocean hover:text-brand-ocean transition-all font-bold">+ Add Skills</button>
                             </div>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default Profile;
