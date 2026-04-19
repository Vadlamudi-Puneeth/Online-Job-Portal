package com.example.demo.controller;

import com.example.demo.dto.CreateJobRequest;
import com.example.demo.model.Job;
import com.example.demo.service.JobService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @PostMapping
    public ResponseEntity<Job> addJob(@Valid @RequestBody CreateJobRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(jobService.addJob(request));
    }

    @GetMapping
    public ResponseEntity<List<Job>> getJobs() {
        return ResponseEntity.ok(jobService.getAllJobs());
    }

    @GetMapping("/recruiter/{email}")
    public ResponseEntity<List<Job>> getJobsByRecruiter(@PathVariable String email) {
        return ResponseEntity.ok(jobService.getJobsByRecruiter(email));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable Long id, @Valid @RequestBody CreateJobRequest request) {
        return ResponseEntity.ok(jobService.updateJob(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
        return ResponseEntity.noContent().build();
    }
}
