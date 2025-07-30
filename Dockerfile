# Use an official Java 17 runtime as base
FROM eclipse-temurin:17-jdk

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Make mvnw executable and build the app
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

# Expose port (Spring Boot uses 8080 by default)
EXPOSE 8080

# Run the packaged application
CMD ["java", "-jar", "target/demo-0.0.1-SNAPSHOT.jar"]
