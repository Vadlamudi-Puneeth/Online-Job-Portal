import React, { useState, useEffect } from "react";
import "./javamocktest.css";

function JavaMockTest() {
  const allQuestions = [
    {
      question: "Which one of the following is not an access modifier?",
      options: ["Public", "Private", "Protected", "Void"],
      answer: "Void",
    },
    {
      question: "All the variables of class should be ideally declared as?",
      options: ["private", "public", "protected", "default"],
      answer: "private",
    },
    {
        question: "Which of the following modifier means a particular variable cannot be accessed within the package?",
        options: ["private","public","protected","default"] ,
        answer: "private",
    },
    {   
        question: "How can a protected modifier be accessed?",
        options: ["accessible only within the class","accessible only within package","accessible within package and outside the package but through inheritance only","accessible by all"],
        answer:"Objects of class A can be instantiated only within the class where it is declared",
    },
    {   
        question: "What happens if constructor of class A is made private?",
        options: ["Any class can instantiate objects of class A","Objects of class A can be instantiated only within the class where it is declared","Inherited class can instantiate objects of class A","classes within the same package as class A can instantiate objects of class A"],
        answer:"Objects of class A can be instantiated only within the class where it is declared",
    },
    {   
        question: "All the variables of interface should be?",
        options: ["default and final","default and static","public, static and final","protect, static and final"],
        answer:"public, static and final",
    },
    {   
        question: "What is true of final class?",
        options: ["Final class cause compilation failure","Final class cannot be instantiated","Final class cause runtime failure","Final class cannot be inherited"],
        answer:"Final class cannot be inherited",
    },
    {   
        question: "How many copies of static and class variables are created when 10 objects are created of a class?",
        options: ["1, 10","10, 10","10, 1","1, 1"],
        answer:"1, 10",
    },
    {   
        question: "Which is the modifier when there is none mentioned explicitly?",
        options: ["protected","private","public","default"],
        answer:"default",
    },
    {   
        question: "What is the numerical range of a char data type in Java?",
        options: ["0 to 256","-128 to 127","0 to 65535","0 to 32767"],
        answer:"0 to 65535",
    },
    {   
        question: "Which class provides system independent server side implementation?",
        options: ["Server","ServerReader","Socket","ServerSocket"],
        answer:"ServerSocket",
    },
    {
        question: "Which of the following contains both date and time?",
        options: ["java.io.date","java.sql.date","java.util.date","java.util.dateTime"],
        answer: "java.util.dateTime",
    },
    {
        question: "Which of these are selection statements in Java?",
        options: ["break","continue","for()","if()"],
        answer: "if()",
    },
    {
        question: "Which exception is thrown when java is out of memory?",
        options: ["MemoryError","OutOfMemoryError","MemoryOutOfBoundsException","MemoryFullException"],
        answer: "OutOfMemoryError",
    },
    {
        question: "What is the extension of compiled java classes?",
        options: [".txt",".js",".class",".java"],
        answer: ".class",
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
    <div className="jmt-body">
      <h1 id="jmt-head">Java Mock Test</h1>
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

export default JavaMockTest;
