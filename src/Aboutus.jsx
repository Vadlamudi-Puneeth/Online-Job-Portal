import React from "react";
import "./about.css";
import mine from "./mine.jpg";
import ankit from "./Ankit.png"
import vamsi from "./vamsi.png"
import pranav from "./pranav.png"
import deepti from "./deepti.jpg"
import nimal from "./nimal.jpg"
import { useNavigate } from "react-router-dom";

function Aboutus(){
    const navigate = useNavigate();

    const handlehome = () =>{
        navigate("/HomeAfterLogin");
    }

    return(
        <div>

        <div class = "imgonly">
            <img src = "https://cdn.prod.website-files.com/65efe5c22fe5c01bbd337a5f/65efef4c8c9490f23afeb120_60a0dbb1754e6b34267a8157_Icon%20File.svg" alt = "imagenotfound" ></img>
            <h2 id="workfolio" onClick={handlehome}>Work Folio</h2> 
        </div>

            <h1 id="au-heading">Our Placed Students</h1>
            <div className="au-first-three-persons-in-row">
                
                <div className="au-first-first">
                    <img id="au-first-image" src={mine} alt="image not found" />
                    <h2 id = "au-first-name" >Puneeth Vadlamudi</h2>
                    <p id = "au-first-company" >Company: TechCorp</p>
                    <p id = "au-first-package" >Package: 10LPA</p>
                </div>

                <div className="au-first-second" >
                    <img id="au-second-image" src={ankit} alt="image not found" />
                    <h2 id = "au-second-name" >Ankit Raj</h2>
                    <p id = "au-second-company" >Company: DevSolution</p>
                    <p id = "au-second-package" >Package: 11LPA</p>
                </div>
                
                <div className="au-first-third" >
                    <img id="au-third-image" src={nimal} alt="image not found" />
                    <h2 id = "au-third-name" >Nimal Dinesh</h2>
                    <p id = "au-third-company" >Company: CodeWorks</p>
                    <p id = "au-third-package" >Package: 12LPA</p>
                </div>
                
                <div className="au-second-first" >
                    <img id="au-fourth-image" src={pranav} alt="image not found" />
                    <h2 id = "au-fourth-name" >Pranav Sahu</h2>
                    <p id = "au-fourth-company" >Company: InnovateX</p>
                    <p id = "au-fourth-package" >Package: 12LPA</p>
                </div>
                <div className="au-second-second" >
                    <img id="au-fifth-image" src={vamsi} alt="image not found" />
                    <h2 id = "au-fifth-name" >Mohan Vamsi Perni</h2>
                    <p id = "au-fifth-company" >Company: FutureTech</p>
                    <p id = "au-fifth-package" >Package: 11LPA</p>
                </div>
                <div className="au-second-third" >
                    <img id="au-sixth-image" src={deepti} alt="" />
                    <h2 id = "au-sixth-name" >Satya Suriya Kumari</h2>
                    <p id = "au-sixth-company" >Company: WebWorks</p>
                    <p id = "au-sixth-package" >Package: 10LPA</p>
                </div>
            </div>

        </div>
    )
}

export default Aboutus;