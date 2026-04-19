package com.example.demo.service;

import com.example.demo.dto.CreateJobRequest;
import com.example.demo.model.Job;
import com.example.demo.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public Job addJob(CreateJobRequest request) {
        Job job = new Job();
        mapRequestToJob(request, job);
        return jobRepository.save(job);
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Job updateJob(Long id, CreateJobRequest request) {
        Job job = jobRepository.findById(id).orElseThrow(() -> new RuntimeException("Job not found"));
        mapRequestToJob(request, job);
        return jobRepository.save(job);
    }

    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }

    public List<Job> getJobsByRecruiter(String email) {
        return jobRepository.findByPostedByEmail(email);
    }

    private void mapRequestToJob(CreateJobRequest request, Job job) {
        job.setTitle(request.getTitle());
        job.setLocation(request.getLocation());
        job.setDescription(request.getDescription());
        job.setCompanyName(request.getCompanyName());
        job.setExperience(request.getExperience());
        job.setSalaryRange(request.getSalaryRange());
        job.setSkillsRequired(request.getSkillsRequired());
        job.setJobType(request.getJobType());
        job.setPostedByEmail(request.getPostedByEmail());
    }
}
