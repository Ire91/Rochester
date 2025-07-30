// Smooth scroll for anchor links
const links = document.querySelectorAll('a[href^="#"]');
for (const link of links) {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Contact form validation and feedback
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = form.querySelector('input[type="text"]');
    const email = form.querySelector('input[type="email"]');
    const message = form.querySelector('textarea');
    let valid = true;
    // Simple validation
    if (!name.value.trim()) {
      name.style.borderColor = 'red';
      valid = false;
    } else {
      name.style.borderColor = '';
    }
    if (!email.value.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) {
      email.style.borderColor = 'red';
      valid = false;
    } else {
      email.style.borderColor = '';
    }
    if (!message.value.trim()) {
      message.style.borderColor = 'red';
      valid = false;
    } else {
      message.style.borderColor = '';
    }
    if (!valid) return;
    // Show thank you message
    const thankYou = document.createElement('div');
    thankYou.textContent = 'Thank you for contacting us! We will get back to you soon.';
    thankYou.style.background = '#c7a008';
    thankYou.style.color = '#004225';
    thankYou.style.padding = '1rem';
    thankYou.style.borderRadius = '8px';
    thankYou.style.textAlign = 'center';
    thankYou.style.marginTop = '1rem';
    form.parentNode.insertBefore(thankYou, form.nextSibling);
    form.reset();
    setTimeout(() => thankYou.remove(), 4000);
  });
}

// Animate hero button on click
const heroBtn = document.querySelector('.hero .btn');
if (heroBtn) {
  heroBtn.addEventListener('click', function() {
    heroBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      heroBtn.style.transform = '';
    }, 150);
  });
}

// Modal popup for room details
const roomCards = document.querySelectorAll('.room-card');
if (roomCards.length) {
  // Modal structure
  let modal = document.createElement('div');
  modal.className = 'modal-bg';
  modal.innerHTML = '<div class="modal-content"><span class="modal-close">&times;</span><div class="modal-body"></div></div>';
  document.body.appendChild(modal);
  const modalBg = document.querySelector('.modal-bg');
  const modalBody = modalBg.querySelector('.modal-body');
  const modalClose = modalBg.querySelector('.modal-close');
  modalBg.style.display = 'none';

  roomCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function() {
      const title = card.querySelector('h3').textContent;
      const price = card.querySelector('p').textContent;
      const desc = card.querySelectorAll('p')[1].textContent;
      modalBody.innerHTML = `<h3 style="color:#004225;">${title}</h3><p style="color:#c7a008; font-weight:700;">${price}</p><p>${desc}</p>`;
      modalBg.style.display = 'flex';
      setTimeout(() => modalBg.classList.add('show'), 10);
    });
  });
  modalClose.addEventListener('click', function() {
    modalBg.classList.remove('show');
    setTimeout(() => modalBg.style.display = 'none', 200);
  });
  modalBg.addEventListener('click', function(e) {
    if (e.target === modalBg) {
      modalBg.classList.remove('show');
      setTimeout(() => modalBg.style.display = 'none', 200);
    }
  });
}

// Animate sections on scroll (fade in)
const sections = document.querySelectorAll('.section');
function fadeInOnScroll() {
  const trigger = window.innerHeight * 0.9;
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < trigger) {
      sec.classList.add('fade-in');
    }
  });
}
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

// Scroll-to-top button
let scrollBtn = document.createElement('button');
scrollBtn.textContent = '↑';
scrollBtn.className = 'scroll-top-btn';
document.body.appendChild(scrollBtn);
scrollBtn.style.display = 'none';
window.addEventListener('scroll', function() {
  if (window.scrollY > 300) {
    scrollBtn.style.display = 'block';
  } else {
    scrollBtn.style.display = 'none';
  }
});
scrollBtn.addEventListener('click', function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}); 