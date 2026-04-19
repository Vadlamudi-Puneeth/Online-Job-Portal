import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 pt-24 pb-12 transition-all duration-500 font-sans">
            <div className="container mx-auto px-8 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                    <div className="space-y-8">
                        <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => navigate("/")}>
                            <div className="w-12 h-12 bg-gradient-to-br from-brand-ocean to-purple-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:rotate-6 transition-transform">
                                <span className="text-white font-black text-2xl">W</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-gray-800 dark:text-white leading-tight">Work Folio</h2>
                                <p className="text-[10px] font-black text-brand-ocean uppercase tracking-[0.2em]">NextGen Careers</p>
                            </div>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed pr-4">
                            Pioneering the future of professional matching. We empower the next generation of global talent through data-driven insights.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400 dark:text-gray-600">Ecosystem</h4>
                        <ul className="space-y-4">
                            <li><button onClick={() => navigate("/JobOpenings")} className="text-gray-600 dark:text-gray-300 hover:text-brand-ocean dark:hover:text-white transition-all font-bold text-sm">Job Library</button></li>
                            <li><button onClick={() => navigate("/MockTest")} className="text-gray-600 dark:text-gray-300 hover:text-brand-ocean dark:hover:text-white transition-all font-bold text-sm">Skill Assessments</button></li>
                            <li><button onClick={() => navigate("/HomeAfterLogin")} className="text-gray-600 dark:text-gray-300 hover:text-brand-ocean dark:hover:text-white transition-all font-bold text-sm">Dashboard</button></li>
                        </ul>
                    </div>

                    <div className="space-y-8">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400 dark:text-gray-600">Company</h4>
                        <ul className="space-y-4">
                            <li><button onClick={() => navigate("/Aboutus")} className="text-gray-600 dark:text-gray-300 hover:text-brand-ocean dark:hover:text-white transition-all font-bold text-sm">Our Journey</button></li>
                            <li><button onClick={() => navigate("/TermsAndConditions")} className="text-gray-600 dark:text-gray-300 hover:text-brand-ocean dark:hover:text-white transition-all font-bold text-sm">Privacy & Terms</button></li>
                            <li><button onClick={() => navigate("/Contactus")} className="text-gray-600 dark:text-gray-300 hover:text-brand-ocean dark:hover:text-white transition-all font-bold text-sm">Contact Support</button></li>
                        </ul>
                    </div>

                    <div className="space-y-8">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400 dark:text-gray-600">Stay Connected</h4>
                        <p className="text-gray-500 dark:text-gray-400 text-xs font-bold leading-relaxed">Join 50,000+ professionals discovering their potential today.</p>
                        <div className="flex bg-gray-50 dark:bg-gray-900 p-2 rounded-2xl items-center border border-gray-100 dark:border-gray-800 group focus-within:ring-2 ring-brand-ocean ring-offset-2 dark:ring-offset-gray-950 transition-all">
                            <input type="email" placeholder="Join the newsletter" className="bg-transparent border-none focus:ring-0 text-xs font-bold flex-1 px-4 dark:text-white placeholder:text-gray-400" />
                            <button className="bg-gray-800 dark:bg-brand-ocean text-white p-3 px-6 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:scale-105 transition-transform">Inscribe</button>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                        <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest">&copy; 2026 Work Folio Global. HQ: Silicon Valley</p>
                        <div className="hidden md:block w-1.5 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                        <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest">Build 0.9.4-BETA</p>
                    </div>
                    <div className="flex space-x-4">
                        {['twitter', 'facebook', 'linkedin', 'github'].map(social => (
                            <button key={social} className="group relative">
                                <div className="absolute inset-0 bg-brand-ocean/10 rounded-xl blur-md group-hover:blur-lg transition-all opacity-0 group-hover:opacity-100"></div>
                                <div className="relative w-11 h-11 bg-white dark:bg-gray-900 rounded-xl flex items-center justify-center border border-gray-100 dark:border-gray-800 shadow-sm group-hover:-translate-y-1 transition-all">
                                    <img src={`https://cdn-icons-png.flaticon.com/512/889/${social === 'twitter' ? '889147' : social === 'facebook' ? '889102' : social === 'linkedin' ? '889109' : '889111'}.png`} className="w-5 h-5 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" alt={social} />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
