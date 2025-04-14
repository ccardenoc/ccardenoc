// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM fully loaded and parsed');

  // Mobile menu toggle functionality
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileIconPath = document.getElementById('mobile-icon-path');

  console.log('Mobile menu elements:', {
    button: mobileMenuButton,
    menu: mobileMenu,
    iconPath: mobileIconPath
  });

  if (mobileMenuButton && mobileMenu && mobileIconPath) {
    // Add click event listener to menu button
    mobileMenuButton.addEventListener('click', function (e) {
      console.log('Mobile menu button clicked');
      e.preventDefault();
      e.stopPropagation();

      // Check current state
      const isHidden = mobileMenu.classList.contains('hidden');
      console.log('Menu is currently hidden:', isHidden);

      // Toggle menu visibility
      if (isHidden) {
        console.log('Opening menu');
        // Show menu
        mobileMenu.classList.remove('hidden');
        mobileMenu.style.display = 'block';
        // Add animation classes
        mobileMenu.classList.add('animate-fade-in');
        // Change to X icon
        mobileIconPath.setAttribute('d', 'M6 18L18 6M6 6l12 12');
      } else {
        console.log('Closing menu');
        // Add animation classes
        mobileMenu.classList.add('animate-fade-out');
        // Wait for animation to complete before hiding
        setTimeout(() => {
          mobileMenu.classList.add('hidden');
          mobileMenu.style.display = 'none';
          mobileMenu.classList.remove('animate-fade-out', 'animate-fade-in');
        }, 300);
        // Change back to hamburger icon
        mobileIconPath.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
      }
    });

    // Close menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function () {
        console.log('Mobile menu link clicked');
        // Add animation for closing
        mobileMenu.classList.add('animate-fade-out');
        // Wait for animation to complete before hiding
        setTimeout(() => {
          mobileMenu.classList.add('hidden');
          mobileMenu.style.display = 'none';
          mobileMenu.classList.remove('animate-fade-out', 'animate-fade-in');
        }, 300);
        // Change back to hamburger icon
        mobileIconPath.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      // If menu is visible and click is outside menu and button
      if (!mobileMenu.classList.contains('hidden') &&
        !mobileMenu.contains(e.target) &&
        !mobileMenuButton.contains(e.target)) {
        console.log('Clicked outside menu, closing');
        mobileMenu.classList.add('animate-fade-out');
        setTimeout(() => {
          mobileMenu.classList.add('hidden');
          mobileMenu.style.display = 'none';
          mobileMenu.classList.remove('animate-fade-out', 'animate-fade-in');
        }, 300);
        mobileIconPath.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
      }
    });
  }

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId !== '#') {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 70, // Offset for fixed header
            behavior: 'smooth'
          });
        }
      }
    });
  });
});

// Function to toggle timeline content expansion
window.toggleTimelineContent = function (toggleElement) {
  // Find the related content element (sibling before the toggle button)
  const contentElement = toggleElement.previousElementSibling;

  // Toggle expanded class on content
  contentElement.classList.toggle('expanded');

  // Toggle expanded class on toggle button
  toggleElement.classList.toggle('expanded');
};