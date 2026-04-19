import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contactus = () => {
    const [formState, setFormState] = useState({ name: "", email: "", subject: "General Inquiry", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => setFormState({ ...formState, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast.success("Message received! Our team will respond within 24 hours.");
        setFormState({ name: "", email: "", subject: "General Inquiry", message: "" });
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500 font-sans">
            <Navbar />

            <main className="pt-40 pb-32">
                <div className="container mx-auto px-6">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-stretch">
                        
                        {/* Information Panel */}
                        <div className="w-full lg:w-5/12 space-y-12">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <span className="text-xs font-black uppercase tracking-[0.4em] text-brand-ocean bg-blue-50 dark:bg-blue-900/40 px-6 py-2 rounded-full mb-8 inline-block">
                                    Support Center
                                </span>
                                <h1 className="text-6xl md:text-7xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter leading-none">
                                    Get in <span className="text-brand-ocean underline decoration-4 underline-offset-8">Touch</span>.
                                </h1>
                                <p className="text-xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                                    Ready to accelerate your hiring process or scale your career? Our support specialists are standing by 24/7.
                                </p>
                            </motion.div>

                            <div className="space-y-10">
                                {[
                                    { title: 'Email Assistance', val: 'support@workfolio.com', color: 'bg-brand-ocean', icon: '✉️' },
                                    { title: 'Corporate HQ', val: '123 Tech Avenue, San Francisco', color: 'bg-purple-600', icon: '📍' },
                                    { title: 'Live Chat', val: 'Available 9AM - 6PM EST', color: 'bg-teal-500', icon: '💬' }
                                ].map((item, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + (i * 0.1) }}
                                        className="flex items-center space-x-6 p-2 group hover:translate-x-2 transition-transform cursor-pointer"
                                    >
                                        <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-3xl shadow-2xl ${item.color} text-white group-hover:rotate-12 transition-transform`}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">{item.title}</h4>
                                            <p className="text-lg font-black dark:text-white group-hover:text-brand-ocean transition-colors">{item.val}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Interactive Form Panel */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full lg:w-7/12 bg-gray-50 dark:bg-gray-800/50 p-12 md:p-16 rounded-[4rem] shadow-2xl border border-gray-100 dark:border-gray-700/50 relative overflow-hidden"
                        >
                            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Identification</label>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            required 
                                            value={formState.name}
                                            onChange={handleChange}
                                            placeholder="Your Full Name"
                                            className="w-full px-6 py-4 bg-white dark:bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-brand-ocean outline-none transition-all dark:text-white font-bold"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Electronic Mail</label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            required 
                                            value={formState.email}
                                            onChange={handleChange}
                                            placeholder="jane@example.com"
                                            className="w-full px-6 py-4 bg-white dark:bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-brand-ocean outline-none transition-all dark:text-white font-bold"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Inquiry Subject</label>
                                    <select 
                                        name="subject"
                                        value={formState.subject}
                                        onChange={handleChange}
                                        className="w-full px-6 py-4 bg-white dark:bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-brand-ocean outline-none transition-all dark:text-white font-bold appearance-none"
                                    >
                                        <option>General Inquiry</option>
                                        <option>Recruiter Verification</option>
                                        <option>Technical Support</option>
                                        <option>Billing Question</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Detailed Message</label>
                                    <textarea 
                                        name="message" 
                                        rows="6" 
                                        required 
                                        value={formState.message}
                                        onChange={handleChange}
                                        placeholder="Describe your request in detail..."
                                        className="w-full px-6 py-4 bg-white dark:bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-brand-ocean outline-none transition-all dark:text-white font-bold resize-none"
                                    ></textarea>
                                </div>
                                <button 
                                    disabled={isSubmitting}
                                    type="submit" 
                                    className="w-full py-6 bg-brand-ocean text-white font-black text-xl rounded-2xl shadow-2xl shadow-brand-ocean/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-4 group disabled:opacity-50"
                                >
                                    <span>{isSubmitting ? "Dispatching..." : "Transmit Message"}</span>
                                    {!isSubmitting && <span className="text-2xl group-hover:translate-x-2 transition-transform">↗</span>}
                                </button>
                            </form>
                            
                            {/* Accent Circle */}
                            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-brand-ocean/5 rounded-full blur-[80px]"></div>
                        </motion.div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Contactus;
