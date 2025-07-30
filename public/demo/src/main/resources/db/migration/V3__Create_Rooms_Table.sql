-- Create rooms table
CREATE TABLE rooms (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_type VARCHAR(255) NOT NULL,
    rate_per_night INT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Available',
    description TEXT,
    image_url VARCHAR(500)
); 