import "./opening.css";
import { useNavigate } from "react-router-dom";
import React from "react";

function JobOpenings() {
    const navigate = useNavigate();

    const handlehome = () => {
        navigate("/HomeAfterLogin");
    };

    const handleNotify = () => {
        navigate("/NotifyStatus");
    };

    const handleJobApplication = (domainName) => {
        navigate("/JobApplication", { state: { domainName } });
    };

    return (
        <div>
            <div className="imgonly">
                <img src="https://cdn.prod.website-files.com/65efe5c22fe5c01bbd337a5f/65efef4c8c9490f23afeb120_60a0dbb1754e6b34267a8157_Icon%20File.svg" alt="imagenotfound" />
                <h2 id="workfolio" onClick={handlehome}>Work Folio</h2>
            </div>

            <div className="haf-back">
                <button id="notify-status" onClick={handleNotify}>Notify Status</button>
                <button id="haf-back" onClick={handlehome}>Back to Home</button>
            </div>

            <h1 id="JobOpenings">Job Openings</h1>

            <div className="haf-container">
                <div className="haf-softwaredeveloper">
                    <h2 id="haf-softwaredeveloper0"><strong>Software Developer</strong></h2>
                    <p id="haf-softwaredeveloper1">San Francisco, CA</p>
                    <p id="haf-softwaredeveloper2">Develop and maintain web applications</p>
                    <button id="haf-softwaredeveloper3" onClick={() => handleJobApplication("Software Developer")}>Apply</button>
                </div>
                <div className="haf-datascientist">
                    <h2 id="haf-datascientist0"><strong>Data Scientist</strong></h2>
                    <p id="haf-datascientist1">New York, NY</p>
                    <p id="haf-datascientist2">Analyze and interpret Complex data.</p>
                    <button id="haf-datascientist3" onClick={() => handleJobApplication("Data Scientist")}>Apply</button>
                </div>
                <div className="haf-projectmanager">
                <h2 id="haf-projectmanager0"><strong>Project Manager</strong></h2>
                    <p id="haf-projectmanager1" >Austin, TX</p>
                    <p id="haf-projectmanager2" >Manage projects and ensure timely delivery</p>
                    <button id="haf-projectmanager3" onClick={() => handleJobApplication("Project Manager")} >Apply</button>
                </div>
                <div className="haf-uxdesign">
                <h2 id="haf-uxdesign0"><strong>UX Designer</strong></h2>
                    <p id="haf-uxdesign1" >Seattle, WA</p>
                    <p id="haf-uxdesign2" >Design user-friendly interfaces for applications.</p>
                    <button id="haf-uxdesign3"  onClick={() => handleJobApplication("UX Designer")} >Apply</button>
                </div>
                <div className="haf-marketingspecialist">
                <h2 id="haf-marketingspecialist0"><strong>Marketing Specialist</strong></h2>
                <p id="haf-marketingspecialist1" >Chicago, IL</p>
                    <p id="haf-marketingspecialist2" >Create and Implement Marketing Strategies.</p>
                    <button id="haf-marketingspecialist3"  onClick={() => handleJobApplication("Marketing Specialist")} >Apply</button>
                </div>
                <div className="haf-Devopsengineer">
                <h2 id="haf-Devopsengineer0"><strong>DevOps Engineer</strong></h2>
                <p id="haf-Devopsengineer1" >Boston, MA</p>
                    <p id="haf-Devopsengineer2" >Automate and streamline infrastructure</p>
                    <button id="haf-Devopsengineer3"  onClick={() => handleJobApplication("Devops Engineer")} >Apply</button>
                </div>
                <div className="haf-cybersecurityanalyst">
                <h2 id="haf-cybersecurityanalyst0"><strong>Cybersecurity Analyst</strong></h2>
                <p id="haf-cybersecurityanalyst1" >Los Angeles, CA</p>
                    <p id="haf-cybersecurityanalyst2" >Ensure data and network security</p>
                    <button id="haf-cybersecurityanalyst3" onClick={() => handleJobApplication("CyberSecurity Analyst")} >Apply</button>
                </div>
                <div className="haf-businessanalyst">
                <h2 id="haf-businessanalyst0"><strong>Business Analyst</strong></h2>
                <p id="haf-businessanalyst1" >Denver, CO</p>
                    <p id="haf-businessanalyst2" >Analyze business needs and solutions.</p>
                    <button id="haf-businessanalyst3"  onClick={() => handleJobApplication("Business Analyst")} >Apply</button>
                </div>
                <div className="haf-aimlengineer">
                <h2 id="haf-aimlengineer0"><strong>AI/ML Engineer</strong></h2>
                <p id="haf-aimlengineer1" >San Jose, CA</p>
                    <p id="haf-aimlengineer2" >Develop machine learning models and AI solutions.</p>
                    <button id="haf-aimlengineer3"  onClick={() => handleJobApplication("AI/ML Engineer")} >Apply</button>
                </div>
                <div className="haf-contentwriter">
                <h2 id="haf-contentwriter0"><strong>Content Writer</strong></h2>
                <p id="haf-contentwriter1" >Remote</p>
                    <p id="haf-contentwriter2" >Write and edit engaging content.</p>
                    <button id="haf-contentwriter3"  onClick={() => handleJobApplication("Content Writer")} >Apply</button>
                </div>
                <div className="haf-systemadministrator">
                <h2 id="haf-systemadministrator0"><strong>System Administrator</strong></h2>
                <p id="haf-systemadministrator1" >Houston, TX</p>
                    <p id="haf-systemadministrator2" >Maintain and support IT systems.</p>
                    <button id="haf-systemadministrator3"  onClick={() => handleJobApplication("System Administrator")} >Apply</button> 
                </div>
                <div className="haf-hrmanager">
                <h2 id="haf-hrmanager0"><strong>HR Manager</strong></h2>
                <p id="haf-hrmanager1" >Atlanta, GA</p>
                    <p id="haf-hrmanager2" >Overseas employee relations and hiring.</p>
                    <button id="haf-hrmanager3"  onClick={() => handleJobApplication("HR Manager")} >Apply</button> 
                </div>

            </div>
        </div>
    );
}

export default JobOpenings;
