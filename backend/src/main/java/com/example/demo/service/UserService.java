package com.example.demo.service;

import com.example.demo.dto.RegistrationRequest;
import com.example.demo.exception.EmailAlreadyExistsException;
import com.example.demo.exception.InvalidCredentialsException;
import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.CompatiblePasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public User registerUser(RegistrationRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase();
        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new EmailAlreadyExistsException("Email already exists");
        }
        if (userRepository.existsByUsername(request.getUsername().trim())) {
            throw new IllegalArgumentException("Username already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername().trim());
        user.setEmail(normalizedEmail);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole() != null ? request.getRole() : Role.JOB_SEEKER);
        user.setPhoneNumber(request.getPhoneNumber());
        return userRepository.save(user);
    }

    public User findRequiredByEmail(String email) {
        String normalizedEmail = email == null ? "" : email.trim().toLowerCase();
        return userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new InvalidCredentialsException("Invalid credentials"));
    }

    public User createDefaultAdmin(String email, String rawPassword) {
        return userRepository.findByEmail(email)
                .orElseGet(() -> {
                    User admin = new User();
                    admin.setUsername("Admin");
                    admin.setEmail(email);
                    admin.setPassword(passwordEncoder.encode(rawPassword));
                    admin.setRole(Role.ADMIN);
                    return userRepository.save(admin);
                });
    }

    public User updateProfile(String email, User profileData) {
        User user = findRequiredByEmail(email);
        if (profileData.getUsername() != null) user.setUsername(profileData.getUsername());
        if (profileData.getPhoneNumber() != null) user.setPhoneNumber(profileData.getPhoneNumber());
        if (profileData.getCvFile() != null) {
            user.setCvFile(profileData.getCvFile());
            user.setCvFileName(profileData.getCvFileName());
        }
        return userRepository.save(user);
    }

    public void migrateLegacyUsers() {
        List<User> users = userRepository.findAll();
        for (User user : users) {
            boolean changed = false;

            if (user.getRole() == null) {
                user.setRole(Role.JOB_SEEKER);
                changed = true;
            }

            if (user.getPassword() != null && !isBcrypt(user.getPassword())) {
                user.setPassword(passwordEncoder.encode(user.getPassword()));
                changed = true;
            }

            if (changed) {
                userRepository.save(user);
            }
        }
    }

    private boolean isBcrypt(String password) {
        if (passwordEncoder instanceof CompatiblePasswordEncoder compatible) {
            return compatible.isBcryptHash(password);
        }

        return password != null && (password.startsWith("$2a$") || password.startsWith("$2b$") || password.startsWith("$2y$"));
    }
}