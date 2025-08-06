# 🚀 Deployment Guide - Rochester Hotel

This guide covers multiple deployment options for the Rochester Hotel application, from local development to production environments.

## 📋 Prerequisites

### System Requirements
- **Java:** 17 or higher
- **Maven:** 3.6+ (for building)
- **Memory:** Minimum 512MB RAM
- **Storage:** 100MB free space

### Verify Installation
```bash
# Check Java version
java -version

# Check Maven version
mvn -version

# Check available memory
java -XshowSettings:vm -version
```

## 🏠 Local Development Deployment

### Option 1: Maven Spring Boot Plugin
```bash
# Navigate to project directory
cd Rochester

# Run with Maven
mvn spring-boot:run

# Access application
# http://localhost:8080
```

### Option 2: JAR File
```bash
# Build the application
mvn clean package

# Run the JAR file
java -jar target/demo-0.0.1-SNAPSHOT.jar

# Access application
# http://localhost:8080
```

### Option 3: IDE (IntelliJ IDEA/Eclipse)
1. Open project in IDE
2. Run `DemoApplication.java`
3. Access at `http://localhost:8080`

## 🐳 Docker Deployment

### Create Dockerfile
```dockerfile
# Use OpenJDK 17 slim image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy the JAR file
COPY target/demo-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### Build and Run Docker Container
```bash
# Build the application first
mvn clean package

# Build Docker image
docker build -t rochester-hotel .

# Run container
docker run -p 8080:8080 rochester-hotel

# Access application
# http://localhost:8080
```

### Docker Compose (Recommended)
Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  rochester-hotel:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
    restart: unless-stopped
    volumes:
      - ./logs:/app/logs
```

Run with Docker Compose:
```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## ☁️ Cloud Deployment

### Heroku Deployment

#### Option 1: Heroku CLI
```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login to Heroku
heroku login

# Create Heroku app
heroku create rochester-hotel-app

# Set Java version
heroku config:set JAVA_VERSION=17

# Deploy
git push heroku main

# Open application
heroku open
```

#### Option 2: Heroku Dashboard
1. Go to [Heroku Dashboard](https://dashboard.heroku.com/)
2. Click "New" → "Create new app"
3. Connect GitHub repository
4. Enable automatic deploys
5. Deploy manually or wait for auto-deploy

### AWS Deployment

#### Option 1: AWS Elastic Beanstalk
```bash
# Install AWS CLI
# https://aws.amazon.com/cli/

# Configure AWS credentials
aws configure

# Create Elastic Beanstalk application
aws elasticbeanstalk create-application --application-name rochester-hotel

# Create environment
aws elasticbeanstalk create-environment \
  --application-name rochester-hotel \
  --environment-name rochester-hotel-prod \
  --solution-stack-name "64bit Amazon Linux 2 v3.4.0 running Corretto 17"
```

#### Option 2: AWS EC2
```bash
# Launch EC2 instance (Amazon Linux 2)
# Install Java and Maven
sudo yum update -y
sudo yum install java-17-amazon-corretto-devel -y
sudo yum install maven -y

# Clone repository
git clone https://github.com/Ire91/Rochester.git
cd Rochester

# Build and run
mvn clean package
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

### Google Cloud Platform

#### Option 1: Google App Engine
Create `app.yaml`:
```yaml
runtime: java17
env: standard

instance_class: F1

automatic_scaling:
  target_cpu_utilization: 0.6
  min_instances: 1
  max_instances: 10

handlers:
  - url: /.*
    script: auto
```

Deploy:
```bash
# Install Google Cloud SDK
# https://cloud.google.com/sdk/docs/install

# Initialize project
gcloud init

# Deploy to App Engine
gcloud app deploy
```

#### Option 2: Google Cloud Run
```bash
# Build and push to Container Registry
gcloud builds submit --tag gcr.io/PROJECT_ID/rochester-hotel

# Deploy to Cloud Run
gcloud run deploy rochester-hotel \
  --image gcr.io/PROJECT_ID/rochester-hotel \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## 🔧 Production Configuration

### Environment Variables
```bash
# Database configuration
SPRING_DATASOURCE_URL=jdbc:h2:file:./data/rochester
SPRING_DATASOURCE_USERNAME=admin
SPRING_DATASOURCE_PASSWORD=secure_password

# Server configuration
SERVER_PORT=8080
SERVER_SERVLET_CONTEXT_PATH=/

# Logging
LOGGING_LEVEL_ROOT=INFO
LOGGING_LEVEL_COM_ROCHESTERHOTEL=DEBUG

# Security
SPRING_SECURITY_USER_NAME=admin
SPRING_SECURITY_USER_PASSWORD=admin_password
```

### Application Properties
Create `application-prod.properties`:
```properties
# Production database
spring.datasource.url=jdbc:h2:file:./data/rochester
spring.datasource.username=${DB_USERNAME:admin}
spring.datasource.password=${DB_PASSWORD:secure_password}

# Server settings
server.port=${PORT:8080}
server.servlet.context-path=/

# Logging
logging.level.root=INFO
logging.level.com.rochesterhotel=DEBUG
logging.file.name=./logs/application.log

# Security
spring.security.user.name=${ADMIN_USERNAME:admin}
spring.security.user.password=${ADMIN_PASSWORD:admin_password}
```

### SSL/HTTPS Configuration
```properties
# SSL configuration
server.ssl.enabled=true
server.ssl.key-store=classpath:keystore.p12
server.ssl.key-store-password=your_keystore_password
server.ssl.key-store-type=PKCS12
server.ssl.key-alias=tomcat
```

## 📊 Monitoring and Logging

### Application Monitoring
```bash
# Health check endpoint
curl http://localhost:8080/actuator/health

# Application info
curl http://localhost:8080/actuator/info

# Metrics
curl http://localhost:8080/actuator/metrics
```

### Log Management
```bash
# View application logs
tail -f logs/application.log

# Monitor system resources
htop
df -h
free -h
```

### Performance Monitoring
- **JVM Metrics:** Monitor heap usage, GC activity
- **Database Metrics:** Connection pool, query performance
- **Application Metrics:** Response times, error rates

## 🔒 Security Considerations

### Production Security Checklist
- [ ] Use strong passwords for admin accounts
- [ ] Enable HTTPS/SSL
- [ ] Configure firewall rules
- [ ] Regular security updates
- [ ] Database backup strategy
- [ ] Monitor access logs
- [ ] Implement rate limiting
- [ ] Use environment variables for secrets

### Security Headers
Add to `application.properties`:
```properties
# Security headers
server.servlet.session.cookie.secure=true
server.servlet.session.cookie.http-only=true
server.servlet.session.cookie.same-site=strict
```

## 🚨 Troubleshooting

### Common Issues

**Application won't start**
```bash
# Check Java version
java -version

# Check port availability
netstat -an | grep 8080

# Check memory
java -XshowSettings:vm -version

# View detailed logs
tail -f logs/application.log
```

**Database connection issues**
```bash
# Check database file permissions
ls -la data/

# Verify database file exists
ls -la data/rochester.mv.db
```

**Static files not loading**
```bash
# Check file permissions
ls -la src/main/resources/static/

# Verify file paths
find src/main/resources/static -name "*.html"
```

### Performance Optimization
```bash
# JVM tuning for production
java -Xms512m -Xmx1024m -jar app.jar

# Enable G1GC
java -XX:+UseG1GC -jar app.jar

# Monitor with JConsole
jconsole
```

## 📈 Scaling Strategies

### Horizontal Scaling
- **Load Balancer:** Distribute traffic across multiple instances
- **Database Clustering:** Use external database (PostgreSQL, MySQL)
- **Caching:** Implement Redis for session management
- **CDN:** Serve static files from CDN

### Vertical Scaling
- **Memory:** Increase heap size based on usage
- **CPU:** Monitor CPU usage and scale accordingly
- **Storage:** Ensure adequate disk space for logs and data

## 🔄 CI/CD Pipeline

### GitHub Actions Example
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Set up JDK 17
      uses: actions/setup-java@v2
      with:
        java-version: '17'
        distribution: 'adopt'
    
    - name: Build with Maven
      run: mvn clean package
    
    - name: Deploy to Heroku
      uses: akhileshns/heroku-deploy@v3.12.12
      with:
        heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
        heroku_app_name: "rochester-hotel-app"
        heroku_email: "your-email@example.com"
```

## 📞 Support

### Getting Help
- **Documentation:** Check README.md and this guide
- **Issues:** Create GitHub issue with detailed description
- **Logs:** Include relevant log files when reporting issues
- **Environment:** Specify OS, Java version, and deployment method

### Emergency Procedures
1. **Application Down:** Check logs, restart service
2. **Database Issues:** Verify file permissions, restore backup
3. **Performance Issues:** Monitor resources, scale if needed
4. **Security Breach:** Change passwords, review logs, update security

---

**Last Updated:** December 2024  
**Version:** 1.0.0  
**Maintained by:** Development Team 