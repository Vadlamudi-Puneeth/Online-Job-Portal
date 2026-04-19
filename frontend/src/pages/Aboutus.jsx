import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const students = [
    { name: "Puneeth Vadlamudi", company: "TechCorp", package: "10LPA", role: "Software Engineer", image: "https://i.pravatar.cc/150?u=puneeth" },
    { name: "Ankit Raj", company: "DevSolution", package: "11LPA", role: "Backend Developer", image: "https://i.pravatar.cc/150?u=ankit" },
    { name: "Nimal Dinesh", company: "CodeWorks", package: "12LPA", role: "Frontend Dev", image: "https://i.pravatar.cc/150?u=nimal" },
    { name: "Pranav Sahu", company: "InnovateX", package: "12LPA", role: "Product Manager", image: "https://i.pravatar.cc/150?u=pranav" },
    { name: "Mohan Vamsi Perni", company: "FutureTech", package: "11LPA", role: "Data Scientist", image: "https://i.pravatar.cc/150?u=mohan" },
    { name: "Satya Suriya Kumari", company: "WebWorks", package: "10LPA", role: "UX Designer", image: "https://i.pravatar.cc/150?u=satya" },
];

const Aboutus = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500 font-sans">
            <Navbar />

            <main className="pt-32">
                {/* Hero Section */}
                <section className="py-20 px-6">
                    <div className="container mx-auto text-center max-w-5xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <span className="text-xs font-black uppercase tracking-[0.4em] text-brand-ocean bg-blue-50 dark:bg-blue-900/40 px-6 py-2 rounded-full mb-8 inline-block">
                                Bridging the Gap
                            </span>
                            <h1 className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter leading-none">
                                Empowering <span className="text-brand-ocean">Careers</span> <br className="hidden md:block" /> with Modern Solutions.
                            </h1>
                            <p className="text-xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-3xl mx-auto">
                                Work Folio is an industry-leading platform designed to simplify the hiring lifecycle. 
                                We provide elite tools for recruiters and a growth-focused environment for job seekers.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-32 bg-gray-50 dark:bg-gray-800/50">
                    <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="space-y-12"
                        >
                            <div className="group">
                                <div className="w-16 h-1 bg-brand-ocean mb-8 group-hover:w-32 transition-all duration-500"></div>
                                <h3 className="text-3xl font-black dark:text-white mb-6">Our Mission</h3>
                                <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                                    To revolutionize the recruitment process through transparency and technology. 
                                    We aim to make career advancement accessible to every motivated professional.
                                </p>
                            </div>
                            <div className="p-10 bg-white dark:bg-gray-800 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-gray-700">
                                <div className="text-4xl mb-6">🎯</div>
                                <h4 className="text-xl font-bold dark:text-white mb-4">Focus on Quality</h4>
                                <p className="text-gray-500 dark:text-gray-400 font-medium">
                                    We don't just list jobs; we curate opportunities that match your specific skillset and career trajectory.
                                </p>
                            </div>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="relative"
                        >
                            <div className="absolute -inset-4 bg-brand-ocean/20 blur-[100px] rounded-full"></div>
                            <img 
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1500" 
                                className="relative rounded-[4rem] shadow-2xl border-8 border-white dark:border-gray-800"
                                alt="Modern Workspace"
                            />
                        </motion.div>
                    </div>
                </section>

                {/* Statistics / Impact */}
                <section className="py-32">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                            {[
                                { label: 'Platform Users', val: '50K+' },
                                { label: 'Jobs Posted', val: '12K+' },
                                { label: 'Partner Firms', val: '2.5K' },
                                { label: 'Growth rate', val: '150%' }
                            ].map((stat, i) => (
                                <div key={i}>
                                    <div className="text-5xl font-black text-brand-ocean mb-2">{stat.val}</div>
                                    <div className="text-xs font-black uppercase tracking-widest text-gray-400">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Success Stories */}
                <section className="py-32 bg-gray-900 text-white overflow-hidden">
                    <div className="container mx-auto px-6 mb-20 text-center">
                        <h2 className="text-5xl font-black mb-6">Success Stories</h2>
                        <p className="opacity-60 font-medium max-w-2xl mx-auto italic">Meet the brilliant minds who transformed their future with Work Folio assistance.</p>
                    </div>

                    <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {students.map((student, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/10 backdrop-blur-md p-10 rounded-[3rem] border border-white/10 hover:bg-white/20 transition-all group"
                            >
                                <img src={student.image} className="w-20 h-20 rounded-2xl mb-8 group-hover:scale-110 transition-transform shadow-2xl" alt={student.name} />
                                <h4 className="text-2xl font-black mb-2">{student.name}</h4>
                                <div className="text-brand-ocean font-bold text-sm mb-6 pb-6 border-b border-white/10 uppercase tracking-widest">{student.role} @ {student.company}</div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-black text-white/50 uppercase tracking-widest">CTC Package</span>
                                    <span className="text-xl font-black text-brand-ocean">{student.package}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Aboutus;