import React, { useState } from "react";
import "./notifystatus.css";

function NotifyStatus() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); // Added for sender's name
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("ns-select-an-option");
  const baseUrl = "http://localhost:5001"; // Update to match backend URL

  const handleStatusChange = (e) => {
    const selectedValue = e.target.value;
    setStatus(selectedValue);

    switch (selectedValue) {
      case "ns-rejected":
        setMessage(
          "We regret to inform you that your application for the position has been rejected. This decision was made after a thorough review of your profile and qualifications. We encourage you to apply for other positions in the future that better align with your skills."
        );
        break;
      case "ns-shortlisted":
        setMessage("Congratulations! You have been shortlisted for the position.");
        break;
      case "ns-interviewcall":
        setMessage(
          "You are invited to attend an interview for the position. Please check your email for further details and confirm your availability."
        );
        break;
      case "ns-offer":
        setMessage(
          "We are pleased to offer you the position! Please review the offer letter sent to your email and let us know if you have any questions."
        );
        break;
      default:
        setMessage("");
    }
  };
  const sendEmail = async () => {
    try {
      const response = await fetch(`${baseUrl}/send-mail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: email, subject: `${name} - ${status}`, text: message }),
      });
  
      if (response.ok) {
        const result = await response.json();
        alert('Email sent successfully!');
      } else {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.error || 'Unknown error occurred';
        alert(`Failed to send email: ${errorMessage}`);
      }
    } catch (error) {
      alert(`An error occurred: ${error.message}`);
    }
  };
  
  

  return (
    <div>
      <form>
        <div className="ns-container">
          <label htmlFor="ns-name" className="ns-name">
            <strong>Your Name</strong>
          </label>
          <input
            type="text"
            id="ns-name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="ns-email" className="ns-email">
            <strong>Email Address</strong>
          </label>
          <input
            type="email"
            id="ns-email"
            placeholder="Enter the recipient's email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="ns-selectstatus" className="ns-selectstatus">
            <strong>Select Status</strong>
          </label>
          <select
            id="ns-selectstatus"
            value={status}
            onChange={handleStatusChange}
          >
            <option value="ns-select-an-option">Select an Option</option>
            <option value="ns-rejected">Rejected</option>
            <option value="ns-shortlisted">Shortlisted</option>
            <option value="ns-interviewcall">Interview Call</option>
            <option value="ns-offer">Offer</option>
          </select>

          <label htmlFor="ns-message" className="ns-message">
            <strong>Message</strong>
          </label>
          <textarea
            id="ns-message"
            value={message}
            readOnly
            rows="4"
            placeholder="Message will appear here based on the selected status"
          />
        </div>
        <button id="ns-send" type="button" onClick={sendEmail}>
          Send
        </button>
      </form>
    </div>
  );
}

export default NotifyStatus;
