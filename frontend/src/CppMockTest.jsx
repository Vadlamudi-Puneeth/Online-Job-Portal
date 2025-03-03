import React, { useState, useEffect } from "react";
import "./cppmocktest.css";

function CppMockTest() {
  
  const allQuestions = [
    {
      question: "Who invented C++?",
      options: ["Dennis Ritchie", "Ken Thompson", "Brian Kernighan", "Bjarne Stroustrup"],
      answer: "Bjarne Stroustrup",
    },
    {
      question: "What is C++?",
      options: ["C++ is an object oriented programming language", "C++ is a procedural programming language", "C++ supports both procedural and object oriented programming language", "C++ is a functional programming language"],
      answer: "C++ supports both procedural and object oriented programming language",
    },
    {
        question: "Which of the following is the correct syntax of including a user defined header files in C++?",
        options: ["#include [userdefined]","#include “userdefined”","#include <userdefined.h>","#include <userdefined>"] ,
        answer: "#include “userdefined”",
    },
    {   
        question: "Which of the following is used for comments in C++?",
        options: ["/* comment */","// comment */","// comment","both // comment or /* comment */"],
        answer:"both // comment or /* comment */",
    },
    {   
        question: "Which of the following extension is used for user-defined header file in c++?",
        options: ["hg","cpp","h","hf"],
        answer:"h",
    },
    {   
        question: "Which of the following is a correct identifier in C++?",
        options: ["VAR_1234","$var_name","7VARNAME","7var_name"],
        answer:"VAR_1234",
    },
    {   
        question: "Which of the following is not a type of Constructor in C++?",
        options: ["Default constructor","Parameterized constructor","Copy constructor","Friend constructor"],
        answer:"Friend constructor",
    },
    {   
        question: "Which of the following approach is used by C++?",
        options: ["Left-right","Left-right","Bottom-up","Top-down"],
        answer:"Bottom-up",
    },
    {   
        question: "What is virtual inheritance in C++?",
        options: ["C++ technique to enhance multiple inheritance","C++ technique to ensure that a private member of the base class can be accessed somehow","C++ technique to avoid multiple inheritances of classes","C++ technique to avoid multiple copies of the base class into children/derived class"],
        answer:"C++ technique to avoid multiple copies of the base class into children/derived class",
    },
    {   
        question: "What is the difference between delete and delete[] in C++?",
        options: ["delete is syntactically correct but delete[] is wrong and hence will give an error if used in any case","delete is used to delete normal objects whereas delete[] is used to pointer objects","delete is a keyword whereas delete[] is an identifier","delete is used to delete single object whereas delete[] is used to multiple(array/pointer of) objects"],
        answer:"delete is used to delete single object whereas delete[] is used to multiple(array/pointer of) objects",
    },
    {   
        question: "Which of the following is correct about this pointer in C++?",
        options: ["this pointer is passed as a hidden argument in all static variables of a class","this pointer is passed as a hidden argument in all the functions of a class","this pointer is passed as a hidden argument in all non-static functions of a class","this pointer is passed as a hidden argument in all static functions of a class"],
        answer:"this pointer is passed as a hidden argument in all non-static functions of a class",
    },
    {
        question: "By default, all the files in C++ are opened in _________ mode.",
        options: ["Binary","VTC","Text","ISCII"],
        answer: "Text",
    },
    {
        question: "The C++ code which causes abnormal termination/behaviour of a program should be written under _________ block.",
        options: ["Catch","throw","try","finally"],
        answer: "try",
    },
    {
        question: "What is Inheritance in C++?",
        options: ["Deriving new classes from existing classes","Overloading of classes","Classes with same names","Wrapping of data into a single class"],
        answer: "Deriving new classes from existing classes",
    },
    {
        question: "What is meant by a polymorphism in C++?",
        options: ["class having only single form","class having four forms","class having many forms","class having two forms"],
        answer: "class having many forms",
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
    <div className="cppmt-body">
      <h1 id="cppmt-head">C++ Mock Test</h1>
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
                  <button
              onClick={() => {
                alert(`Your Score: ${calculateScore()}` + "\nIf you want to write again, click ok");
                window.location.reload(); 
              }}
              id="submit-btn"
            >
              Submit
            </button>
    </div>
  );
}

export default CppMockTest;
