import React, { useState } from 'react';
import './register.css'; 
import RakeshImage from './rakesh.jpg';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const Registration = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        cpassword: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [redirect, setRedirect] = useState(false); 

    const validatePassword = (password) =>{
        const capitalLetterRegex = /[A-Z]/;
        const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;

        if(password.length < 8 || password.length > 14){
            return "Password must be more than 8 and less than 14 characters.";
        }

        if(!capitalLetterRegex.test(password)){
            return "Password must contain at least one uppercase letter.";
        }

        if(!symbolRegex.test(password)){
            return "Password must contain atleast one symbol.";
        }

        return "";

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Field changed: ${name} = ${value}`);
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        setErrorMessage('');
        setSuccessMessage('');
    
        const passwordError = validatePassword(user.password);
        const cpasswordError = validatePassword(user.cpassword);
    
        if (passwordError) {
            setErrorMessage(passwordError);
            return;
        }
    
        if (cpasswordError) {
            setErrorMessage(cpasswordError);
            return;
        }
    
        if (user.password !== user.cpassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }
    
        try {
            const response = await fetch('http://localhost:8082/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
    
            const data = await response.json(); // Parse JSON response
    
            if (response.status === 409) {
                // Handle duplicate email error
                setErrorMessage(data.message); // Use the message from backend response
                return;
            }
    
            if (!response.ok) {
                console.error(`HTTP error! Status: ${response.status}`);
                throw new Error('Network response was not ok');
            }
    
            setSuccessMessage(data.message); // Use the success message from backend response
            setRedirect(true);
    
            setUser({
                username: '',
                email: '',
                password: '',
                cpassword: '',
            });
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage("Registration failed. Please try again.");
        }
    };
    

    if (redirect) {
        return <Navigate to="/Login" />; 
    }

    const handleWorkFolio = () =>{
        navigate("/");
    }


    return (
        <>
                <div class = "reg-imgonly">
            <img src = "https://cdn.prod.website-files.com/65efe5c22fe5c01bbd337a5f/65efef4c8c9490f23afeb120_60a0dbb1754e6b34267a8157_Icon%20File.svg" alt = "imagenotfound" ></img>
            <h2 id="reg-workfolio" onClick={handleWorkFolio}>Work Folio</h2> 
        </div>

        <div className="registration-container">
            <div className="image-section">
                <img src={RakeshImage} alt="Rakesh" className="side-image" />
            </div>
            <div className="form-section">
                <h2 id="regtitle">Registration</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Confirm password"
                        name="cpassword"
                        value={user.cpassword}
                        onChange={handleChange}
                        required
                    />
                    <button id="btnreg" type="submit">Signup</button>
                </form>

                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            </div>
        </div></>
    );
};

export default Registration;
