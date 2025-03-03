import React, { useState, useEffect } from "react";
import "./cmocktest.css";

function CMockTest() {
  const allQuestions = [
    {
      question: "Who is the father of C language?",
      options: ["Steve Jobs", "James Gosling", "Dennis Ritchie", "Rasmus Lerdorf"],
      answer: "Dennis Ritchie",
    },
    {
      question: "Which of the following is not a valid C variable name?",
      options: ["int number;", "float rate;", "int variable_count;", "int $main;"],
      answer: "int $main;",
    },
    {
        question: "All keywords in C are in ____________",
        options: ["LowerCase letters","UpperCase letters","CamelCase letters","None of the mentioned"] ,
        answer: "LowerCase letters",
    },
    {   
        question: "Which of the following is true for variable names in C?",
        options: ["They can contain alphanumeric characters as well as special characters","It is not an error to declare a variable to be one of the keywords(like goto, static)","Variable names cannot start with a digit","Variable can be of any length"],
        answer:"Variable names cannot start with a digit",
    },
    {   
        question: "Which is valid C expression?",
        options: ["int my_num = 100,000;","int my_num = 100000;","int my num = 1000;","int $my_num = 10000;"],
        answer:"int my_num = 100000;",
    },
    {   
        question: "Which of the following cannot be a variable name in C?",
        options: ["volatile","true","friend","export"],
        answer:"volatile",
    },
    {   
        question: "What is short int in C programming?",
        options: ["The basic data type of C","Qualifier","Short is the qualifier and int is the basic data type","All of the mentioned"],
        answer:"Short is the qualifier and int is the basic data type",
    },
    {   
        question: "Which of the following declaration is not supported by C language?",
        options: ["String str;","char *str;","float str = 3e2;","Both “String str;” and “float str = 3e2;”"],
        answer:"String str;",
    },
    {   
        question: "Which keyword is used to prevent any changes in the variable within a C program?",
        options: ["True or False","0 or 1","0 if an expression is false and any positive number if an expression is true","None of the mentioned"],
        answer:"0 or 1",
    },
    {   
        question: "Which of the following typecasting is accepted by C language?",
        options: ["Widening conversions","Narrowing conversions","Widening & Narrowing conversions","None of the mentioned"],
        answer:"Widening & Narrowing conversions",
    },
    {   
        question: "Where in C the order of precedence of operators do not exist?",
        options: ["Within conditional statements, if, else","Within while, do-while","Within a macro definition","None of the mentioned"],
        answer:"None of the mentioned",
    },
    {
        question: "Which of the following is NOT possible with any 2 operators in C?",
        options: ["Different precedence, same associativity","Different precedence, different associativity","Same precedence, different associativity","All of the mentioned"],
        answer: "Same precedence, different associativity",
    },
    {
        question: "What is an example of iteration in C?",
        options: ["for","while","do-while","all of the mentioned"],
        answer: "all of the mentioned",
    },
    {
        question: "Functions can return enumeration constants in C?",
        options: ["true","false","depends on the compiler","depends on the standard"],
        answer: "true",
    },
    {
        question: "Functions in C Language are always _________",
        options: ["Internal","External","Both Internal and External","External and Internal are not valid terms for functions"],
        answer: "External",
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
    <div className="cmt-body">
      <h1 id="cmt-head">C Mock Test</h1>
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

export default CMockTest;
