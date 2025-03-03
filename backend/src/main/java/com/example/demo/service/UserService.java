package com.example.demo.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.model.User;
import com.example.demo.repository.Userrepository;

@Service
public class UserService {

    @Autowired
    private Userrepository userRepository;

    public User saveUser(User user){
        return userRepository.save(user);
    }
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);  // Query user by email
    }
}