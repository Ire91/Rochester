package com.example.demo.controller;

import com.example.demo.model.Booking;
import com.example.demo.repository.BookingRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {
    private final BookingRepository bookingRepository;

    public BookingController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        booking.setCreatedAt(LocalDateTime.now());
        return bookingRepository.save(booking);
    }

    @PutMapping("/{id}")
    public Booking updateBooking(@PathVariable Long id, @RequestBody Booking booking) {
        booking.setId(id);
        return bookingRepository.save(booking);
    }

    @DeleteMapping("/{id}")
    public void deleteBooking(@PathVariable Long id) {
        bookingRepository.deleteById(id);
    }

    @GetMapping("/{id}")
    public Optional<Booking> getBooking(@PathVariable Long id) {
        return bookingRepository.findById(id);
    }
} 