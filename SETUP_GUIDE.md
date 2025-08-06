# 🛠️ Setup Guide - Rochester Hotel

A comprehensive guide to set up and run the Rochester Hotel project locally for development.

## 📋 Prerequisites

### Required Software
- **Java 17** or higher
- **Maven 3.6** or higher
- **Git** for version control
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

### System Requirements
- **RAM:** Minimum 2GB (4GB recommended)
- **Storage:** 500MB free space
- **OS:** Windows, macOS, or Linux

## 🔧 Installation Steps

### Step 1: Install Java

#### Windows
```bash
# Download OpenJDK 17 from Oracle or AdoptOpenJDK
# https://adoptium.net/temurin/releases/?version=17

# Add Java to PATH
# C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot\bin

# Verify installation
java -version
```

#### macOS
```bash
# Using Homebrew
brew install openjdk@17

# Add to PATH
echo 'export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Verify installation
java -version
```

#### Linux (Ubuntu/Debian)
```bash
# Update package list
sudo apt update

# Install OpenJDK 17
sudo apt install openjdk-17-jdk

# Verify installation
java -version
```

### Step 2: Install Maven

#### Windows
```bash
# Download Maven from https://maven.apache.org/download.cgi
# Extract to C:\Program Files\Apache\maven

# Add to PATH
# C:\Program Files\Apache\maven\bin

# Verify installation
mvn -version
```

#### macOS
```bash
# Using Homebrew
brew install maven

# Verify installation
mvn -version
```

#### Linux
```bash
# Install Maven
sudo apt install maven

# Verify installation
mvn -version
```

### Step 3: Install Git

#### Windows
```bash
# Download from https://git-scm.com/download/win
# Install with default settings

# Verify installation
git --version
```

#### macOS
```bash
# Using Homebrew
brew install git

# Verify installation
git --version
```

#### Linux
```bash
# Install Git
sudo apt install git

# Verify installation
git --version
```

## 🚀 Project Setup

### Step 1: Clone Repository
```bash
# Clone the repository
git clone https://github.com/Ire91/Rochester.git

# Navigate to project directory
cd Rochester

# Verify project structure
ls -la
```

### Step 2: Verify Project Structure
```
Rochester/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── rochesterhotel/
│   │   │           ├── controller/
│   │   │           ├── domain/
│   │   │           ├── repository/
│   │   │           └── service/
│   │   └── resources/
│   │       ├── static/
│   │       │   ├── index.html
│   │       │   ├── rooms.html
│   │       │   ├── booking.html
│   │       │   ├── styles.css
│   │       │   └── script.js
│   │       └── application.properties
├── pom.xml
└── README.md
```

### Step 3: Build Project
```bash
# Clean and compile
mvn clean compile

# Run tests (if any)
mvn test

# Package application
mvn package
```

### Step 4: Run Application

#### Option 1: Maven Spring Boot Plugin
```bash
# Run with Maven
mvn spring-boot:run

# Application will start on http://localhost:8080
```

#### Option 2: JAR File
```bash
# Run the packaged JAR
java -jar target/demo-0.0.1-SNAPSHOT.jar

# Application will start on http://localhost:8080
```

#### Option 3: IDE (Recommended for Development)
1. **IntelliJ IDEA:**
   - Open project in IntelliJ
   - Right-click on `DemoApplication.java`
   - Select "Run 'DemoApplication'"

2. **Eclipse:**
   - Import project as Maven project
   - Right-click on `DemoApplication.java`
   - Select "Run As" → "Java Application"

3. **VS Code:**
   - Install Java Extension Pack
   - Open project folder
   - Press F5 to run

## 🌐 Access the Application

### Main Pages
- **Home Page:** http://localhost:8080
- **Rooms Page:** http://localhost:8080/rooms.html
- **Booking Page:** http://localhost:8080/booking.html
- **Admin Dashboard:** http://localhost:8080/admin.html

### API Endpoints
- **Rooms API:** http://localhost:8080/api/rooms
- **Bookings API:** http://localhost:8080/api/bookings
- **Health Check:** http://localhost:8080/actuator/health

## 🔧 Development Setup

### IDE Configuration

#### IntelliJ IDEA
1. **Open Project:**
   - File → Open → Select project folder
   - Import as Maven project

2. **Configure Run Configuration:**
   - Run → Edit Configurations
   - Add new Spring Boot configuration
   - Main class: `com.rochesterhotel.DemoApplication`
   - JRE: 17

3. **Enable Auto-Import:**
   - Settings → Build Tools → Maven → Importing
   - Check "Import Maven projects automatically"

#### Eclipse
1. **Import Project:**
   - File → Import → Maven → Existing Maven Projects
   - Select project root directory

2. **Configure Run Configuration:**
   - Run → Run Configurations
   - Java Application
   - Main class: `com.rochesterhotel.DemoApplication`

#### VS Code
1. **Install Extensions:**
   - Extension Pack for Java
   - Spring Boot Extension Pack
   - Maven for Java

2. **Configure Settings:**
   - Java home path
   - Maven settings

### Hot Reload Setup
```bash
# Enable hot reload with Maven
mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Dspring.devtools.restart.enabled=true"
```

## 🧪 Testing the Setup

### Test 1: Application Startup
```bash
# Check if application starts successfully
curl http://localhost:8080/actuator/health

# Expected response: {"status":"UP"}
```

### Test 2: Frontend Pages
1. Open http://localhost:8080 in browser
2. Verify home page loads with hotel information
3. Test navigation between pages
4. Check mobile responsiveness

### Test 3: API Endpoints
```bash
# Test rooms API
curl http://localhost:8080/api/rooms

# Expected response: JSON array of rooms
```

### Test 4: Mobile Features
1. Open browser developer tools
2. Enable mobile device simulation
3. Test hamburger menu functionality
4. Verify theme toggle works on mobile

## 🔍 Troubleshooting

### Common Issues

#### Issue 1: Port 8080 Already in Use
```bash
# Check what's using port 8080
netstat -ano | findstr :8080  # Windows
lsof -i :8080                 # macOS/Linux

# Kill the process or change port
# In application.properties:
server.port=8081
```

#### Issue 2: Java Version Mismatch
```bash
# Check Java version
java -version

# Should show Java 17 or higher
# If not, update JAVA_HOME environment variable
```

#### Issue 3: Maven Dependencies Not Downloading
```bash
# Clear Maven cache
mvn dependency:purge-local-repository

# Update dependencies
mvn clean install -U
```

#### Issue 4: Static Files Not Loading
```bash
# Check file permissions
ls -la src/main/resources/static/

# Verify file paths are correct
# Ensure files are in correct directory
```

#### Issue 5: Database Connection Issues
```bash
# Check if H2 database is working
# Application should create database automatically
# Check logs for database initialization messages
```

### Debug Mode
```bash
# Run with debug logging
mvn spring-boot:run -Dlogging.level.com.rochesterhotel=DEBUG

# Or set in application.properties:
logging.level.com.rochesterhotel=DEBUG
```

## 📁 Project Structure Deep Dive

### Backend Structure
```
src/main/java/com/rochesterhotel/
├── controller/          # REST API controllers
│   ├── HomeController.java
│   ├── BookingController.java
│   └── AdminController.java
├── domain/             # Data models
│   ├── Room.java
│   ├── Booking.java
│   └── User.java
├── repository/         # Data access layer
│   ├── RoomRepository.java
│   └── BookingRepository.java
├── service/           # Business logic
│   ├── RoomService.java
│   └── BookingService.java
└── DemoApplication.java  # Main application class
```

### Frontend Structure
```
src/main/resources/static/
├── index.html         # Home page
├── rooms.html         # Rooms listing
├── booking.html       # Booking form
├── admin.html         # Admin dashboard
├── styles.css         # Main stylesheet
├── script.js          # Main JavaScript
└── images/           # Static assets
    ├── logo.png
    └── room-images/
```

## 🛠️ Development Workflow

### 1. Making Changes
```bash
# 1. Create feature branch
git checkout -b feature/new-feature

# 2. Make changes to code
# 3. Test changes locally
# 4. Commit changes
git add .
git commit -m "Add new feature"

# 5. Push to remote
git push origin feature/new-feature
```

### 2. Testing Changes
```bash
# Run application
mvn spring-boot:run

# Test in browser
# http://localhost:8080

# Test API endpoints
curl http://localhost:8080/api/rooms
```

### 3. Code Quality
```bash
# Check code style
mvn checkstyle:check

# Run tests
mvn test

# Generate documentation
mvn javadoc:javadoc
```

## 📚 Additional Resources

### Documentation
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Maven Documentation](https://maven.apache.org/guides/)
- [H2 Database Documentation](https://www.h2database.com/html/main.html)

### Tools
- **Postman:** API testing
- **Browser DevTools:** Frontend debugging
- **Maven Wrapper:** Consistent Maven version

### Best Practices
- Always test on multiple browsers
- Test mobile responsiveness
- Keep dependencies updated
- Document API changes
- Use meaningful commit messages

---

**Setup Status:** ✅ Complete  
**Next Steps:** Start developing features or deploy to production  
**Support:** Create GitHub issue for setup problems 