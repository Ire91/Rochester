package com.example.demo.controller;

import com.example.demo.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/auth")
@CrossOrigin(origins = "*")
public class AdminAuthController {
    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String password = payload.get("password");
        boolean authenticated = adminService.authenticate(username, password);
        Map<String, Object> response = new HashMap<>();
        response.put("success", authenticated);
        if (authenticated) {
            // For demo: return a simple session token (not secure for production)
            response.put("token", "demo-session-token");
        } else {
            response.put("message", "Invalid username or password");
        }
        return response;
    }
} 