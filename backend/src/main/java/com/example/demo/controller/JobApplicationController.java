package com.example.demo.controller;

import com.example.demo.model.JobApplication;
import com.example.demo.service.JobApplicationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jobapplication")
@CrossOrigin(origins = "http://localhost:3000") // Adjust according to your React app URL
public class JobApplicationController {

    private final JobApplicationService service;

    public JobApplicationController(JobApplicationService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<String> submitApplication(@RequestBody JobApplication jobApplication) {
        try {
            service.saveApplication(jobApplication);
            return ResponseEntity.ok("Application submitted successfully!");
        } catch (IllegalArgumentException e) {
            // If user has already applied for this job, return specific error message
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            // Generic error message for other exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to submit application: " + e.getMessage());
        }
    }
}
