package com.example.demo.config;

import com.example.demo.model.Room;
import com.example.demo.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private RoomService roomService;
    
    @Override
    public void run(String... args) throws Exception {
        initializeDefaultRooms();
    }
    
    private void initializeDefaultRooms() {
        // Check if rooms already exist
        List<Room> existingRooms = roomService.getAllRooms();
        if (!existingRooms.isEmpty()) {
            System.out.println("Rooms already exist, skipping initialization");
            return;
        }
        
        // Default rooms to create
        List<Room> defaultRooms = Arrays.asList(
            new Room("Basic Room", 7000, "Available", 
                "Comfortable basic room with essential amenities including a queen-size bed, private bathroom, air conditioning, and free Wi-Fi. Perfect for budget-conscious travelers.", 
                "/images/basic-room.jpg"),
            
            new Room("Standard Room", 10000, "Available", 
                "Standard room with modern amenities and better comfort. Features a king-size bed, private bathroom, air conditioning, free Wi-Fi, and a work desk.", 
                "/images/standard-room.jpg"),
            
            new Room("Deluxe Two Bedroom Apartment", 60000, "Available", 
                "Luxury apartment with two bedrooms and premium amenities. Includes two king-size beds, full kitchen, living room, private balcony, premium bathroom, and all modern conveniences.", 
                "/images/deluxe-apartment.jpg")
        );
        
        // Create each default room
        for (Room room : defaultRooms) {
            try {
                Room createdRoom = roomService.createRoom(room);
                System.out.println("Created default room: " + createdRoom.getRoomType() + " - ₦" + createdRoom.getRatePerNight());
            } catch (Exception e) {
                System.err.println("Error creating room " + room.getRoomType() + ": " + e.getMessage());
            }
        }
        
        System.out.println("Default rooms initialization completed!");
    }
} 