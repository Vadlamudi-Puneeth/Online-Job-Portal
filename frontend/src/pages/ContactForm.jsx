import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const ContactForm = () => {
  const [contactFormData, setFormData] = useState({
    email: '',
    option: '',
    message: '',
  });
  const [alertMessage, setAlertMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const predefinedMessages = {
    rejected: `We regret to inform you that after careful consideration, we have decided not to proceed with your application. This decision was based on a variety of factors including the highly competitive nature of the position. While we are unable to offer you a role at this time, we appreciate the time and effort you put into your application. We wish you the best in your job search and future endeavors. Thank you again for your interest in our company.`,
    shortlisted: `Congratulations! We are pleased to inform you that your application has been shortlisted for the next phase of the hiring process. We were impressed with your qualifications and experience, and we would like to invite you for an interview. The next steps will be communicated shortly, so please stay tuned. We look forward to further discussing your application and how your skills align with the position. Thank you for your continued interest in this opportunity.`,
    interview: `We are pleased to inform you that we have scheduled an interview for the position you applied for. The interview will take place on [Date] at [Time]. Please ensure that you are available at the scheduled time, and we recommend preparing for questions related to your experience, skills, and the role itself. Further details regarding the interview format and location will be sent to you separately. We are excited to meet with you and discuss your potential fit for the position.`,
    offer: `Congratulations! We are thrilled to extend an offer for you to join our team as a [Position]. After reviewing your qualifications, skills, and interview performance, we are confident that you will be a valuable addition to our organization. Your offer includes competitive compensation, benefits, and a supportive work environment. Please find the detailed offer letter attached. We look forward to welcoming you aboard and working together on exciting projects. Please let us know your decision by [Date].`,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update formData based on the option selected
    if (name === 'option') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        message: predefinedMessages[value] || '', // Set message based on selected option
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    // Ensure the message is populated
    if (!contactFormData.message) {
      setErrorMessage('Please select an option to generate a message.');
      return; // Prevent further execution if the message is missing
    }

    try {
      const response = await fetch('http://localhost:5002/send-mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactFormData), // Send data as JSON
      });

      if (response.ok) {
        setAlertMessage('Email sent successfully!');
        setFormData({ email: '', option: '' , message: ''}); // Reset form data
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error:', error); // Log any error in the console
      setErrorMessage(error.message);
    }
  };

  return (
    <Container>
      <section id="contact-us" className="my-5">
        <h2 className="text-center mb-4">Send mail for shortlisted candidates</h2>
        {alertMessage && <Alert variant="success">{alertMessage}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form onSubmit={handleSubmitForm}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter recipient email"
                  name="email"
                  value={contactFormData.email}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="formOption">
                <Form.Label>Select an Option</Form.Label>
                <Form.Control
                  as="select"
                  name="option"
                  value={contactFormData.option}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Choose...
                  </option>
                  <option value="rejected">Rejected</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="interview">Interview Call</option>
                  <option value="offer">Offer Letter</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="formMessage" className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              placeholder="Your message"
              name="message"
              value={contactFormData.message}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <div className="text-center">
            <Button variant="primary" type="submit">
              Send Mail
            </Button>
          </div>
        </Form>
      </section>
    </Container>
  );
};

export default ContactForm;
