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
const successMsg = document.getElementById('booking-success');
if (bookingForm) {
  bookingForm.addEventListener('submit', function(e) {
    // Wait for Formspree to process, then redirect
    setTimeout(() => {
      const guestName = document.getElementById('guestName')?.value || '';
      const roomType = document.getElementById('roomType')?.value || '';
      window.location.href = `booking-confirmation.html?guest=${encodeURIComponent(guestName)}&room=${encodeURIComponent(roomType)}`;
    }, 400);
  });
} 