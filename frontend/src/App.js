import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Aboutus from "./pages/Aboutus";
import TermsAndConditions from "./pages/TermsAndConditions";
import Registration from "./pages/Registration";
import Contactus from "./pages/Contactus";
import JobApplication from "./pages/JobApplication";
import HomeAfterLogin from "./pages/HomeAfterLogin";
import JobOpenings from "./pages/JobOpenings";
import NotifyStatus from "./pages/NotifyStatus";
import MockTest from "./pages/MockTest";
import PythonMockTest from "./pages/PythonMockTest";
import CMockTest from "./pages/CMockTest";
import CppMockTest from "./pages/CppMockTest";
import JavaMockTest from "./pages/JavaMockTest";
import JobSearch from "./pages/JobSearch";
import JobDetails from "./pages/JobDetails";
import AdminApplications from "./pages/AdminApplications";
import AdminManageUsers from "./pages/AdminManageUsers";
import Profile from "./pages/Profile";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactForm from "./pages/ContactForm";
import ChatBot1 from "./components/ChatBot1";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";

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
                    <Route path="/JobApplication" element={<ProtectedRoute><JobApplication /></ProtectedRoute>} />
                    <Route path="/HomeAfterLogin" element={<ProtectedRoute><HomeAfterLogin /></ProtectedRoute>} />
                    <Route path="/JobOpenings" element={<ProtectedRoute><JobOpenings /></ProtectedRoute>} />
                    <Route path="/NotifyStatus" element={<ProtectedRoute><NotifyStatus /></ProtectedRoute>} />
                    <Route path="/AdminApplications" element={<ProtectedRoute><AdminApplications /></ProtectedRoute>} />
                    <Route path="/AdminManageUsers" element={<ProtectedRoute><AdminManageUsers /></ProtectedRoute>} />
                    <Route path="/JobSearch" element={<JobSearch />} />
                    <Route path="/JobDetails" element={<JobDetails />} />
                    <Route path="/Profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/MockTest" element={<MockTest/>} />
                    <Route path="/PythonMockTest" element={<PythonMockTest/>} />
                    <Route path="/CMockTest" element={<CMockTest/>} />
                    <Route path="/CppMockTest" element={<CppMockTest/>} />
                    <Route path="/JavaMockTest" element={<JavaMockTest/>} />
                    <Route path="/ContactForm" element = {<ContactForm/>} />
                    <Route path="/ChatBot1" element = {<ChatBot1/>} />
                </Routes>
                <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} newestOnTop />
            </Router>
        </>
    );
}

export default App;
