package com.example.demo.repository;

import com.example.demo.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    
    // Find room by room type
    Optional<Room> findByRoomType(String roomType);
    
    // Find rooms by status
    List<Room> findByStatus(String status);
    
    // Find rooms with rate greater than specified amount
    List<Room> findByRatePerNightGreaterThan(Integer rate);
    
    // Find rooms with rate less than specified amount
    List<Room> findByRatePerNightLessThan(Integer rate);
} 