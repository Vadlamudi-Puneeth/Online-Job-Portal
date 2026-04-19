import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getAuthHeader } from "../utils/auth";
import { toast } from "react-toastify";

function NotifyStatus() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); 
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [applicants, setApplicants] = useState([]);
  
  const baseUrl = "http://localhost:8082"; 

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/jobapplication`, {
            headers: getAuthHeader()
        });
        if (response.ok) {
          const data = await response.json();
          setApplicants(data);
        }
      } catch (error) {
        console.error("Failed to fetch applicants", error);
      }
    };
    fetchApplicants();
  }, [baseUrl]);

  const handleStatusChange = (e) => {
    const selectedValue = e.target.value;
    setStatus(selectedValue);

    switch (selectedValue) {
      case "Rejected":
        setMessage(
          "We regret to inform you that your application for the position has been rejected. This decision was made after a thorough review of your profile and qualifications. We encourage you to apply for other positions in the future."
        );
        break;
      case "Shortlisted":
        setMessage("Congratulations! You have been shortlisted for the position.");
        break;
      case "InterviewCall":
        setMessage(
          "You are invited to attend an interview for the position. Please check your email for further details and confirm your availability."
        );
        break;
      case "Offer":
        setMessage(
          "We are pleased to offer you the position! Please review the offer letter sent to your email and let us know if you have any questions."
        );
        break;
      default:
        setMessage("");
    }
  };

  const sendEmail = async () => {
    if(!email || !message) {
        toast.error("Please provide valid details before sending.");
        return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/jobapplication/notify`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            ...getAuthHeader()
        },
        body: JSON.stringify({ email, message: `Hello ${name},\n\n${message}` }),
      });
  
      if (response.ok) {
        toast.success("Notification sent successfully!");
        setEmail("");
        setName("");
        setMessage("");
        setStatus("");
      } else {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.message || 'Unknown error occurred';
        toast.error(`Failed to send notification: ${errorMessage}`);
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg p-8 flex items-center justify-center transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white dark:bg-dark-surface shadow-glow rounded-3xl p-8 md:p-12"
      >
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">Applicant Notification Portal</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Applicant Name</label>
              <input
                type="text"
                placeholder="Ex. John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-xl focus:ring-brand-ocean outline-none dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Applicant Email</label>
              <select
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  const selectedApp = applicants.find((app) => app.email === e.target.value);
                  if (selectedApp) {
                     setName(selectedApp.firstname);
                  }
                }}
                required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-xl focus:ring-brand-ocean outline-none dark:text-white"
              >
                  <option value="">Select an applicant</option>
                  {applicants.map((app, idx) => (
                      <option key={`${app.email}-${idx}`} value={app.email}>
                          {app.firstname} ({app.domainName})
                      </option>
                  ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Application Status</label>
            <select
              value={status}
              onChange={handleStatusChange}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-xl focus:ring-brand-ocean outline-none dark:text-white"
            >
              <option value="">Select an Option</option>
              <option value="Rejected">Rejected</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="InterviewCall">Interview Call</option>
              <option value="Offer">Offer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notification Message</label>
            <textarea
              value={message}
              readOnly
              rows="5"
              className="w-full px-4 py-3 bg-gray-100 dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-xl focus:ring-brand-ocean outline-none text-gray-600 dark:text-gray-400"
              placeholder="Message will automatically populate based on status selection..."
            />
          </div>

          <button 
            type="button" 
            onClick={sendEmail}
            disabled={isLoading}
            className="w-full py-4 rounded-xl text-white font-bold tracking-wide bg-brand-ocean hover:bg-blue-800 transition-colors shadow-lg disabled:opacity-50"
          >
            {isLoading ? "Sending Notice..." : "Send Notification"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default NotifyStatus;
