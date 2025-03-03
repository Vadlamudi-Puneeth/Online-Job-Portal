import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeImage from './HomePagePic.jpg';
import "./home.css";
import ChatBot1 from "./ChatBot1";

function Home() {
    const navigate = useNavigate();

    const [showChatbot, setShowChatbot] = useState(false);

    const toggleChatbot = () => {
        setShowChatbot(!showChatbot);
    };

    const handlelogin = () =>{
        navigate("/Login");
    }

    const handleregister = () =>{
        navigate("/Registration");
    }

    const handleAboutus = () =>{
        navigate("/Aboutus");
    }

    const handleContactus = () =>{
        navigate("/Contactus");
    }

    const handleterms = () =>{
        navigate("/TermsAndConditions");
    }

    const handleWorkFolio = () =>{
        navigate("/");
    }

    return (

    <div>


        <div class = "imgonly">
            <img src = "https://cdn.prod.website-files.com/65efe5c22fe5c01bbd337a5f/65efef4c8c9490f23afeb120_60a0dbb1754e6b34267a8157_Icon%20File.svg" alt = "imagenotfound" ></img>
            <h2 id="workfolio" onClick={handleWorkFolio}>Work Folio</h2> 
        </div>
            <div className="bodyHome" >

            <img src={HomeImage} alt="Home" className="Home-image" />

        <div className="three-button-container">

        <div class = "btnlog" >
            <button id = "hlog" onClick = {handlelogin} >Sign in</button>
        </div>
        
        <div class="btnreg">
            <button id = "hreg" onClick = {handleregister} >Sign Up</button>
        </div>

        </div>

        <div class = "quotecontent">
            <h1 id = "quote">Your future is created by what you do today, not tomorrow.</h1>
        </div>

        <div class= "rightcontent">
            <p id = "right">Welcome to WorkFolio, your gateway to endless career opportunities. 
                Our platform connects job seekers with top employers across various industries, 
                making it easier than ever to find your dream job. With user-friendly features, 
                personalized job recommendations, and resources to enhance your skills,
                 we empower you to take charge of your career journey. Join us today and start
                  exploring the possibilities that await you!</p>
        </div>

        <div class="getstarted">
            <button id = "get" onClick = {handlelogin} ><strong>Get Started</strong></button>
        </div>

        
    <div className="chatbot-icon" onClick={toggleChatbot}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    className="fill-current chatbot-svg">
                    <path d="M12 2C6.486 2 2 6.486 2 12c0 4.411 3.134 8.113 7.248 8.872v1.531c0 .275.224.497.5.497a.494.494 0 0 0 .353-.145L14.5 18H17c5.514 0 10-4.486 10-10S17.514 2 12 2zM12 16H6v-2h6v2zm6-4H6v-2h12v2zm0-4H6V6h12v2z"></path>
                </svg>
            </div>

            {showChatbot && (
                <div className="chatbot-modal">
                    <div className="chatbot-header">
                        <h3>ChatBot</h3>
                        <button onClick={toggleChatbot} className="close-btn">
                            x
                        </button>
                    </div>
                    <div className="chatbot-body">
                        <ChatBot1 />
                    </div>
                </div>
            )}
        
        <div className="footer">
    <div className="copyright">

        <div className="copy">
        <p>&copy;2024 workfolio. All Rights Reserved</p>
        </div>

        <div className="social-media-buttons">
        
        <a href="https://twitter.com/login" target="_blank" rel="noopener noreferrer" id = "twitter">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current">
                <path d="M23.953 4.57c-.885.392-1.83.656-2.825.775 1.014-.609 1.794-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
            </svg>
        </a>

            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" id="fb">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#3b5998">
            <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.325v21.35C0 23.4.6 24 1.325 24h21.35C23.4 24 24 23.4 24 22.675v-21.35C24 .6 23.4 0 22.675 0zM12 2.063c2.693 0 3.014 0 4.092.058 1.084.058 1.748.23 2.152.464.493.236.755.553.755 1.055 0 .786-.005 1.547-.005 2.338H12v2.947h3.002c-.006 1.312-.008 2.625-.008 3.938H12v8.055H9.006V10.403H7.1V7.456h1.906V5.4c0-1.882.928-4.118 4.01-4.118z"></path>
        </svg>
        </a>

        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" id = "linked">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current">
                <path d="M22.225 0h-20.451C.997 0 0 .997 0 2.225v19.551C0 23.003.997 24 2.225 24h20.451C23.003 24 24 23.003 24 22.225v-19.55C24 .997 23.003 0 22.225 0zM7.057 20.452H3.577V9.001h3.48v11.451zm-1.74-13.1c-1.114 0-2.015-.911-2.015-2.03 0-1.13.901-2.03 2.015-2.03 1.114 0 2.015.9 2.015 2.03 0 1.119-.901 2.03-2.015 2.03zm16.115 13.1h-3.48v-5.724c0-1.36-.025-3.111-1.895-3.111-1.895 0-2.187 1.482-2.187 3.015v5.82h-3.48V9.001h3.34v1.553h.048c.465-.884 1.6-1.811 3.298-1.811 3.526 0 4.173 2.315 4.173 5.312v6.398z"></path>
            </svg>
        </a>
        </div>
    </div>

        <div className="last-three-button">
            <div className = "aboutus">
                <button onClick = {handleAboutus}  id = "btnabout" >About us</button>
            </div>

            <div className = "contactus">
                <button onClick = {handleContactus} id = "btncontact" >Contact us</button>
            </div>

            <div className = "terms" >
                <button onClick = {handleterms} id = "btnterms" > Terms </button>
            </div>
        </div>

</div>


</div>
        </div>
    );
}

export default Home;
