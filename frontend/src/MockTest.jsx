import React from "react";
import "./mocktest.css";
import { useNavigate } from "react-router-dom";

function MockTest() {
    
    const navigate = useNavigate();

    const handlehome = () =>{
      navigate("/HomeAfterLogin");
    }

    const handlePython = () =>{
        navigate("/PythonMockTest");
    }

    const handleC = () => {
        navigate("/CMockTest");
    }

    const handleCpp = () =>{
        navigate("/CppMockTest");
    }

    const handleJava = () =>{
        navigate("/JavaMockTest");
    }

  return (
    <>
          <div class = "imgonly">
                <img src = "https://cdn.prod.website-files.com/65efe5c22fe5c01bbd337a5f/65efef4c8c9490f23afeb120_60a0dbb1754e6b34267a8157_Icon%20File.svg" alt = "imagenotfound" ></img>
                <h2 id="workfolio" onClick={handlehome}>Work Folio</h2> 
            </div>
    <div className="mt-back">
      <h1 id="mt-heading">Mock Programming MCQ's Test</h1>
      
      <div className="mt-four-button-container">
        <button id="mt-python" onClick={handlePython} >Python</button>
        <button id="mt-c" onClick={handleC}>C</button>
        <button id="mt-cpp" onClick={handleCpp}>C++</button>
        <button id="mt-java" onClick={handleJava}>Java</button>
      </div>
      
      <p className="mt-intro">
        Welcome to <strong>Workfolio</strong>! Enhance your programming skills 
        with our expertly designed mock tests. Choose your preferred language 
        and begin your journey towards coding excellence.
      </p>
      
      <div className="mt-features">
        <h2 id="mt-feautures-head" ><strong>Why Choose Workfolio Mock Tests?</strong></h2>
        <ul>
          <li>Comprehensive MCQs covering multiple programming languages.</li><br/>
          <li>Real-time feedback and detailed explanations.</li><br/>
          <li>Perfect for interview preparation and skill enhancement.</li><br/>
          <li>Designed for all skill levels: beginner to advanced.</li><br/>
        </ul>
      </div>
      
      <div className="mt-cta">
        <h3>Take the first step to success!</h3>
        <p>
          Select your preferred programming language and start practicing now.
          Remember, consistent practice is key to mastering programming.
        </p>
      </div>
      
      <footer className="mt-footer">
        <p id="mt-footer-quote">
          <i >"Code is like humor. When you have to explain it, it’s bad."</i> – Cory House
        </p>
      </footer>
    </div>
    </>
  );
}

export default MockTest;
