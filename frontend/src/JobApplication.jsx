import React, { useState,useEffect } from "react";
import "./apply.css";
import { Navigate } from "react-router-dom";
import { useNavigate,useLocation } from "react-router-dom";
import { Item } from "semantic-ui-react";

function JobApplication() {

    const navigate = useNavigate();
    const location = useLocation();

    const [redirect, setRedirect] = useState(false); 
    const [message, setMessage] = useState(''); 

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        fathername: '',
        email: '',
        contact: '',
        course: '',
        university: '',
        passoutyear: '',
        marks: '',
        country: '',
        state: '',
        district: '',
        city: '',
        pincode: '',
        skill1: '',
        skill1Level: 'Basic',
        skill2: '',
        skill2Level: 'Basic',
        skill3: '',
        skill3Level: 'Basic',
        domainName: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); // Reset any previous message
    
        try {
            const response = await fetch('http://localhost:8082/api/jobapplication', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                // If response status is not OK, we need to read the error message
                const errorText = await response.text();
                console.error('Backend error:', errorText); // Log the error message from the backend
    
                // If backend returns a custom error message (like "You have already applied for this job")
                setMessage(errorText);  // Set the error message from the backend
                throw new Error('Failed to submit application');
            }
    
            // If application is successful, reset form and show success message
            setMessage("Application submitted successfully!");
            setFormData({
                firstname: '',
                lastname: '',
                fathername: '',
                email: '',
                contact: '',
                course: '',
                university: '',
                passoutyear: '',
                marks: '',
                country: '',
                state: '',
                district: '',
                city: '',
                pincode: '',
                skill1: '',
                skill1Level: 'Basic',
                skill2: '',
                skill2Level: 'Basic',
                skill3: '',
                skill3Level: 'Basic',
                domainName: '',
            });
            setRedirect(true);
        } catch (error) {
            console.error('Error:', error);
            setMessage("Failed to submit application. Please try again.");
        }
    };
    
    
    useEffect(() => {
        if (location.state?.domainName) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                domainName: location.state.domainName,
            }));
        }
    }, [location.state]);

    if (redirect) {
        return <Navigate to="/JobOpenings" />;
    }

    const handlehome = () =>{
        navigate("/HomeAfterLogin");
    }


    return (
        <>

<div class = "imgonly">
                <img src = "https://cdn.prod.website-files.com/65efe5c22fe5c01bbd337a5f/65efef4c8c9490f23afeb120_60a0dbb1754e6b34267a8157_Icon%20File.svg" alt = "imagenotfound" ></img>
                <h2 id="workfolio" onClick={handlehome} >Work Folio</h2> 
            </div>

                <h1 id="job-apply-head" >Application</h1>
        <div className="appcontainer">
            <form onSubmit={handleSubmit}>

                <h2 id="pd">Personal Details</h2>
                <div className="personal-details-container">
                    <div className="firstname">
                        <label htmlFor="firstname"><strong>First Name</strong></label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            placeholder="First Name"
                            value={formData.firstname}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="lastname">
                        <label htmlFor="lastname"><strong>Last Name</strong></label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            placeholder="Last Name"
                            value={formData.lastname}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="fathername">
                        <label htmlFor="fathername"><strong>Father Name</strong></label>
                        <input
                            type="text"
                            id="fathername"
                            name="fathername"
                            placeholder="Father Name"
                            value={formData.fathername}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="appemail">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="appcontact">
                        <label htmlFor="contact"><strong>Contact</strong></label>
                        <input
                            type="tel"
                            id="contact"
                            name="contact"
                            placeholder="Mobile No"
                            value={formData.contact}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <h2 id="eq">Educational Qualification</h2>
                <div className="qualification-container">
                    <div className="course">
                        <label htmlFor="course"><strong>Course</strong></label>
                        <input
                            type="text"
                            id="course"
                            name="course"
                            placeholder="Course"
                            value={formData.course}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="university">
                        <label htmlFor="university"><strong>University</strong></label>
                        <input
                            type="text"
                            id="university"
                            name="university"
                            placeholder="University"
                            value={formData.university}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="passoutyear">
                        <label htmlFor="passoutyear"><strong>PassOut Year</strong></label>
                        <input
                            type="number"
                            id="passoutyear"
                            name="passoutyear"
                            placeholder="XXXX"
                            value={formData.passoutyear}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="marks">
                        <label htmlFor="marks"><strong>Marks</strong></label>
                        <input
                            type="number"
                            id="marks"
                            name="marks"
                            placeholder="Enter the marks in %"
                            value={formData.marks}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <h2 id="adr">Address</h2>
                <div className="address-container">
                    <div className="country">
                        <label htmlFor="country"><strong>Country</strong></label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            placeholder="Country"
                            value={formData.country}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="state">
                        <label htmlFor="state"><strong>State</strong></label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            placeholder="State"
                            value={formData.state}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="district">
                        <label htmlFor="district"><strong>District</strong></label>
                        <input
                            type="text"
                            id="district"
                            name="district"
                            placeholder="District"
                            value={formData.district}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="city">
                        <label htmlFor="city"><strong>City</strong></label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="pincode">
                        <label htmlFor="pincode"><strong>Pin Code</strong></label>
                        <input
                            type="number"
                            id="pincode"
                            name="pincode"
                            placeholder="Pin Code"
                            value={formData.pincode}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <h2 id="skills">Skills</h2>
                <div className="skills-container">

                    <div className="domainName" >
                        <label htmlFor="domainName" ><strong>Domain Name</strong></label>
                        <input
                            type="text"
                            id="domainName"
                            name="domainName"
                            value={formData.domainName}
                            onChange={handleChange}
                            placeholder="Enter the Domain Name that you're applying"
                            readOnly
                        />
                    </div>

                    <div className="skill1">
                        <label htmlFor="skill1"><strong>Skill 1</strong></label>
                        <input
                            type="text"
                            id="skill1"
                            name="skill1"
                            value={formData.skill1}
                            onChange={handleChange}
                        />

                        <select
                            name="skill1Level"
                            id="skill1Level"
                            value={formData.skill1Level}
                            onChange={handleChange}
                            required
                        >
                            <option value="Basic">Basic</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>


                    </div>

                    

                    <div className="skill2">
                        <label htmlFor="skill2"><strong>Skill 2</strong></label>
                        <input
                            type="text"
                            id="skill2"
                            name="skill2"
                            value={formData.skill2}
                            onChange={handleChange}
                        />

                        <select
                            name="skill2Level"
                            id="skill2Level"
                            value={formData.skill2Level}
                            onChange={handleChange}
                            required
                        >
                            <option value="Basic">Basic</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>

                    </div>

                    <div className="skill3">
                        <label htmlFor="skill3"><strong>Skill 3</strong></label>
                        <input
                            type="text"
                            id="skill3"
                            name="skill3"
                            value={formData.skill3}
                            onChange={handleChange}
                        />

                        <select
                            name="skill3Level"
                            id="skill3Level"
                            value={formData.skill3Level}
                            onChange={handleChange}
                            required
                        >
                            <option value="Basic">Basic</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>

                        
                    <div className="gf-div">
                        <label id="gf-label">
                <input id="gf-input" type="checkbox" name="form_checkbox" required/>To Upload Your Resume and Picture&nbsp;
                    <a id="gf-link" href="https://docs.google.com/forms/d/e/1FAIpQLSdskXzvAuB6yjeB9_Bx054kRLMws090IMHRGMzc4CDq82OItg/viewform?vc=0&c=0&w=1&flr=0" target="_blank">
                     Click 
                    </a>&nbsp;here
                </label>
                </div>


                    </div>
                </div>

                <div className="footer-apply"></div>
                <button type="submit">Submit Application</button>
            </form>
            {message && <p>{message}</p>}
        </div>
        </>
    );
}

export default JobApplication;
