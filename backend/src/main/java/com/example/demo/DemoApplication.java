package com.example.demo;

import com.example.demo.model.Job;
import com.example.demo.repository.JobRepository;
import com.example.demo.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Bean
	CommandLineRunner seedData(UserService userService, JobRepository jobRepository) {
		return args -> {
			userService.migrateLegacyUsers();
			userService.createDefaultAdmin("admin@workfolio.com", "admin123");

			if (jobRepository.count() == 0) {
				Job job1 = new Job();
				job1.setTitle("Software Engineer");
				job1.setLocation("Remote");
				job1.setDescription(
						"We are looking for a skilled Software Engineer to join our dynamic team. You will be responsible for developing high-quality applications.");
				job1.setCompanyName("Google");
				job1.setExperience("3-5 years");
				job1.setSalaryRange("$120k - $150k");
				job1.setSkillsRequired("Java, Spring Boot, Microservices");
				job1.setJobType("Full-time");
				jobRepository.save(job1);

				Job job2 = new Job();
				job2.setTitle("Frontend Developer");
				job2.setLocation("Bangalore");
				job2.setDescription(
						"Looking for a Frontend Developer with experience in React and modern CSS frameworks like Tailwind.");
				job2.setCompanyName("Meta");
				job2.setExperience("2-4 years");
				job2.setSalaryRange("$100k - $130k");
				job2.setSkillsRequired("React, TypeScript, Tailwind CSS");
				job2.setJobType("Contract");
				jobRepository.save(job2);

				Job job3 = new Job();
				job3.setTitle("Data Scientist");
				job3.setLocation("Hyderabad");
				job3.setDescription("Join our AI team to build state-of-the-art machine learning models.");
				job3.setCompanyName("Amazon");
				job3.setExperience("5+ years");
				job3.setSalaryRange("$150k - $200k");
				job3.setSkillsRequired("Python, PyTorch, SQL");
				job3.setJobType("Full-time");
				jobRepository.save(job3);

				System.out.println("Sample jobs seeded successfully!");
			}
		};
	}

}
