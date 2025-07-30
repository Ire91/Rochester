package com.example.demo.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "rooms")
public class Room {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "room_type", nullable = false)
    @JsonProperty("roomType")
    private String roomType;
    
    @Column(name = "rate_per_night", nullable = false)
    @JsonProperty("ratePerNight")
    private Integer ratePerNight;
    
    @Column(name = "status", nullable = false)
    @JsonProperty("status")
    private String status;
    
    @Column(name = "description")
    @JsonProperty("description")
    private String description;
    
    @Column(name = "image_url")
    @JsonProperty("imageUrl")
    private String imageUrl;
    
    // Default constructor
    public Room() {}
    
    // Constructor with fields
    public Room(String roomType, Integer ratePerNight, String status, String description, String imageUrl) {
        this.roomType = roomType;
        this.ratePerNight = ratePerNight;
        this.status = status;
        this.description = description;
        this.imageUrl = imageUrl;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getRoomType() {
        return roomType;
    }
    
    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }
    
    public Integer getRatePerNight() {
        return ratePerNight;
    }
    
    public void setRatePerNight(Integer ratePerNight) {
        this.ratePerNight = ratePerNight;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getImageUrl() {
        return imageUrl;
    }
    
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
} 