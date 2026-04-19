package com.example.demo.service;

import com.example.demo.model.JobApplication;
import com.example.demo.repository.JobApplicationRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class JobApplicationService {

    private final JobApplicationRepository repository;

    public JobApplicationService(JobApplicationRepository repository) {
        this.repository = repository;
    }

    public JobApplication saveApplication(JobApplication jobApplication) {
        String email = jobApplication.getEmail().trim().toLowerCase();
        String domainName = jobApplication.getDomainName().trim();

        jobApplication.setEmail(email);
        jobApplication.setDomainName(domainName);

        // Check if the user already applied for the job with the same domain and email
        if (checkIfAlreadyApplied(email, domainName)) {
            throw new IllegalArgumentException("You have already applied for this job.");
        }
        return repository.save(jobApplication);
    }

    public boolean checkIfAlreadyApplied(String email, String domainName) {
        return repository.existsByEmailAndDomainName(email, domainName);
    }

    public List<JobApplication> getAllApplications() {
        return repository.findAll();
    }

    public void updateStatus(Long id, String status) {
        JobApplication app = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Application not found"));
        app.setStatus(status);
        repository.save(app);
    }

    public List<JobApplication> getApplicationsByEmail(String email) {
        String normalizedEmail = email == null ? "" : email.trim().toLowerCase();
        return repository.findByEmail(normalizedEmail);
    }

    public List<JobApplication> getApplicationsByDomain(String domainName) {
        return repository.findByDomainName(domainName);
    }
}
