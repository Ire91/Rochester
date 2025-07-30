let bookings = [];
let rooms = [];

// Make functions globally accessible
window.viewBooking = function(bookingId) {
  console.log('viewBooking called with:', bookingId, bookings);
  console.log('Bookings array length:', bookings.length);
  console.log('All bookings:', bookings);
  
  const booking = bookings.find(b => b.id == bookingId);
  if (!booking) {
    console.log('Booking not found for id:', bookingId);
    console.log('Available booking IDs:', bookings.map(b => b.id));
    return;
  }
  console.log('Found booking:', booking);
  
  const modal = document.getElementById('modalBg');
  const details = document.getElementById('modalDetails');
  
  console.log('Modal element:', modal);
  console.log('Details element:', details);
  
  const detailsHTML = `
    <li><strong>Reference:</strong> ${booking.reference || booking.id}</li>
    <li><strong>Guest:</strong> ${booking.guestName}</li>
    <li><strong>Email:</strong> ${booking.email}</li>
    <li><strong>Room Type:</strong> ${booking.roomType}</li>
    <li><strong>Check-in:</strong> ${formatDate(booking.checkIn)}</li>
    <li><strong>Check-out:</strong> ${formatDate(booking.checkOut)}</li>
    <li><strong>Guests:</strong> ${booking.guests}</li>
    <li><strong>Status:</strong> ${booking.status}</li>
    <li><strong>Payment Status:</strong> ${booking.paymentStatus}</li>
    <li><strong>Rate/Night:</strong> ₦${booking.ratePerNight?.toLocaleString() || '0'}</li>
    <li><strong>Total Amount:</strong> ₦${booking.totalAmount?.toLocaleString() || '0'}</li>
    <li><strong>Created:</strong> ${formatDateTime(booking.createdAt)}</li>
  `;
  
  console.log('Details HTML to be inserted:', detailsHTML);
  
  details.innerHTML = detailsHTML;
  
  console.log('Details innerHTML after setting:', details.innerHTML);
  
  modal.style.setProperty('display', 'flex', 'important');
  modal.classList.add('show');
  modal.style.zIndex = '999999';
  
  // Debug: Check modal state
  console.log('Modal display style:', modal.style.display);
  console.log('Modal classes:', modal.className);
  console.log('Modal computed opacity:', window.getComputedStyle(modal).opacity);
  console.log('Modal z-index:', window.getComputedStyle(modal).zIndex);
  console.log('Modal should now be visible');
};

window.editBooking = function(bookingId) {
  console.log('editBooking called with:', bookingId, bookings);
  const booking = bookings.find(b => b.id == bookingId);
  if (!booking) {
    console.log('Booking not found for id:', bookingId);
    return;
  }
  console.log('Found booking for edit:', booking);
  
  // Populate edit form
  document.getElementById('editReference').value = booking.id;
  document.getElementById('editGuestName').value = booking.guestName;
  document.getElementById('editEmail').value = booking.email;
  document.getElementById('editRoomType').value = booking.roomType;
  document.getElementById('editCheckIn').value = booking.checkIn;
  document.getElementById('editCheckOut').value = booking.checkOut;
  document.getElementById('editGuests').value = booking.guests;
  document.getElementById('editStatus').value = booking.status;
  document.getElementById('editPaymentStatus').value = booking.paymentStatus;
  
  // Show edit modal
  const editModal = document.getElementById('editModalBg');
  editModal.style.setProperty('display', 'flex', 'important');
  editModal.classList.add('show');
  editModal.style.zIndex = '999999';
  // editModal.style.background = 'rgba(255,0,0,0.8)'; // Remove debug background if not needed
  console.log('Edit modal should now be visible');
};

window.deleteBooking = function(bookingId) {
  console.log('deleteBooking called with:', bookingId, bookings);
  const booking = bookings.find(b => b.id == bookingId);
  if (!booking) {
    console.log('Booking not found for id:', bookingId);
    return;
  }
  console.log('Found booking for delete:', booking);
  
  // Populate delete confirmation
  document.getElementById('deleteBookingId').value = booking.id;
  document.getElementById('deleteBookingName').textContent = booking.guestName;
  
  // Show delete modal
  const deleteModal = document.getElementById('deleteModalBg');
  deleteModal.style.setProperty('display', 'flex', 'important');
  deleteModal.classList.add('show');
  deleteModal.style.zIndex = '999999';
  // deleteModal.style.background = 'rgba(255,0,0,0.8)'; // Remove debug background if not needed
  console.log('Delete modal should now be visible');
};

// Close modal function
window.closeModal = function() {
  const modal = document.getElementById('modalBg');
  modal.style.display = 'none';
  modal.classList.remove('show');
};

window.closeEditModal = function() {
  const modal = document.getElementById('editModalBg');
  modal.style.display = 'none';
  modal.classList.remove('show');
};

window.closeDeleteModal = function() {
  const modal = document.getElementById('deleteModalBg');
  modal.style.display = 'none';
  modal.classList.remove('show');
};

// Delete confirmation handler
window.confirmDelete = async function() {
  const bookingId = document.getElementById('deleteBookingId').value;
  
  try {
    const response = await fetch(`http://localhost:5050/api/bookings/${bookingId}`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      await loadBookings();
      document.getElementById('deleteModalBg').style.display = 'none';
      console.log('Booking deleted successfully:', bookingId);
    } else {
      alert('Error deleting booking');
      console.log('Error deleting booking:', response.status);
    }
  } catch (error) {
    console.error('Error deleting booking:', error);
    alert('Error deleting booking');
  }
};

// Export bookings to CSV
window.exportToCSV = function() {
  if (!bookings || bookings.length === 0) {
    alert('No bookings to export!');
    return;
  }
  
  // Define CSV headers
  const headers = [
    'ID',
    'Reference',
    'Guest Name',
    'Email',
    'Room Type',
    'Check In',
    'Check Out',
    'Guests',
    'Rate Per Night (₦)',
    'Total Amount (₦)',
    'Status',
    'Payment Status',
    'Created At'
  ];
  
  // Convert bookings to CSV rows
  const csvRows = [headers.join(',')];
  
  bookings.forEach(booking => {
    const row = [
      booking.id,
      booking.reference || '',
      `"${booking.guestName || ''}"`,
      booking.email || '',
      `"${booking.roomType || ''}"`,
      booking.checkIn || '',
      booking.checkOut || '',
      booking.guests || '',
      booking.ratePerNight || 0,
      booking.totalAmount || 0,
      `"${booking.status || ''}"`,
      `"${booking.paymentStatus || ''}"`,
      booking.createdAt ? new Date(booking.createdAt).toLocaleString() : ''
    ];
    csvRows.push(row.join(','));
  });
  
  // Create CSV content
  const csvContent = csvRows.join('\n');
  
  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `rochester_hotel_bookings_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  console.log(`Exported ${bookings.length} bookings to CSV`);
};

// Helper functions
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

function formatDateTime(dateTimeString) {
  if (!dateTimeString) return '';
  const date = new Date(dateTimeString);
  return date.toLocaleString();
}

// Dark mode functionality
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const isDark = localStorage.getItem('darkMode') === 'true';
  
  if (isDark) {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
  }
  
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    themeToggle.textContent = isDark ? '☀️' : '🌙';
  });
}

// Load bookings from API
async function loadBookings() {
  try {
    const response = await fetch('http://localhost:5050/api/bookings');
    if (response.ok) {
      bookings = await response.json();
      // Sort by latest first (newest bookings at top)
      bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      renderBookings();
      updateAnalytics();
    } else {
      console.error('Failed to load bookings');
    }
  } catch (error) {
    console.error('Error loading bookings:', error);
  }
}

async function loadRooms() {
  try {
    const response = await fetch('http://localhost:5050/api/rooms');
    if (response.ok) {
      rooms = await response.json();
      renderRooms();
    } else {
      console.error('Failed to load rooms');
    }
  } catch (error) {
    console.error('Error loading rooms:', error);
  }
}

// Render bookings table
function renderBookings() {
  console.log('Rendering bookings table...');
  const tbody = document.getElementById('bookingsTbody');
  tbody.innerHTML = '';
  
  // Get current filter
  const activeFilter = document.querySelector('.filter-btn.active');
  const filterStatus = activeFilter ? activeFilter.dataset.status : 'all';
  
  // Filter bookings based on status
  let filteredBookings = bookings;
  if (filterStatus !== 'all') {
    if (filterStatus === 'Paid' || filterStatus === 'Unpaid') {
      filteredBookings = bookings.filter(booking => booking.paymentStatus === filterStatus);
    } else {
      filteredBookings = bookings.filter(booking => booking.status === filterStatus);
    }
  }
  
  filteredBookings.forEach(booking => {
    console.log('Creating row for booking:', booking.id);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${booking.reference || booking.id}</td>
      <td>${booking.guestName}</td>
      <td>${booking.email}</td>
      <td>${booking.roomType}</td>
      <td>${formatDate(booking.checkIn)}</td>
      <td>${formatDate(booking.checkOut)}</td>
      <td>${booking.guests}</td>
      <td><span class="status ${booking.status}">${booking.status}</span></td>
      <td><span class="status ${booking.paymentStatus}">${booking.paymentStatus}</span></td>
      <td>₦${booking.ratePerNight?.toLocaleString() || '0'}</td>
      <td>₦${booking.totalAmount?.toLocaleString() || '0'}</td>
      <td>${formatDateTime(booking.createdAt)}</td>
      <td class="actions-cell">
        <button class="view-btn" onclick="viewBooking('${booking.id}')">View</button>
        <button class="edit-btn" onclick="editBooking('${booking.id}')">Edit</button>
        <button class="delete-btn" onclick="deleteBooking('${booking.id}')">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
  console.log('Finished rendering bookings table');
}

// Update analytics cards
function updateAnalytics() {
  const today = new Date().toISOString().split('T')[0];
  
  // Total bookings
  document.getElementById('totalBookings').textContent = bookings.length;
  
  // Check-ins today
  const checkInsToday = bookings.filter(booking => 
    booking.checkIn === today && booking.status === 'CheckedIn'
  ).length;
  document.getElementById('checkInsToday').textContent = checkInsToday;
  
  // Check-outs today
  const checkOutsToday = bookings.filter(booking => 
    booking.checkOut === today && booking.status === 'CheckedOut'
  ).length;
  document.getElementById('checkOutsToday').textContent = checkOutsToday;
  
  // Occupancy rate (bookings that are checked in or confirmed for today)
  const occupiedRooms = bookings.filter(booking => {
    const checkIn = new Date(booking.checkIn);
    const checkOut = new Date(booking.checkOut);
    const today = new Date();
    return today >= checkIn && today < checkOut && 
           (booking.status === 'Confirmed' || booking.status === 'CheckedIn');
  }).length;
  
  // Assuming you have 10 total rooms (adjust this number based on your actual room count)
  const totalRooms = 10;
  const occupancyRate = Math.round((occupiedRooms / totalRooms) * 100);
  document.getElementById('occupancyRate').textContent = `${occupancyRate}%`;
  
  // Total revenue (only from paid bookings)
  const totalRevenue = bookings
    .filter(booking => booking.paymentStatus === 'Paid')
    .reduce((sum, booking) => sum + (booking.totalAmount || 0), 0);
  document.getElementById('totalRevenue').textContent = `₦${totalRevenue.toLocaleString()}`;
  
  // Cancellations
  const cancellations = bookings.filter(booking => booking.status === 'Cancelled').length;
  document.getElementById('cancellations').textContent = cancellations;
}

// Save edited booking
async function saveBooking(formData) {
  const bookingId = document.getElementById('editReference').value;
  // Find the original booking object
  const original = bookings.find(b => b.id == bookingId);
  if (!original) {
    alert('Original booking not found!');
    return;
  }
  // Merge edited fields with original
  const updated = {
    ...original,
    guestName: formData.get('guestName'),
    email: formData.get('email'),
    roomType: formData.get('roomType'),
    checkIn: formData.get('checkIn'),
    checkOut: formData.get('checkOut'),
    guests: parseInt(formData.get('guests')),
    status: formData.get('status'),
    paymentStatus: formData.get('paymentStatus')
  };
  console.log('Updating booking with:', updated);
  try {
    const response = await fetch(`http://localhost:5050/api/bookings/${bookingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updated)
    });
    if (response.ok) {
      await loadBookings();
      document.getElementById('editModalBg').style.display = 'none';
    } else {
      alert('Error updating booking');
    }
  } catch (error) {
    console.error('Error updating booking:', error);
    alert('Error updating booking');
  }
}

// Render rooms table
function renderRooms() {
  const tbody = document.getElementById('roomsTbody');
  tbody.innerHTML = '';
  
  rooms.forEach((room, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${room.roomType}</td>
      <td>₦${room.ratePerNight?.toLocaleString() || '0'}</td>
      <td><span class="status ${room.status.replace(' ', '')}">${room.status}</span></td>
      <td class="actions-cell">
        <button class="edit-btn" onclick="editRoom(${room.id})">Edit</button>
        <button class="delete-btn" onclick="deleteRoom(${room.id})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Edit room
function editRoom(roomId) {
  const room = rooms.find(r => r.id == roomId);
  if (!room) return;
  
  document.getElementById('editRoomIndex').value = roomId;
  document.getElementById('editRoomType').value = room.roomType;
  document.getElementById('editRoomRate').value = room.ratePerNight;
  document.getElementById('editRoomStatus').value = room.status;
  
  document.getElementById('editRoomModalBg').style.setProperty('display', 'flex', 'important');
  document.getElementById('editRoomModalBg').classList.add('show');
}

// Delete room
async function deleteRoom(roomId) {
  if (confirm('Are you sure you want to delete this room?')) {
    try {
      const response = await fetch(`http://localhost:5050/api/rooms/${roomId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        await loadRooms(); // Reload rooms from backend
        console.log('Room deleted successfully:', roomId);
      } else {
        alert('Error deleting room');
        console.log('Error deleting room:', response.status);
      }
    } catch (error) {
      console.error('Error deleting room:', error);
      alert('Error deleting room');
    }
  }
}

// Add room
async function addRoom() {
  const roomType = document.getElementById('addRoomType').value;
  const roomRate = parseInt(document.getElementById('addRoomRate').value);
  const roomStatus = document.getElementById('addRoomStatus').value;
  const roomDescription = document.getElementById('addRoomDescription').value;
  const roomImageUrl = document.getElementById('addRoomImageUrl').value;
  
  if (!roomType || !roomRate) {
    alert('Please fill in all required fields');
    return;
  }
  
  const newRoom = {
    roomType: roomType,
    ratePerNight: roomRate,
    status: roomStatus,
    description: roomDescription,
    imageUrl: roomImageUrl
  };
  
  try {
    const response = await fetch('http://localhost:5050/api/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRoom)
    });
    
    if (response.ok) {
      await loadRooms(); // Reload rooms from backend
      document.getElementById('addRoomModalBg').style.display = 'none';
      document.getElementById('addRoomModalBg').classList.remove('show');
      // Clear form
      document.getElementById('addRoomType').value = '';
      document.getElementById('addRoomRate').value = '';
      document.getElementById('addRoomStatus').value = 'Available';
      document.getElementById('addRoomDescription').value = '';
      document.getElementById('addRoomImageUrl').value = '';
      console.log('Room added successfully');
    } else {
      alert('Error adding room');
      console.log('Error adding room:', response.status);
    }
  } catch (error) {
    console.error('Error adding room:', error);
    alert('Error adding room');
  }
}

// Tab switching
function switchTab(tabName) {
  const bookingsSection = document.getElementById('bookingsSection');
  const roomsSection = document.getElementById('roomsSection');
  const addRoomBar = document.getElementById('addRoomBar');
  
  if (tabName === 'bookings') {
    bookingsSection.style.display = 'block';
    roomsSection.style.display = 'none';
    addRoomBar.style.display = 'none';
    document.getElementById('tabBookingsBtn').classList.add('active');
    document.getElementById('tabRoomsBtn').classList.remove('active');
  } else {
    bookingsSection.style.display = 'none';
    roomsSection.style.display = 'block';
    addRoomBar.style.display = 'block';
    document.getElementById('tabRoomsBtn').classList.add('active');
    document.getElementById('tabBookingsBtn').classList.remove('active');
  }
}

// Search functionality
function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#bookingsTbody tr');
    
    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
  });
}

// Modal close functionality
function setupModals() {
  // Close modals when clicking outside or on close button
  const modals = document.querySelectorAll('.modal-bg');
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  });
  
  // Close buttons
  const modalClose = document.getElementById('modalClose');
  if (modalClose) modalClose.onclick = () => {
    document.getElementById('modalBg').style.display = 'none';
  };
  
  const editModalClose = document.getElementById('editModalClose');
  if (editModalClose) editModalClose.onclick = () => {
    document.getElementById('editModalBg').style.display = 'none';
  };
  
  const deleteModalClose = document.getElementById('deleteModalClose');
  if (deleteModalClose) deleteModalClose.onclick = () => {
    document.getElementById('deleteModalBg').style.display = 'none';
  };
  
  const editRoomModalClose = document.getElementById('editRoomModalClose');
  if (editRoomModalClose) editRoomModalClose.onclick = () => {
    document.getElementById('editRoomModalBg').style.display = 'none';
  };
  
  // Status filter buttons
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      // Re-render bookings with new filter
      renderBookings();
    });
  });
  
  // Form submissions
  const editBookingForm = document.getElementById('editBookingForm');
  if (editBookingForm) editBookingForm.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    saveBooking(formData);
  };
  
  const editRoomForm = document.getElementById('editRoomForm');
  if (editRoomForm) editRoomForm.onsubmit = async (e) => {
    e.preventDefault();
    const roomId = parseInt(document.getElementById('editRoomIndex').value);
    const formData = new FormData(e.target);
    
    const updatedRoom = {
      roomType: formData.get('roomType'),
      ratePerNight: parseInt(formData.get('roomRate')),
      status: formData.get('roomStatus'),
      description: formData.get('roomDescription') || '',
      imageUrl: formData.get('roomImageUrl') || ''
    };
    
    try {
      const response = await fetch(`http://localhost:5050/api/rooms/${roomId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedRoom)
      });
      
      if (response.ok) {
        await loadRooms(); // Reload rooms from backend
        document.getElementById('editRoomModalBg').style.display = 'none';
        document.getElementById('editRoomModalBg').classList.remove('show');
        console.log('Room updated successfully');
      } else {
        alert('Error updating room');
        console.log('Error updating room:', response.status);
      }
    } catch (error) {
      console.error('Error updating room:', error);
      alert('Error updating room');
    }
  };
  
  const addRoomForm = document.getElementById('addRoomForm');
  if (addRoomForm) addRoomForm.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const newRoom = {
      roomType: formData.get('roomType'),
      ratePerNight: parseInt(formData.get('roomRate')),
      status: formData.get('roomStatus'),
      description: formData.get('roomDescription') || '',
      imageUrl: formData.get('roomImageUrl') || ''
    };
    
    try {
      const response = await fetch('http://localhost:5050/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRoom)
      });
      
      if (response.ok) {
        await loadRooms(); // Reload rooms from backend
        document.getElementById('addRoomModalBg').style.display = 'none';
        document.getElementById('addRoomModalBg').classList.remove('show');
        // Clear form
        document.getElementById('addRoomType').value = '';
        document.getElementById('addRoomRate').value = '';
        document.getElementById('addRoomStatus').value = 'Available';
        document.getElementById('addRoomDescription').value = '';
        document.getElementById('addRoomImageUrl').value = '';
        console.log('Room added successfully');
      } else {
        alert('Error adding room');
        console.log('Error adding room:', response.status);
      }
    } catch (error) {
      console.error('Error adding room:', error);
      alert('Error adding room');
    }
  };
  
  // Cancel buttons
  const editCancelBtn = document.getElementById('editCancelBtn');
  if (editCancelBtn) editCancelBtn.onclick = () => {
    document.getElementById('editModalBg').style.display = 'none';
  };
  
  const deleteCancelBtn = document.getElementById('deleteCancelBtn');
  if (deleteCancelBtn) deleteCancelBtn.onclick = () => {
    document.getElementById('deleteModalBg').style.display = 'none';
  };
  
  const editRoomCancelBtn = document.getElementById('editRoomCancelBtn');
  if (editRoomCancelBtn) editRoomCancelBtn.onclick = () => {
    document.getElementById('editRoomModalBg').style.display = 'none';
  };
}

// Initialize everything
window.onload = function() {
  console.log('Admin page loading...');
  initTheme();
  loadBookings();
  loadRooms(); // Load rooms on page load
  setupSearch();
  setupModals();
  
  // Tab switching
  document.getElementById('tabBookingsBtn').onclick = () => {
    console.log('Switching to bookings tab');
    switchTab('bookings');
  };
  document.getElementById('tabRoomsBtn').onclick = () => {
    console.log('Switching to rooms tab');
    switchTab('rooms');
  };
  
  // Auto-refresh bookings every 30 seconds
  setInterval(loadBookings, 30000);
  console.log('Admin page loaded successfully');
}; 