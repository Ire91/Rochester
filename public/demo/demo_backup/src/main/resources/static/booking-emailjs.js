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

// EmailJS integration
(function() {
  emailjs.init('AIYsGwyvxdvg0EFKl');
})();

const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Generate booking reference
    const ref = 'RH-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    document.getElementById('bookingReference').value = ref;
    
    // Set default values for hidden fields if not already set
    document.getElementById('roomQuantity').value = '1';
    document.getElementById('ratePerNight').value = '40000';
    
    // Calculate total amount (rate * quantity * nights)
    const rate = parseInt(document.getElementById('ratePerNight').value, 10) || 0;
    const qty = parseInt(document.getElementById('roomQuantity').value, 10) || 1;
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    let nights = 1;
    if (checkin && checkout) {
      const d1 = new Date(checkin);
      const d2 = new Date(checkout);
      nights = Math.max(1, Math.round((d2-d1)/(1000*60*60*24)));
    }
    const total = rate * qty * nights;
    document.getElementById('totalAmount').value = total;
    document.getElementById('paymentStatus').value = 'Pending';
    
    // Collect form data
    const formData = new FormData(bookingForm);
    const data = {};
    formData.forEach((value, key) => { data[key] = value; });
    
    // Add logo and hotel information to email data
    data['logo_text'] = 'ROCHESTER HOTEL'; // Simple text logo
    data['hotel_name'] = 'Rochester Hotel';
    data['hotel_address'] = '123 Main Street, Bodija, Ibadan, Oyo State, Nigeria';
    data['hotel_contact'] = '+234 123 456 7890';
    data['hotel_website'] = 'https://rochester-hotel.com';
    data['hotel_email'] = 'info@rochester-hotel.com';
    data['hotel_phone'] = '+234 123 456 7890';
    data['hotel_manager_name'] = 'Hotel Manager';
    data['check_in_time'] = '2:00 PM';
    data['check_out_time'] = '11:00 AM';
    data['cancellation_policy'] = 'Free cancellation up to 24 hours before check-in.';
    
    // Send notification email to admin
    const adminData = { ...data };
    adminData['email'] = 'irebalog@gmail.com';
    console.log('Admin notification email data:', adminData);
    
    // Send confirmation email to customer
    const customerData = { ...data };
    customerData['email'] = data['guest_email'];
    console.log('Customer confirmation email data:', customerData);
    
    // Send both emails
    Promise.all([
      // Admin notification
      emailjs.send('service_uxlrh5s', 'template_cy2lk0t', adminData),
      // Customer confirmation (only if they provided email)
      data['guest_email'] ? emailjs.send('service_uxlrh5s', 'template_cy2lk0t', customerData) : Promise.resolve()
    ])
    .then(function() {
      console.log('Both emails sent successfully');
      // Redirect to confirmation page with guest and room info
      const guest = encodeURIComponent(data.guest_name || '');
      const room = encodeURIComponent(data.room_type || '');
      window.location.href = `booking-confirmation.html?guest=${guest}&room=${room}`;
    })
    .catch(function(error) {
      console.error('Email send error:', error);
      alert('Booking was processed, but email notifications may have failed. Please check your email.');
      // Still redirect even if emails fail
      const guest = encodeURIComponent(data.guest_name || '');
      const room = encodeURIComponent(data.room_type || '');
      window.location.href = `booking-confirmation.html?guest=${guest}&room=${room}`;
    });
  });
} 