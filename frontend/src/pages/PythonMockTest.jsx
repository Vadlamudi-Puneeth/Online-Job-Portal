import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function PythonMockTest() {
  const navigate = useNavigate();
  const allQuestions = [
    { question: "What is the output of 10 // 3?", options: ["3", "3.33", "2", "1"], answer: "3" },
    { question: "Which keyword is used to define a function in Python?", options: ["function", "def", "func", "define"], answer: "def" },
    { question: "Who developed Python Programming Language?", options: ["Wick van Rossum","Rasmus Lerdorf","Guido van Rossum","Niene Stom"] , answer: "Guido van Rossum" },
    { question: "Which type of Programming does Python support?", options: ["object-oriented programming","structured programming","functional programming","all of the mentioned"], answer:"all of the mentioned" },
    { question: "Is Python case sensitive when dealing with identifiers?", options: ["no","yes","machine dependent","none of the mentioned"], answer:"yes" },
    { question: "Which of the following is the correct extension of the Python file?", options: [".python",".pl",".py",".p"], answer:".py" },
    { question: "Is Python code compiled or interpreted?", options: ["Python code is both compiled and interpreted","Python code is neither compiled nor interpreted","Python code is only compiled","Python code is only interpreted"], answer:"Python code is both compiled and interpreted" },
    { question: "All keywords in Python are in _________", options: ["Capitalized","lower case","UPPER CASE","None of the mentioned"], answer:"None of the mentioned" },
    { question: "Which of the following is used to define a block of code in Python language?", options: ["Indentation","Key","Brackets","All of the mentioned"], answer:"" },
    { question: "Which keyword is used for function in Python language?", options: ["Function","def","Fun","Define"], answer:"def" },
    { question: "Which of the following character is used to give single-line comments in Python?", options: ["//","#","!","/*"], answer:"#" },
    { question: "Which of the following functions can help us to find the version of python that we are currently working on?", options: ["sys.version(1)","sys.version(0)","sys.version()","sys.version"], answer: "sys.version" },
    { question: " Python supports the creation of anonymous functions at runtime, using a construct called __________", options: ["pi","anonymous","lambda","none of mentioned"], answer: "lambda" },
    { question: "What is the order of precedence in python?", options: ["Exponential, Parentheses, Multiplication, Division, Addition, Subtraction","Exponential, Parentheses, Division, Multiplication, Addition, Subtraction","Parentheses, Exponential, Multiplication, Addition, Division, Subtraction","Parentheses, Exponential, Multiplication, Division, Addition, Subtraction"], answer: "Parentheses, Exponential, Multiplication, Division, Addition, Subtraction" },
    { question: "What will be the output of the following Python code snippet if x=1? snipped= 'x<<2'", options: ["4","2","1","8"], answer: "4" }
  ];

  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState(Array(10).fill(""));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, 10);
    setSelectedQuestions(shuffledQuestions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAnswerChange = (index, answer) => {
    if (submitted) return;
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = answer;
    setUserAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    const unanswered = userAnswers.filter((a) => a === "").length;
    if (unanswered > 0 && !window.confirm(`You have ${unanswered} unanswered questions. Submit anyway?`)) {
      return;
    }
    
    let currentScore = 0;
    selectedQuestions.forEach((question, index) => {
      if (userAnswers[index] === question.answer) {
        currentScore += 1;
      }
    });
    setScore(currentScore);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans pb-12">
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
            <button onClick={() => navigate("/MockTest")} className="px-5 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold rounded-lg transition-colors shadow">
                Back to Tests
            </button>
        </motion.header>

        <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-4">Python Mock Test 🐍</h1>
                <p className="text-lg text-gray-500 dark:text-gray-400">Test your knowledge with these 10 randomly selected questions.</p>
            </motion.div>

            <AnimatePresence>
                {submitted && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20, scale: 0.9 }} 
                        animate={{ opacity: 1, y: 0, scale: 1 }} 
                        className="mb-10 p-8 rounded-2xl shadow-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-center"
                    >
                        <h2 className="text-3xl font-bold mb-2">Test Completed!</h2>
                        <p className="text-xl mb-4">You scored <span className="font-black text-4xl">{score}</span> out of 10</p>
                        <button onClick={() => window.location.reload()} className="px-6 py-3 bg-white text-purple-600 font-bold rounded-full shadow hover:bg-gray-100 transition-colors">
                            Retake Test
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="space-y-6">
                {selectedQuestions.map((q, qIndex) => (
                    <motion.div 
                        key={qIndex} 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: qIndex * 0.1 }}
                        className={`bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-2 transition-colors ${
                            submitted 
                                ? userAnswers[qIndex] === q.answer 
                                    ? "border-green-500 shadow-green-500/20" 
                                    : "border-red-500 shadow-red-500/20"
                                : "border-transparent"
                        }`}
                    >
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                            <span className="text-brand-ocean mr-2">{qIndex + 1}.</span> 
                            {q.question}
                        </h3>
                        <div className="space-y-4">
                            {q.options.map((option, oIndex) => {
                                const isSelected = userAnswers[qIndex] === option;
                                const isCorrect = option === q.answer;
                                let optionClass = "border-gray-200 dark:border-gray-700 hover:border-brand-ocean dark:hover:border-blue-400 bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300";
                                
                                if (submitted) {
                                    if (isCorrect) optionClass = "border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-bold";
                                    else if (isSelected) optionClass = "border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300";
                                } else if (isSelected) {
                                    optionClass = "border-brand-ocean bg-blue-50 dark:bg-blue-900/30 text-brand-ocean dark:text-blue-300 ring-2 ring-brand-ocean/50";
                                }

                                return (
                                    <div 
                                        key={oIndex} 
                                        onClick={() => handleAnswerChange(qIndex, option)}
                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center space-x-4 ${optionClass}`}
                                    >
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                            isSelected 
                                                ? (submitted ? (isCorrect ? 'border-green-500 bg-green-500' : 'border-red-500 bg-red-500') : 'border-brand-ocean bg-brand-ocean') 
                                                : 'border-gray-300 dark:border-gray-500'
                                        }`}>
                                            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                                        </div>
                                        <span className="text-[1.05rem]">{option}</span>
                                    </div>
                                );
                            })}
                        </div>
                        {submitted && userAnswers[qIndex] !== q.answer && (
                            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <span className="font-bold text-green-600 dark:text-green-400 mr-2">Correct Answer:</span>
                                    {q.answer || "N/A"}
                                </p>
                            </div>
                        )}
                    </motion.div>
                ))}
                
                {!submitted && selectedQuestions.length > 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center mt-12 pb-12">
                        <button 
                            onClick={handleSubmit} 
                            className="px-12 py-4 bg-brand-ocean hover:bg-blue-700 text-white text-xl font-bold rounded-full shadow-2xl transition-transform hover:scale-105"
                        >
                            Submit Test
                        </button>
                    </motion.div>
                )}
            </div>
        </main>
    </div>
  );
}

export default PythonMockTest;
