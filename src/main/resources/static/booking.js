// Configuration
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
  ? 'http://localhost:5050' 
  : window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');

// Date validation setup
function setMinDates() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // Format dates for input min attribute (YYYY-MM-DD)
  const todayStr = today.toISOString().split('T')[0];
  const tomorrowStr = tomorrow.toISOString().split('T')[0];
  
  // Set minimum dates
  const checkInInput = document.getElementById('checkIn');
  const checkOutInput = document.getElementById('checkOut');
  
  if (checkInInput) {
    checkInInput.min = todayStr; // Can book for today
    console.log('Set check-in min date to:', todayStr);
  }
  if (checkOutInput) {
    checkOutInput.min = tomorrowStr; // Check-out must be tomorrow or later
    console.log('Set check-out min date to:', tomorrowStr);
  }
}

// Validate dates
function validateDates() {
  const checkIn = document.getElementById('checkIn').value;
  const checkOut = document.getElementById('checkOut').value;
  
  console.log('Validating dates:', { checkIn, checkOut });
  
  // Check if fields are empty
  if (!checkIn || !checkOut) {
    alert('Please select both check-in and check-out dates.');
    return false;
  }
  
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  console.log('Date comparison:', {
    checkInDate: checkInDate.toISOString(),
    checkOutDate: checkOutDate.toISOString(),
    today: today.toISOString(),
    tomorrow: tomorrow.toISOString()
  });
  
  // Check if check-in is today or in the past
  if (checkInDate < today) {
    alert('Check-in date cannot be in the past. You can book for today or any future date.');
    return false;
  }
  
  // Check if check-out is before or same as check-in
  if (checkOutDate <= checkInDate) {
    alert('Check-out date must be after check-in date.');
    return false;
  }
  
  // Check if booking is too far in advance (e.g., more than 1 year)
  const maxAdvanceDate = new Date();
  maxAdvanceDate.setFullYear(maxAdvanceDate.getFullYear() + 1);
  
  if (checkInDate > maxAdvanceDate) {
    alert('Bookings cannot be made more than 1 year in advance.');
    return false;
  }
  
  console.log('Date validation passed');
  return true;
}

// Set up date validation when page loads
document.addEventListener('DOMContentLoaded', function() {
  setMinDates();
  
  // Update check-out min date when check-in changes
  const checkInInput = document.getElementById('checkIn');
  const checkOutInput = document.getElementById('checkOut');
  
  if (checkInInput && checkOutInput) {
    checkInInput.addEventListener('change', function() {
      if (this.value) {
        const nextDay = new Date(this.value);
        nextDay.setDate(nextDay.getDate() + 1);
        checkOutInput.min = nextDay.toISOString().split('T')[0];
        
        // If check-out is before new check-in, clear it
        if (checkOutInput.value && checkOutInput.value <= this.value) {
          checkOutInput.value = '';
        }
      }
    });
  }
});

// Pre-fill room type from query string
function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name) || '';
}
const roomTypeInput = document.getElementById('roomType');
if (roomTypeInput) {
  const room = getQueryParam('room');
  if (room) roomTypeInput.value = room + ' Room';
  else roomTypeInput.value = '';
}

const bookingForm = document.getElementById('bookingForm');
const reviewDiv = document.getElementById('booking-review');
const thankYou = document.getElementById('booking-thankyou');
const reviewBtn = document.getElementById('reviewBtn');
const confirmBtn = document.getElementById('confirmBtn');
const editBtn = document.getElementById('editBtn');
const reviewList = document.getElementById('reviewList');
const steps = document.querySelectorAll('.step');

function setStep(idx) {
  steps.forEach((s, i) => s.classList.toggle('active', i === idx));
}

if (bookingForm && reviewBtn && reviewDiv && reviewList && confirmBtn && editBtn && thankYou) {
  reviewBtn.addEventListener('click', function() {
    // Validate fields
    let valid = true;
    const fields = bookingForm.querySelectorAll('input, textarea');
    fields.forEach(f => {
      if (!f.value.trim()) {
        f.style.borderColor = 'red';
        valid = false;
      } else {
        f.style.borderColor = '';
      }
    });
    if (!valid) return;
    // Fill review list
    reviewList.innerHTML = '';
    fields.forEach(f => {
      if (f.type !== 'submit' && f.type !== 'button') {
        const label = f.closest('label') ? f.closest('label').childNodes[0].textContent.trim() : f.name;
        reviewList.innerHTML += `<li><strong>${label}:</strong> ${f.value}</li>`;
      }
    });
    bookingForm.style.display = 'none';
    reviewDiv.style.display = 'block';
    thankYou.style.display = 'none';
    setStep(1);
  });
  editBtn.addEventListener('click', function() {
    bookingForm.style.display = '';
    reviewDiv.style.display = 'none';
    thankYou.style.display = 'none';
    setStep(0);
  });
  confirmBtn.addEventListener('click', function() {
    // Gather booking details
    const fields = bookingForm.querySelectorAll('input, textarea');
    const bookingDetails = {};
    fields.forEach(f => {
      if (f.type !== 'submit' && f.type !== 'button') {
        const label = f.closest('label') ? f.closest('label').childNodes[0].textContent.trim() : f.name;
        bookingDetails[label] = f.value;
      }
    });
    localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
    window.location.href = 'booking-summary.html';
  });
}

// Make sure EmailJS is loaded
// <script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>

// Initialize EmailJS (replace with your actual public key)
(function(){
  emailjs.init('AIYsGwyvxdvg0EFKl');
})();

// Room prices - will be loaded from backend
let ROOM_PRICES = {};

// Load room prices from backend
async function loadRoomPrices() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/rooms`);
    if (response.ok) {
      const rooms = await response.json();
      ROOM_PRICES = {}; // Clear old prices
      
      // Populate room type select options
      const roomTypeSelect = document.getElementById('roomType');
      if (roomTypeSelect) {
        // Clear existing options except the first one
        roomTypeSelect.innerHTML = '<option value="">Select a room type</option>';
        
        rooms.forEach(room => {
          ROOM_PRICES[room.roomType] = room.ratePerNight;
          
          // Add option to select
          const option = document.createElement('option');
          option.value = room.roomType;
          option.textContent = `${room.roomType} (₦${room.ratePerNight.toLocaleString()}/night)`;
          roomTypeSelect.appendChild(option);
        });
      }
      
      console.log('Room prices loaded:', ROOM_PRICES);
      
      // Update price display if room type is selected
      updatePriceDisplay();
    } else {
      console.error('Failed to load room prices');
    }
  } catch (error) {
    console.error('Error loading room prices:', error);
  }
}

// Update price display
function updatePriceDisplay() {
  const roomType = document.getElementById('roomType').value;
  const priceDisplay = document.getElementById('priceDisplay');
  
  if (roomType && ROOM_PRICES[roomType]) {
    const price = ROOM_PRICES[roomType];
    if (priceDisplay) {
      priceDisplay.textContent = `₦${price.toLocaleString()}/night`;
    }
    console.log(`Updated price for ${roomType}: ₦${price.toLocaleString()}`);
  }
}

// Initialize room prices on page load
document.addEventListener('DOMContentLoaded', function() {
  loadRoomPrices();
  
  // Update price when room type changes
  const roomTypeSelect = document.getElementById('roomType');
  if (roomTypeSelect) {
    roomTypeSelect.addEventListener('change', updatePriceDisplay);
  }
});

function calculateNights(checkIn, checkOut) {
  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  const diff = (outDate - inDate) / (1000 * 60 * 60 * 24);
  return Math.max(1, diff);
}

document.getElementById('booking-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  console.log('Form submitted, validating dates...');
  
  // Validate dates before proceeding
  if (!validateDates()) {
    console.log('Date validation failed');
    return;
  }
  
  console.log('Date validation passed, proceeding with booking...');

  const roomType = document.getElementById('roomType').value;
  const checkIn = document.getElementById('checkIn').value;
  const checkOut = document.getElementById('checkOut').value;
  const nights = calculateNights(checkIn, checkOut);
  const ratePerNight = ROOM_PRICES[roomType] || 0;
  const totalAmount = ratePerNight * nights;

  const formData = {
    guestName: document.getElementById('guestName').value,
    email: document.getElementById('email').value,
    roomType,
    checkIn,
    checkOut,
    guests: parseInt(document.getElementById('guests').value, 10),
    status: "Pending",
    paymentStatus: "Unpaid",
    totalAmount,
    ratePerNight
  };

  try {
    // 1. Send booking to backend
    const response = await fetch(`${API_BASE_URL}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      // 2. Send email to hotel and guest using EmailJS
      // Prepare data for EmailJS template
      const emailData = {
        guest_name: formData.guestName,
        guest_email: formData.email,
        room_type: formData.roomType,
        check_in_date: formData.checkIn,
        check_out_date: formData.checkOut,
        guest_count: formData.guests,
        booking_reference: '',
        hotel_name: 'Rochester Hotel',
        hotel_address: 'KOLA BALOGUN STREET, ELEWURA BEHIND GLO OFFICE, CHALLENGE IBADAN',
        hotel_contact: '+234 9011403364',
        hotel_website: 'www.rochesterhotel.ng',
        check_in_time: '14:00',
        check_out_time: '12:00',
        cancellation_policy: 'Free cancellation up to 24 hours before check-in. No-shows will be charged one night.',
        hotel_manager_name: 'Ireoluwa Balogun',
        hotel_email: 'bookings@rochesterhotel.ng',
        hotel_phone: '+234 9011403364',
        room_quantity: 1,
        rate_per_night: ratePerNight,
        total_amount: totalAmount,
        payment_status: 'Pending',
        email: formData.email
      };
      // Send to hotel
      await emailjs.send('service_uxlrh5s', 'template_cy2lk0t', {
        ...emailData,
        email: 'irebalog@gmail.com'
      });
      // Send to guest
      await emailjs.send('service_uxlrh5s', 'template_cy2lk0t', emailData);

      document.getElementById('booking-message').innerHTML =
        '<div class="alert alert-success">Booking successful! Confirmation email sent. We look forward to hosting you.</div>';
      setTimeout(function() {
        window.location.href = 'booking-confirmation.html';
      }, 2000);
    } else {
      document.getElementById('booking-message').innerHTML =
        '<div class="alert alert-danger">Booking failed. Please try again.</div>';
    }
  } catch (err) {
    document.getElementById('booking-message').innerHTML =
      '<div class="alert alert-danger">An error occurred. Please try again later.</div>';
  }
}); 
