import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function MockTest() {
    const navigate = useNavigate();

    const mockTests = [
        { title: "Python", action: () => navigate("/PythonMockTest"), color: "from-blue-400 to-blue-600", icon: "🐍" },
        { title: "C Programming", action: () => navigate("/CMockTest"), color: "from-indigo-400 to-indigo-600", icon: "⚙️" },
        { title: "C++", action: () => navigate("/CppMockTest"), color: "from-purple-400 to-purple-600", icon: "⚡" },
        { title: "Java", action: () => navigate("/JavaMockTest"), color: "from-red-400 to-red-600", icon: "☕" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans pb-12 relative overflow-hidden">
            {/* Header */}
            <motion.header 
                initial={{ y: -50, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40 transition-colors"
            >
                <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => navigate("/HomeAfterLogin")}>
                    <div className="w-10 h-10 bg-gradient-to-r from-brand-ocean to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                        <span className="text-white font-bold text-xl">W</span>
                    </div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-ocean to-purple-600">Work Folio</h2>
                </div>
                <button onClick={() => navigate("/HomeAfterLogin")} className="px-5 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold rounded-lg transition-colors shadow">
                    Back to Dashboard
                </button>
            </motion.header>

            <main className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold text-gray-800 dark:text-white leading-tight">Mock Programming <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-ocean to-purple-600">MCQ Tests</span></h1>
                    <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Enhance your programming skills with our expertly designed mock tests. Choose your preferred language and begin your journey towards coding excellence.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {mockTests.map((test, index) => (
                        <motion.div
                            key={test.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            onClick={test.action}
                            className={`cursor-pointer rounded-2xl shadow-xl hover:shadow-2xl overflow-hidden transform hover:-translate-y-2 transition-all bg-gradient-to-br ${test.color}`}
                        >
                            <div className="p-8 flex flex-col items-center text-white h-full justify-center">
                                <span className="text-5xl mb-4">{test.icon}</span>
                                <h3 className="text-2xl font-bold text-center">{test.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 30 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-20 bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-2xl border border-gray-100 dark:border-gray-700"
                >
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">Why Choose Workfolio Mock Tests?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            "Comprehensive MCQs covering multiple programming languages.",
                            "Real-time feedback and detailed explanations.",
                            "Perfect for interview preparation and skill enhancement.",
                            "Designed for all skill levels: beginner to advanced."
                        ].map((feature, i) => (
                            <div key={i} className="flex items-start space-x-3">
                                <div className="p-2 bg-brand-ocean/10 dark:bg-brand-ocean/20 rounded-lg text-brand-ocean dark:text-blue-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed">{feature}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <footer className="mt-16 text-center">
                    <p className="text-xl italic text-gray-500 dark:text-gray-400 opacity-80 decoration-brand-ocean">
                        "Code is like humor. When you have to explain it, it’s bad." <br />
                        <span className="text-sm font-semibold mt-2 block not-italic">— Cory House</span>
                    </p>
                </footer>
            </main>
        </div>
    );
}

export default MockTest;
