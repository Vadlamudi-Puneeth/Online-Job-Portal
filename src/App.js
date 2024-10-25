import React from "react";
import Home from "./Home";
import Login from "./Login";
import Aboutus from "./Aboutus";
import TermsAndConditions from "./TermsAndConditions";
import Registration from "./Registration";
import Contactus from "./Contactus";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Registration" element={<Registration />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="TermsAndConditions" element={<TermsAndConditions />} />
                    <Route path="/Aboutus" element={<Aboutus />} />
                    <Route path="/Contactus" element={<Contactus />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
