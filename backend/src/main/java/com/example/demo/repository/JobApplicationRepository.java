package com.example.demo.repository;

import com.example.demo.model.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    boolean existsByEmailAndDomainName(String email, String domainName);
    List<JobApplication> findByEmail(String email);
    List<JobApplication> findByDomainName(String domainName);
}
