import React from 'react';
import { motion } from 'framer-motion';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500 font-sans">
      <Navbar />

      <main className="pt-40 pb-32">
        <div className="container mx-auto px-6 max-w-5xl">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 dark:bg-gray-800/80 rounded-[4rem] p-12 md:p-20 shadow-2xl relative overflow-hidden"
            >
                {/* Decorative Element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-ocean/10 blur-[100px] rounded-full -mr-32 -mt-32"></div>

                <div className="text-center mb-20 relative">
                    <span className="text-xs font-black uppercase tracking-[0.4em] text-brand-ocean mb-4 inline-block">Work Folio Policy</span>
                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter">Terms of <span className="text-brand-ocean">Service</span></h1>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-sm italic">Effective Date: April 19, 2026</p>
                </div>

                <div className="space-y-16">
                    <section className="group">
                        <div className="flex items-start gap-8">
                            <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-3xl shadow-xl flex items-center justify-center shrink-0 group-hover:bg-brand-ocean group-hover:text-white transition-all duration-300">
                                <span className="text-2xl font-black">01</span>
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">User Agreement</h2>
                                <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                                    By accessing Work Folio, you legally agree to be governed by these terms. This platform is provided for 
                                    lawful career-related activities only. Unauthorized use or data scraping is strictly prohibited and subject 
                                    to legal action under local and international laws.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="group">
                        <div className="flex items-start gap-8">
                            <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-3xl shadow-xl flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                                <span className="text-2xl font-black">02</span>
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Privacy & Data Residency</h2>
                                <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                                    We implement military-grade encryption for all user profiles and resumes. Your data is stored on secure 
                                    cloud servers and is only shared with recruiters you explicitly interact with.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                    {['Transparent data collection', 'Right to access & port data', 'Advanced file security', 'Zero third-party selling'].map(item => (
                                        <div key={item} className="flex items-center space-x-3 p-4 bg-white/50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-gray-700">
                                            <span className="text-brand-ocean">✓</span>
                                            <span className="text-sm font-bold dark:text-white/80">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="group">
                        <div className="flex items-start gap-8">
                            <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-3xl shadow-xl flex items-center justify-center shrink-0 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
                                <span className="text-2xl font-black">03</span>
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Code of Conduct</h2>
                                <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                                    Users are expected to maintain professional integrity. False credentials, harassment, or misuse of 
                                    applicant information will result in immediate and permanent account suspension without prior notice.
                                </p>
                            </div>
                        </div>
                    </section>

                    <div className="pt-20 border-t border-gray-200 dark:border-gray-700 text-center space-y-8">
                        <p className="text-xl font-black text-gray-900 dark:text-white">Have questions about our legal framework?</p>
                        <button 
                            onClick={() => window.location.href='/Contactus'}
                            className="px-12 py-5 bg-brand-ocean text-white font-black rounded-3xl shadow-2xl hover:scale-105 active:scale-95 transition-all text-lg"
                        >
                            Speak to Our Legal Team
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;
