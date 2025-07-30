const summaryList = document.getElementById('summaryList');
const booking = JSON.parse(localStorage.getItem('bookingDetails') || '{}');
if (booking && Object.keys(booking).length > 0) {
  summaryList.innerHTML = '';
  for (const key in booking) {
    summaryList.innerHTML += `<li><strong>${key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}:</strong> ${booking[key]}</li>`;
  }
  localStorage.removeItem('bookingDetails');
} else {
  summaryList.innerHTML = '<li>No booking details found.</li>';
} 