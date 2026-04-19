import React, { useMemo } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

// Modern theme aligned with Work Folio branding
const theme = {
    background: '#f8fafc',
    fontFamily: 'Inter, system-ui, sans-serif',
    headerBgColor: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    headerFontColor: '#fff',
    headerFontSize: '16px',
    botBubbleColor: '#2563eb',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#1e293b',
};

function ChatBot1() {
    const steps = useMemo(
        () => [
            {
                id: "Greet",
                message: "👋 Hi there! Welcome to Work Folio support.",
                trigger: "Ask Name",
            },
            {
                id: "Ask Name",
                message: "I'd love to know your name before we begin.",
                trigger: "waiting1",
            },
            {
                id: "waiting1",
                user: true,
                trigger: "Name",
            },
            {
                id: "Name",
                message: "Great to meet you, {previousValue}! 🚀 How can I assist you today?",
                trigger: "issues",
            },
            {
                id: "issues",
                options: [
                    { value: "Job Openings", label: "🔍 Job Openings", trigger: "Job Opening" },
                    { value: "Mock Test", label: "📝 Mock Tests", trigger: "Mock Test" },
                    { value: "Support", label: "📞 Support / Contact", trigger: "Contact Us" },
                    { value: "Bye", label: "❌ Just looking", trigger: "Goodbye" }
                ],
            },
            {
                id: "Job Opening",
                message: "You can find all active listings in the 'Job Library'. Recruiters post daily! Need a direct link?",
                trigger: "Ask More",
            },
            {
                id: "Mock Test",
                message: "Our AI-powered mock tests cover Java, Python, and C++. Perfect for interview prep!",
                trigger: "Ask More",
            },
            {
                id: "Contact Us",
                message: "You can reach our team at support@workfolio.com or visit our Contact page for faster response.",
                trigger: "Ask More",
            },
            {
                id: "Ask More",
                message: "Is there anything else I can help with?",
                trigger: "issues", 
            },
            {
                id: "Goodbye",
                message: "Happy job hunting! 🌟 Feel free to come back anytime.",
                end: true,
            },
        ],
        [] 
    );

    return (
        <div className="w-full h-full font-sans">
            <ThemeProvider theme={theme}>
                <ChatBot 
                    steps={steps} 
                    headerTitle="Work Folio AI"
                    placeholder="Ask me anything..."
                    botAvatar="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
                    width="100%"
                    height="auto"
                    style={{ borderRadius: '0', boxShadow: 'none' }}
                />
            </ThemeProvider>
        </div>
    );
}

export default ChatBot1;
