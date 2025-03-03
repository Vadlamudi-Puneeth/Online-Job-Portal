import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./login.css";


function Login() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await fetch('http://localhost:8082/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();
            if (response.ok) {
                navigate('/HomeAfterLogin');
            } else {
                setErrorMessage(data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage("An error occurred. Please try again.");
        }
    };

    const handleHome = () => {
        navigate("/");
    };

    return (
        <div>
            <div class = "imgonly">
            <img src = "https://cdn.prod.website-files.com/65efe5c22fe5c01bbd337a5f/65efef4c8c9490f23afeb120_60a0dbb1754e6b34267a8157_Icon%20File.svg" alt = "imagenotfound" ></img>
            <h2 id="workfolio" onClick={handleHome}>Work Folio</h2> 
        </div>
            <div className="first">
                <button onClick={handleHome} id="bth">Back to Home</button>
            </div>


            <div className="login">
                <h1 id="lg">Login</h1>
            </div>

            <form onSubmit={handleLogin}>

                <div className="username-password">

                <div className="divusername">
                    <label htmlFor="username" className="username" id="user">
                        <strong>User Name</strong>
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="username"
                        name="email"
                        placeholder="  User name"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                </div>

                <div className="passindiv">
                    <label htmlFor="thisispass" className="password" id="passw">
                        <strong>Password</strong>
                    </label>
                    <input
                        type="password"
                        id="thisispass"
                        className="password"
                        name="password"
                        placeholder="  Password"
                        value={credentials.password}
                        onChange={handleChange}
                        required/>  
                        
                </div>

                {errorMessage && <p className="error">{errorMessage}</p>}

                <div className="dont">
                    <p id="dha">
                        Don't have an account? <Link to="/Registration">Register</Link> here
                    </p>
                </div>

                <div className="btn">
                    <button type="submit" id="lgn">Login</button>
                </div>
                </div>
            </form>
        </div>
    );
}

export default Login;