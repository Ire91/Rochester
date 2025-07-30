# Rochester Hotel - Hotel Booking Web Application

A complete, production-oriented hotel booking web application built with Spring Boot for Rochester Hotel in Ibadan, Nigeria.

## Features

### Public Site
- **Home Page**: Hero section with availability checker and hotel information
- **Rooms & Rates**: Display room information and pricing (₦40,000/night)
- **Booking Flow**: Multi-step wizard (availability → guest details → review → payment → confirmation)
- **Bar & Dining**: Menu display with drinks and snacks
- **About & Contact**: Hotel information and contact form
- **Mobile-First Design**: Responsive Bootstrap 5 UI with brand colors

### Admin Portal
- **Dashboard**: Occupancy rates, revenue, today's arrivals/departures
- **Booking Management**: Search, view, modify, and cancel bookings
- **Room Management**: Room status, maintenance mode
- **Payment Tracking**: Transaction history and reconciliation
- **Content Management**: Edit website content, bar menu items
- **User Management**: Staff accounts and role management
- **Reports**: Export booking and revenue data

### Technical Features
- **Payment Integration**: Mock gateway + Paystack/Stripe abstraction
- **Email Notifications**: Booking confirmations and cancellations
- **REST API**: Full API for future mobile/SPA integration
- **Security**: Role-based access control, CSRF protection
- **Database**: PostgreSQL with H2 for development
- **Configurable**: All hotel details in YAML configuration

## Prerequisites

- **Java 21** (or Java 17 minimum)
- **Maven 3.6+**
- **PostgreSQL 12+** (for production)
- **SMTP Server** (for email notifications)

## Quick Start

### 1. Clone and Configure

```bash
git clone <repository-url>
cd rochester-hotel
```

### 2. Configure Application

Copy and edit the configuration:

```bash
cp src/main/resources/application.yaml src/main/resources/application-local.yaml
```

Edit `application-local.yaml` to customize hotel details:

```yaml
rochester:
  hotel:
    name: "Your Hotel Name"
    city: "Your City"
    address-line: "Your Address"
    phone: "+234 XXX XXX XXXX"
    email: "bookings@yourhotel.com"
    global-room-price: 4000000  # ₦40,000 in kobo
    max-rooms: 25
    payment-gateway: "MOCK"  # or "PAYSTACK"
```

### 3. Build and Run

#### Development Mode (H2 Database)
```bash
./mvnw clean install
./mvnw spring-boot:run -Dspring-boot.run.profiles=local
```

#### Production Mode (PostgreSQL)
```bash
# Set up PostgreSQL database
createdb rochester_hotel
createuser rochester_user --pwprompt

# Set environment variables
export DB_USERNAME=rochester_user
export DB_PASSWORD=your_password
export MAIL_HOST=smtp.gmail.com
export MAIL_USERNAME=your_email@gmail.com
export MAIL_PASSWORD=your_app_password

# Run application
./mvnw clean install
./mvnw spring-boot:run -Dspring-boot.run.profiles=prod
```

### 4. Access the Application

- **Public Website**: http://localhost:5050
- **Admin Portal**: http://localhost:5050/admin/dashboard
- **H2 Console** (dev only): http://localhost:5050/h2-console

#### Default Admin Credentials
- **Email**: admin@rochesterhotel.ng
- **Password**: ChangeMe123!

## Configuration Variables

All hotel-specific settings can be configured via environment variables or YAML:

| Variable | Default | Description |
|----------|---------|-------------|
| `HOTEL_NAME` | Rochester Hotel | Hotel name displayed throughout the site |
| `HOTEL_CITY` | Ibadan | City location |
| `HOTEL_COUNTRY` | Nigeria | Country |
| `HOTEL_ADDRESS_LINE` | KOLA BALOGUN STREET, ELEWURA BEHIND GLO OFFICE, CHALLENGE IBADAN | Full address |
| `HOTEL_PHONE` | +234 9011403364 | Contact phone number |
| `HOTEL_EMAIL` | bookings@rochesterhotel.ng | Contact email |
| `GLOBAL_ROOM_PRICE` | 4000000 | Room price per night in kobo (₦40,000) |
| `CURRENCY_CODE` | NGN | Currency code |
| `CHECKIN_TIME` | 14:00 | Check-in time |
| `CHECKOUT_TIME` | 12:00 | Check-out time |
| `MAX_ROOMS` | 25 | Total number of bookable rooms |
| `TAX_RATE_PERCENT` | 7.5 | VAT/tax percentage |
| `SERVICE_FEE_PERCENT` | 5.0 | Service fee percentage |
| `PAYMENT_GATEWAY` | MOCK | Payment gateway (MOCK/PAYSTACK/STRIPE) |

## Payment Gateway Setup

### Mock Gateway (Development)
No setup required. Provides a simulation interface for testing bookings.

### Paystack Integration
```yaml
payment:
  paystack:
    public-key: ${PAYSTACK_PUBLIC_KEY}
    secret-key: ${PAYSTACK_SECRET_KEY}
    webhook-secret: ${PAYSTACK_WEBHOOK_SECRET}
```

Set `PAYMENT_GATEWAY=PAYSTACK` in configuration.

### Stripe Integration
```yaml
payment:
  stripe:
    public-key: ${STRIPE_PUBLIC_KEY}
    secret-key: ${STRIPE_SECRET_KEY}
    webhook-secret: ${STRIPE_WEBHOOK_SECRET}
```

Set `PAYMENT_GATEWAY=STRIPE` in configuration.

## Database Schema

The application uses Flyway for database migrations. Schema includes:

- **users**: Staff and admin accounts
- **rooms**: Room inventory and status
- **bookings**: Guest reservations
- **payments**: Payment transactions
- **bar_items**: Bar menu items
- **content_blocks**: CMS content
- **room_rates**: Pricing (supports future dynamic pricing)

## API Endpoints

### Public API
- `GET /api/v1/availability` - Check room availability
- `POST /api/v1/bookings` - Create new booking
- `GET /api/v1/bookings/{code}` - Get booking details

### Admin API (Authentication Required)
- `POST /api/v1/bookings/{id}/confirm` - Confirm booking
- `POST /api/v1/bookings/{id}/cancel` - Cancel booking

## Email Templates

Email notifications are sent for:
- Booking confirmations
- Booking cancellations
- Contact form submissions

Templates are located in `src/main/resources/templates/email/`.

## Testing

```bash
# Run all tests
./mvnw test

# Run with coverage
./mvnw test jacoco:report
```

## Deployment

### Docker Deployment
```bash
# Build Docker image
docker build -t rochester-hotel .

# Run with PostgreSQL
docker-compose up -d
```

### Traditional Deployment
1. Build JAR: `./mvnw clean package`
2. Copy `target/rochester-hotel-1.0.0.jar` to server
3. Set environment variables
4. Run: `java -jar rochester-hotel-1.0.0.jar`

## Customization

### Branding
- Colors defined in CSS variables in templates
- Logo and images in `src/main/resources/static/images/`
- Brand colors: Deep Green (#004225) + Gold Accent (#c7a008)

### Content Management
- Edit content via Admin Portal → Content Pages
- Modify bar menu via Admin Portal → Bar Menu
- Upload images via static file management

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify PostgreSQL is running
   - Check database credentials
   - Ensure database exists

2. **Email Not Sending**
   - Verify SMTP configuration
   - Check firewall settings
   - Use app passwords for Gmail

3. **Payment Gateway Issues**
   - Verify API keys are correct
   - Check webhook URLs
   - Test with sandbox/test keys first

### Logs
Application logs are available at:
- Console output during development
- `/var/log/rochester-hotel/` in production

## Support

For technical support or customization requests, please contact the development team.

## License

MIT License - see LICENSE file for details.
