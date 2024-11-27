import React, { useState, useEffect } from "react";
import "./pythonmocktest.css";

function PythonMockTest() {
  const allQuestions = [
    {
      question: "What is the output of 10 // 3?",
      options: ["3", "3.33", "2", "1"],
      answer: "3",
    },
    {
      question: "Which keyword is used to define a function in Python?",
      options: ["function", "def", "func", "define"],
      answer: "def",
    },
    {
        question: "Who developed Python Programming Language?",
        options: ["Wick van Rossum","Rasmus Lerdorf","Guido van Rossum","Niene Stom"] ,
        answer: "Guido van Rossum",
    },
    {   
        question: "Which type of Programming does Python support?",
        options: ["object-oriented programming","structured programming","functional programming","all of the mentioned"],
        answer:"all of the mentioned",
    },
    {   
        question: "Is Python case sensitive when dealing with identifiers?",
        options: ["no","yes","machine dependent","none of the mentioned"],
        answer:"yes",
    },
    {   
        question: "Which of the following is the correct extension of the Python file?",
        options: [".python",".pl",".py",".p"],
        answer:".py",
    },
    {   
        question: "Is Python code compiled or interpreted?",
        options: ["Python code is both compiled and interpreted","Python code is neither compiled nor interpreted","Python code is only compiled","Python code is only interpreted"],
        answer:"Python code is both compiled and interpreted",
    },
    {   
        question: "All keywords in Python are in _________",
        options: ["Capitalized","lower case","UPPER CASE","None of the mentioned"],
        answer:"None of the mentioned",
    },
    {   
        question: "Which of the following is used to define a block of code in Python language?",
        options: ["Indentation","Key","Brackets","All of the mentioned"],
        answer:"",
    },
    {   
        question: "Which keyword is used for function in Python language?",
        options: ["Function","def","Fun","Define"],
        answer:"def",
    },
    {   
        question: "Which of the following character is used to give single-line comments in Python?",
        options: ["//","#","!","/*"],
        answer:"#",
    },
    {
        question: "Which of the following functions can help us to find the version of python that we are currently working on?",
        options: ["sys.version(1)","sys.version(0)","sys.version()","sys.version"],
        answer: "sys.version",
    },
    {
        question: " Python supports the creation of anonymous functions at runtime, using a construct called __________",
        options: ["pi","anonymous","lambda","none of mentioned"],
        answer: "lambda",
    },
    {
        question: "What is the order of precedence in python?",
        options: ["Exponential, Parentheses, Multiplication, Division, Addition, Subtraction","Exponential, Parentheses, Division, Multiplication, Addition, Subtraction","Parentheses, Exponential, Multiplication, Addition, Division, Subtraction","Parentheses, Exponential, Multiplication, Division, Addition, Subtraction"],
        answer: "Parentheses, Exponential, Multiplication, Division, Addition, Subtraction",
    },
    {
        question: "What will be the output of the following Python code snippet if x=1? snipped= 'x<<2'",
        options: ["4","2","1","8"],
        answer: "4",
    },
  ];

  const [selectedQuestions, setSelectedQuestions] = useState([]);
  useEffect(() => {
    const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, 10);
    setSelectedQuestions(shuffledQuestions);
  }, []);

  const [userAnswers, setUserAnswers] = useState(Array(10).fill(""));

  const handleAnswerChange = (index, answer) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = answer;
    setUserAnswers(updatedAnswers);
  };

  const calculateScore = () => {
    let score = 0;
    selectedQuestions.forEach((question, index) => {
      if (userAnswers[index] === question.answer) {
        score += 1;
      }
    });
    return score;
  };

  return (
    <div className="pmt-body">
      <h1 id="pmt-head">Python Mock Test</h1>
      <form>
        {selectedQuestions.map((question, index) => (
          <div key={index} className="question-container">
            <h3>{question.question}</h3>
            {question.options.map((option, i) => (
              <div key={i} className="option-container">
                <input
                  type="radio"
                  id={`q${index}a${i}`}
                  name={`q${index}`}
                  value={option}
                  checked={userAnswers[index] === option}
                  onChange={() => handleAnswerChange(index, option)}
                />
                <label htmlFor={`q${index}a${i}`}>{option}</label>
              </div>
            ))}
          </div>
        ))}
      </form>
      <button onClick={() => alert(`Your Score: ${calculateScore()}` + "\nIf you want to write again refresh the page")} id="submit-btn">Submit</button>
    </div>
  );
}

export default PythonMockTest;
