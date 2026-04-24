document.addEventListener("includesLoaded", () => {
  const hamburger = document.querySelector('.hamburger');
  const wrapper = document.querySelector('.mobile-menu-wrapper');
  const mobileMenu = wrapper.querySelector('.mobile-menu');
  const closeBtn = wrapper.querySelector('.close-menu');
  const overlay = wrapper.querySelector('.mobile-menu-overlay');
  const links = wrapper.querySelectorAll('.mobile-menu a');

  if (!hamburger || !wrapper || !mobileMenu || !closeBtn || !overlay) return;

  // Open menu
  hamburger.addEventListener('click', () => {
    wrapper.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent scrolling behind menu
  });

  // Close menu with close button
  closeBtn.addEventListener('click', () => {
    wrapper.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Close menu when clicking overlay
  overlay.addEventListener('click', () => {
    wrapper.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Auto-close when clicking any menu link
  links.forEach(link => {
    link.addEventListener('click', () => {
      wrapper.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
});