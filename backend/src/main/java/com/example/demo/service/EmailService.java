package com.example.demo.service;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.stereotype.Service;
import brevo.ApiClient;
import brevo.Configuration;
import brevo.auth.ApiKeyAuth;
import brevoApi.TransactionalEmailsApi;
import brevoModel.*;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class EmailService {

    private final TransactionalEmailsApi apiInstance;
    private final String senderEmail;
    private final String senderName;
    private final ConcurrentHashMap<String, String> otpStorage = new ConcurrentHashMap<>();

    private String readSecret(String key, Dotenv dotenv, String defaultValue) {
        String envValue = System.getenv(key);
        if (envValue != null && !envValue.isBlank()) {
            return envValue;
        }
        String dotenvValue = dotenv.get(key);
        if (dotenvValue != null && !dotenvValue.isBlank()) {
            return dotenvValue;
        }
        return defaultValue;
    }

    public EmailService() {
        Dotenv dotenv = Dotenv.configure()
                .directory("./")
                .ignoreIfMissing()
                .load();

        String apiKey = readSecret("BREVO_API_KEY", dotenv, null);
        this.senderEmail = readSecret("BREVO_SENDER_EMAIL", dotenv, null);
        this.senderName = readSecret("BREVO_SENDER_NAME", dotenv, "Work Folio");

        ApiClient defaultClient = Configuration.getDefaultApiClient();
        ApiKeyAuth apiKeyAuth = (ApiKeyAuth) defaultClient.getAuthentication("api-key");
        apiKeyAuth.setApiKey(apiKey);

        this.apiInstance = new TransactionalEmailsApi();
    }

    private String getHtmlTemplate(String title, String content) {
        return "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "<style>" +
                "  body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1b; margin: 0; padding: 0; background-color: #f4f7fa; }" +
                "  .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }" +
                "  .header { background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: white; padding: 40px 20px; text-align: center; }" +
                "  .header .logo { width: 50px; height: 50px; background: rgba(255,255,255,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; font-weight: bold; font-size: 24px; color: #fff; }" +
                "  .header h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }" +
                "  .content { padding: 40px; }" +
                "  .content h2 { color: #1e40af; font-size: 22px; font-weight: 700; margin-top: 0; }" +
                "  .otp-container { background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 30px; text-align: center; margin: 30px 0; }" +
                "  .otp-code { font-size: 32px; font-weight: 800; color: #2563eb; letter-spacing: 8px; margin: 0; }" +
                "  .footer { background-color: #f8fafc; padding: 30px; text-align: center; font-size: 13px; color: #64748b; }" +
                "  .footer p { margin: 5px 0; }" +
                "</style>" +
                "</head>" +
                "<body>" +
                "  <div class='container'>" +
                "    <div class='header'>" +
                "      <div class='logo'>W</div>" +
                "      <h1>Work Folio</h1>" +
                "    </div>" +
                "    <div class='content'>" +
                "      <h2>" + title + "</h2>" +
                "      " + content + "" +
                "    </div>" +
                "    <div class='footer'>" +
                "      <p><strong>Work Folio Team</strong></p>" +
                "      <p>Building the future of professional connections.</p>" +
                "      <p style='margin-top: 20px; font-size: 11px; opacity: 0.6;'>You received this email because you registered on Work Folio.</p>" +
                "    </div>" +
                "  </div>" +
                "</body>" +
                "</html>";
    }

    public void sendEmail(String to, String subject, String body) {
        String content = "<p>Hello,</p>" +
                "<p>" + body.replace("\n", "<br>") + "</p>" +
                "<p>Best regards,<br>The Work Folio Team</p>";
        
        String htmlContent = getHtmlTemplate(subject, content);
        executeSend(to, subject, htmlContent);
    }

    public void sendOtp(String email) {
        String otp = String.format("%06d", new Random().nextInt(999999));
        otpStorage.put(email, otp);

        String subject = "Verify Your Account";
        String content = "<p>Welcome to <strong>Work Folio</strong>!</p>" +
                "<p>To finalize your registration and secure your account, please use the verification code below:</p>" +
                "<div class='otp-container'>" +
                "  <p style='margin-bottom: 10px; font-size: 12px; color: #64748b; font-weight: 600; text-transform: uppercase;'>Verification Code</p>" +
                "  <div class='otp-code'>" + otp + "</div>" +
                "</div>" +
                "<p>This code will expire in 10 minutes. <em>For security reasons, do not share this code with anyone.</em></p>";
        
        String htmlContent = getHtmlTemplate("Account Verification", content);
        executeSend(email, subject, htmlContent);
    }

    private void executeSend(String to, String subject, String htmlContent) {
        SendSmtpEmail sendSmtpEmail = new SendSmtpEmail();
        sendSmtpEmail.setSender(new SendSmtpEmailSender().email(this.senderEmail).name(this.senderName));
        sendSmtpEmail.setTo(Collections.singletonList(new SendSmtpEmailTo().email(to)));
        sendSmtpEmail.setSubject(subject);
        sendSmtpEmail.setHtmlContent(htmlContent);

        try {
            apiInstance.sendTransacEmail(sendSmtpEmail);
        } catch (Exception e) {
            System.err.println("Brevo API Failure: " + e.getMessage());
            throw new RuntimeException("Brevo API Failure: " + e.getMessage());
        }
    }

    public boolean verifyOtp(String email, String otp) {
        String storedOtp = otpStorage.get(email);
        if (storedOtp != null && storedOtp.equals(otp)) {
            otpStorage.remove(email);
            return true;
        }
        return false;
    }
}
