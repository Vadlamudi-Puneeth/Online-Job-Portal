import React, { useState } from "react";
import "./contact.css";
import { useNavigate } from "react-router-dom";

function Contactus() {
    const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const navigate = useNavigate();

    const handlehome = () =>{
        navigate("/HomeAfterLogin");
    }

   
    return (
        <>
            <div class = "imgonly">
            <img src = "https://cdn.prod.website-files.com/65efe5c22fe5c01bbd337a5f/65efef4c8c9490f23afeb120_60a0dbb1754e6b34267a8157_Icon%20File.svg" alt = "imagenotfound" ></img>
            <h2 id="workfolio" onClick={handlehome} >Work Folio</h2> 
        </div>
        <div className="contact-form-container">
            <h1 id="cu-head">Contact Us</h1>
            <form action="https://formspree.io/f/mnnqzrra" method="POST">
                <label htmlFor="cu-name" className="cu-name">
                    <strong>Name:</strong>
                </label>
                <input
                    type="text"
                    id="cu-name"
                    name="name"
                    placeholder="Enter your First Name"
                    required
                    value={contactForm.name}
                    onChange={handleChange}
                />

                <label htmlFor="cu-emailaddress">
                    <strong>Email:</strong>
                </label>
                <input
                    type="email"
                    id="cu-emailaddress"
                    name="email"
                    placeholder="Enter your Email"
                    required
                    value={contactForm.email}
                    onChange={handleChange}
                />

                <label htmlFor="cu-message">
                    <strong>Message:</strong>
                </label>
                <textarea
                    placeholder="Your Message"
                    id="cu-message"
                    name="message"
                    required
                    value={contactForm.message}
                    onChange={handleChange}
                ></textarea>

                <button type="submit" id="cu-send">
                    Send
                </button>
            </form>
        </div>
        </>
    );
}

export default Contactus;
