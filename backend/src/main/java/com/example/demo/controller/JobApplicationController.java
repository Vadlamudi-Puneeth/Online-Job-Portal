package com.example.demo.controller;

import com.example.demo.model.JobApplication;
import com.example.demo.service.JobApplicationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.example.demo.service.EmailService;
import com.example.demo.dto.NotifyRequest;
import java.util.List;

@RestController
@RequestMapping("/api/jobapplication")
public class JobApplicationController {

    private final JobApplicationService service;
    private final EmailService emailService;

    public JobApplicationController(JobApplicationService service, EmailService emailService) {
        this.service = service;
        this.emailService = emailService;
    }

    @PostMapping
    public ResponseEntity<String> submitApplication(@Valid @RequestBody JobApplication jobApplication, Authentication authentication) {
        jobApplication.setEmail(authentication.getName());
        service.saveApplication(jobApplication);
        return ResponseEntity.ok("Application submitted successfully!");
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'RECRUITER')")
    @PostMapping("/notify")
    public ResponseEntity<String> notifyStatus(@RequestBody NotifyRequest request) {
        if (request.getId() != null && request.getStatus() != null) {
            service.updateStatus(request.getId(), request.getStatus());
        }
        
        String subject = "Update on your Job Application: " + (request.getStatus() != null ? request.getStatus() : "Review Status");
        String finalMessage = request.getMessage();
        if (request.getStatus() != null) {
            finalMessage = "Status: " + request.getStatus() + "\n\n" + finalMessage;
        }
        
        emailService.sendEmail(request.getEmail(), subject, finalMessage);
        return ResponseEntity.ok("Status updated and email sent successfully to " + request.getEmail());
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'RECRUITER')")
    @GetMapping
    public ResponseEntity<List<JobApplication>> getAllApplications() {
        return ResponseEntity.ok(service.getAllApplications());
    }

    @GetMapping("/my")
    public ResponseEntity<List<JobApplication>> getMyApplications(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(service.getApplicationsByEmail(email));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'RECRUITER')")
    @GetMapping("/domain/{domainName}")
    public ResponseEntity<List<JobApplication>> getApplicationsByDomain(@PathVariable String domainName) {
        return ResponseEntity.ok(service.getApplicationsByDomain(domainName));
    }
}
