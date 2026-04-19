package com.example.demo.dto;

import com.example.demo.model.Role;

public class AuthResponse {
    private String message;
    private String email;
    private String username;
    private Role role;
    private String basicToken;
    private String phoneNumber;
    private String cvFileName;
    private String cvFile;

    public AuthResponse() {
    }

    public AuthResponse(String message, String email, String username, Role role, String basicToken, String phoneNumber, String cvFileName, String cvFile) {
        this.message = message;
        this.email = email;
        this.username = username;
        this.role = role;
        this.basicToken = basicToken;
        this.phoneNumber = phoneNumber;
        this.cvFileName = cvFileName;
        this.cvFile = cvFile;
    }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public String getCvFileName() { return cvFileName; }
    public void setCvFileName(String cvFileName) { this.cvFileName = cvFileName; }
    public String getCvFile() { return cvFile; }
    public void setCvFile(String cvFile) { this.cvFile = cvFile; }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getBasicToken() {
        return basicToken;
    }

    public void setBasicToken(String basicToken) {
        this.basicToken = basicToken;
    }
}
