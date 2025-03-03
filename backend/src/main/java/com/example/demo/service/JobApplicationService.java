package com.example.demo.service;

import com.example.demo.model.JobApplication;
import com.example.demo.repository.JobApplicationRepository;
import org.springframework.stereotype.Service;

@Service
public class JobApplicationService {

    private final JobApplicationRepository repository;

    public JobApplicationService(JobApplicationRepository repository) {
        this.repository = repository;
    }

    public JobApplication saveApplication(JobApplication jobApplication) {
        // Check if the user already applied for the job with the same domain and email
        if (checkIfAlreadyApplied(jobApplication.getEmail(), jobApplication.getDomainName())) {
            throw new IllegalArgumentException("You have already applied for this job.");
        }
        return repository.save(jobApplication);
    }

    public boolean checkIfAlreadyApplied(String email, String domainName) {
        // Check if an application with the same email and domainName already exists
        return repository.existsByEmailAndDomainName(email, domainName);
    }
}
