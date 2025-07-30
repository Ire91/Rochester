package com.example.demo.service;

import com.example.demo.model.Room;
import com.example.demo.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {
    
    @Autowired
    private RoomRepository roomRepository;
    
    // Get all rooms
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }
    
    // Get room by ID
    public Optional<Room> getRoomById(Long id) {
        return roomRepository.findById(id);
    }
    
    // Get room by room type
    public Optional<Room> getRoomByType(String roomType) {
        return roomRepository.findByRoomType(roomType);
    }
    
    // Get rooms by status
    public List<Room> getRoomsByStatus(String status) {
        return roomRepository.findByStatus(status);
    }
    
    // Create new room
    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }
    
    // Update room
    public Room updateRoom(Long id, Room roomDetails) {
        Optional<Room> room = roomRepository.findById(id);
        if (room.isPresent()) {
            Room existingRoom = room.get();
            existingRoom.setRoomType(roomDetails.getRoomType());
            existingRoom.setRatePerNight(roomDetails.getRatePerNight());
            existingRoom.setStatus(roomDetails.getStatus());
            existingRoom.setDescription(roomDetails.getDescription());
            existingRoom.setImageUrl(roomDetails.getImageUrl());
            return roomRepository.save(existingRoom);
        }
        return null;
    }
    
    // Delete room
    public boolean deleteRoom(Long id) {
        Optional<Room> room = roomRepository.findById(id);
        if (room.isPresent()) {
            roomRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    // Get room rate by room type
    public Integer getRoomRateByType(String roomType) {
        Optional<Room> room = roomRepository.findByRoomType(roomType);
        return room.map(Room::getRatePerNight).orElse(0);
    }
    
    // Check if room is available
    public boolean isRoomAvailable(String roomType) {
        Optional<Room> room = roomRepository.findByRoomType(roomType);
        return room.isPresent() && "Available".equals(room.get().getStatus());
    }
} 