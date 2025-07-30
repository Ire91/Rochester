package com.example.demo.service;

import com.example.demo.model.Admin;
import com.example.demo.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;

    public Admin findByUsername(String username) {
        return adminRepository.findByUsername(username);
    }

    public boolean authenticate(String username, String rawPassword) {
        Admin admin = findByUsername(username);
        return admin != null && rawPassword.equals(admin.getPassword());
    }

    public Admin createAdmin(String username, String rawPassword) {
        Admin admin = new Admin();
        admin.setUsername(username);
        admin.setPassword(rawPassword); // Store plain text password (not secure)
        return adminRepository.save(admin);
    }
} 