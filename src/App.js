import React from "react";
import Home from "./Home";
import Login from "./Login";
import Aboutus from "./Aboutus";
import TermsAndConditions from "./TermsAndConditions";
import Registration from "./Registration";
import Contactus from "./Contactus";
import JobApplication from "./JobApplication";
import HomeAfterLogin from "./HomeAfterLogin";
import JobOpenings from "./JobOpenings";
import NotifyStatus from "./NotifyStatus";
import MockTest from "./MockTest";
import PythonMockTest from "./PythonMockTest";
import CMockTest from "./CMockTest";
import CppMockTest from "./CppMockTest";
import JavaMockTest from "./JavaMockTest";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactForm from "./ContactForm";
import ChatBot1 from "./ChatBot1";

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
                    <Route path="/JobApplication" element={<JobApplication />} />
                    <Route path="/HomeAfterLogin" element={<HomeAfterLogin/>} />
                    <Route path="/JobOpenings" element={<JobOpenings/>} />
                    <Route path="/NotifyStatus" element={<NotifyStatus/>} />
                    <Route path="/MockTest" element={<MockTest/>} />
                    <Route path="/PythonMockTest" element={<PythonMockTest/>} />
                    <Route path="/CMockTest" element={<CMockTest/>} />
                    <Route path="/CppMockTest" element={<CppMockTest/>} />
                    <Route path="/JavaMockTest" element={<JavaMockTest/>} />
                    <Route path="/ContactForm" element = {<ContactForm/>} />
                    <Route path="/ChatBot1" element = {<ChatBot1/>} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
