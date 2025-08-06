# 🏨 Rochester Hotel - Hotel Management System

A modern, responsive hotel management system built with Spring Boot backend and vanilla HTML/CSS/JavaScript frontend. Features room booking, admin dashboard, and beautiful UI with dark/light theme support.

## ✨ Features

### 🎨 Frontend Features
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Dark/Light Theme** - Toggle between themes with persistent preference
- **Modern UI** - Beautiful, professional design with smooth animations
- **Mobile Navigation** - Hamburger menu with theme toggle for mobile devices
- **Interactive Booking** - Multi-step booking process with form validation
- **Room Gallery** - Dynamic room display with images and descriptions

### 🔧 Backend Features
- **Spring Boot API** - RESTful endpoints for room management
- **Booking System** - Complete booking workflow with status tracking
- **Admin Dashboard** - Manage bookings, rooms, and hotel operations
- **Database Integration** - H2 in-memory database for development
- **Security** - Basic authentication for admin access

### 📱 Mobile-First Design
- **Hamburger Menu** - Clean mobile navigation
- **Touch-Friendly** - Large buttons and touch targets
- **Responsive Forms** - Optimized for mobile input
- **Theme Toggle** - Accessible in mobile menu

## 🚀 Quick Start

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- Modern web browser

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ire91/Rochester.git
   cd Rochester
   ```

2. **Run the Spring Boot application**
   ```bash
   mvn spring-boot:run
   ```

3. **Access the application**
   - Main site: http://localhost:8080
   - Admin dashboard: http://localhost:8080/admin.html
   - API endpoints: http://localhost:8080/api/rooms

### Project Structure
```
Rochester/
├── src/main/resources/static/     # Frontend files
│   ├── index.html                 # Home page
│   ├── rooms.html                 # Rooms page
│   ├── booking.html               # Booking page
│   ├── admin.html                 # Admin dashboard
│   ├── styles.css                 # Main stylesheet
│   ├── script.js                  # Main JavaScript
│   └── images/                    # Images and assets
├── src/main/java/                 # Java backend
│   └── com/example/demo/
│       ├── controller/            # REST controllers
│       ├── model/                 # Data models
│       ├── repository/            # Data access layer
│       └── DemoApplication.java   # Main application
└── pom.xml                        # Maven dependencies
```

## 🛠️ Development

### Frontend Development
- **HTML Structure** - Semantic, accessible markup
- **CSS Styling** - CSS custom properties for theming
- **JavaScript** - Vanilla JS with modern ES6+ features
- **Responsive Design** - Mobile-first approach with media queries

### Backend Development
- **Spring Boot** - Rapid application development
- **REST API** - Clean, RESTful endpoints
- **H2 Database** - In-memory database for development
- **Maven** - Dependency management and build tool

## 🚀 Deployment

### Option 1: Traditional Deployment
1. **Build the application**
   ```bash
   mvn clean package
   ```

2. **Run the JAR file**
   ```bash
   java -jar target/demo-0.0.1-SNAPSHOT.jar
   ```

### Option 2: Docker Deployment
1. **Create Dockerfile**
   ```dockerfile
   FROM openjdk:17-jdk-slim
   COPY target/demo-0.0.1-SNAPSHOT.jar app.jar
   EXPOSE 8080
   ENTRYPOINT ["java","-jar","/app.jar"]
   ```

2. **Build and run**
   ```bash
   docker build -t rochester-hotel .
   docker run -p 8080:8080 rochester-hotel
   ```

### Option 3: Cloud Deployment
- **Heroku** - Easy deployment with Git integration
- **AWS** - Scalable cloud deployment
- **Google Cloud** - Enterprise-grade hosting

## 📊 API Endpoints

### Rooms API
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/{id}` - Get specific room
- `POST /api/rooms` - Create new room
- `PUT /api/rooms/{id}` - Update room
- `DELETE /api/rooms/{id}` - Delete room

### Bookings API
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/{id}` - Update booking status

## 🎨 Customization

### Theme Colors
The application uses CSS custom properties for easy theming:
```css
:root {
  --brand-green: #004225;
  --brand-gold: #c7a008;
  --brand-white: #fff;
  --brand-bg: #f5f6fa;
  --brand-dark: #222;
}
```

### Adding New Pages
1. Create HTML file in `src/main/resources/static/`
2. Include `styles.css` and `script.js`
3. Add navigation links
4. Test responsiveness

## 🐛 Troubleshooting

### Common Issues

**Application won't start**
- Check Java version: `java -version`
- Verify Maven installation: `mvn -version`
- Check port availability: `netstat -an | grep 8080`

**Static files not loading**
- Ensure files are in `src/main/resources/static/`
- Check browser console for 404 errors
- Verify file permissions

**Mobile responsiveness issues**
- Test on actual mobile devices
- Check viewport meta tag
- Verify CSS media queries

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Spring Boot** - For the excellent framework
- **Unsplash** - For beautiful hotel images
- **Modern CSS** - For responsive design techniques
- **Vanilla JavaScript** - For clean, maintainable code

---

**Built with ❤️ for Rochester Hotel**
