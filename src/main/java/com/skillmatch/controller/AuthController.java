package com.skillmatch.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final Map<String, UserData> users = new HashMap<>();

    private static class UserData {
        String password;
        String name;
        String role;

        UserData(String password, String name, String role) {
            this.password = password;
            this.name = name;
            this.role = role;
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email and password are required"));
        }

        UserData userData = users.get(email);
        if (userData != null && userData.password.equals(password)) {
            Map<String, Object> response = new HashMap<>();
            response.put("token", "dummy-token-" + email);
            response.put("name", userData.name);
            response.put("role", userData.role);
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.badRequest().body(Map.of("message", "Invalid credentials"));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        String name = request.get("name");
        String role = request.get("role");

        if (email == null || password == null || name == null || role == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "All fields are required"));
        }

        if (users.containsKey(email)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email already registered"));
        }

        users.put(email, new UserData(password, name, role));
        Map<String, Object> response = new HashMap<>();
        response.put("token", "dummy-token-" + email);
        response.put("name", name);
        response.put("role", role);
        return ResponseEntity.ok(response);
    }
}


