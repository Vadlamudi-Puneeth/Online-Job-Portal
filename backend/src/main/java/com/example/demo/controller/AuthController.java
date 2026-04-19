package com.example.demo.controller;

import com.example.demo.dto.ApiMessage;
import com.example.demo.dto.AuthResponse;
import com.example.demo.dto.RegistrationRequest;
import com.example.demo.exception.InvalidCredentialsException;
import com.example.demo.model.LoginRequest;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.example.demo.dto.OtpRequest;
import com.example.demo.dto.OtpVerificationRequest;
import com.example.demo.service.EmailService;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    public AuthController(UserService userService, AuthenticationManager authenticationManager, EmailService emailService) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.emailService = emailService;
    }

    @PostMapping("/send-otp")
    public ResponseEntity<ApiMessage> sendOtp(@Valid @RequestBody OtpRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase();
        try {
            userService.findRequiredByEmail(normalizedEmail);
            // If we reach here, user exists
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiMessage("Email is already registered. Please login instead."));
        } catch (InvalidCredentialsException ex) {
            // User does not exist, safe to send OTP
            emailService.sendOtp(normalizedEmail);
            return ResponseEntity.ok(new ApiMessage("OTP sent successfully to " + normalizedEmail));
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<ApiMessage> verifyOtp(@Valid @RequestBody OtpVerificationRequest request) {
        boolean isValid = emailService.verifyOtp(request.getEmail(), request.getOtp());
        if (isValid) {
            return ResponseEntity.ok(new ApiMessage("OTP verified successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiMessage("Invalid or expired OTP"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<ApiMessage> register(@Valid @RequestBody RegistrationRequest request) {
        if (!request.getPassword().equals(request.getCpassword())) {
            throw new IllegalArgumentException("Password and confirm password must match");
        }

        userService.registerUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiMessage("User registered successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        String normalizedEmail = loginRequest.getEmail().trim().toLowerCase();
        String rawPassword = loginRequest.getPassword();

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(normalizedEmail, rawPassword)
            );
        } catch (Exception ex) {
            throw new InvalidCredentialsException("Invalid credentials");
        }

        User user = userService.findRequiredByEmail(normalizedEmail);
        String raw = normalizedEmail + ":" + rawPassword;
        String token = Base64.getEncoder().encodeToString(raw.getBytes(StandardCharsets.UTF_8));

        AuthResponse response = new AuthResponse(
                "Login successful",
                user.getEmail(),
                user.getUsername(),
                user.getRole(),
                token,
                user.getPhoneNumber(),
                user.getCvFileName(),
                user.getCvFile()
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<AuthResponse> me(Authentication authentication) {
        User user = userService.findRequiredByEmail(authentication.getName());
        AuthResponse response = new AuthResponse(
                "Authenticated",
                user.getEmail(),
                user.getUsername(),
                user.getRole(),
                null,
                user.getPhoneNumber(),
                user.getCvFileName(),
                user.getCvFile()
        );
        return ResponseEntity.ok(response);
    }

    @PutMapping("/profile")
    public ResponseEntity<User> updateProfile(Authentication authentication, @RequestBody User profileData) {
        return ResponseEntity.ok(userService.updateProfile(authentication.getName(), profileData));
    }

    @GetMapping("/users")
    public ResponseEntity<java.util.List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.findAllUsers());
    }
}
