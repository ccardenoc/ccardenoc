// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM fully loaded and parsed');

  // Initialize all components
  initializeMobileMenu();
  initializeNavLinks();
  initializeMobileNavLinks();
  initializeSkillTags();
  initializeSmoothScrolling();
});

// Mobile menu functionality
function initializeMobileMenu() {
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
}

// Initialize smooth scrolling
function initializeSmoothScrolling() {
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
}

// Function to toggle timeline content expansion
window.toggleTimelineContent = function (toggleElement) {
  // Find the related content element (sibling before the toggle button)
  const contentElement = toggleElement.previousElementSibling;

  // Toggle expanded class on content
  contentElement.classList.toggle('expanded');

  // Toggle expanded class on toggle button
  toggleElement.classList.toggle('expanded');
};

// Utility function to create skill tags with consistent styling
window.createSkillTag = function (container, tags) {
  // Clear container first
  container.innerHTML = '';

  // Create tag elements with Tailwind classes
  tags.forEach(tag => {
    const span = document.createElement('span');
    span.classList.add(
      'text-xs', 'bg-apple-gray-200', 'text-apple-gray-700',
      'px-2.5', 'py-1', 'rounded-full', 'hover:bg-apple-gray-300',
      'transition-colors', 'inline-block', 'mb-2', 'mr-2'
    );
    span.textContent = tag;
    container.appendChild(span);
  });
};

// Function to create navigation links with consistent styling
window.createNavLink = function (container, links) {
  // Links should be an array of {href, text} objects
  links.forEach(link => {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.text;
    a.classList.add(
      'text-apple-gray-600', 'hover:text-apple-gray-900',
      'px-3', 'py-2', 'text-sm', 'font-medium',
      'transition', 'duration-300'
    );
    container.appendChild(a);
  });
};

// Function to create mobile navigation links with consistent styling
window.createMobileNavLink = function (container, links) {
  // Clear container first
  container.innerHTML = '';

  // Links should be an array of {href, text} objects
  links.forEach(link => {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.text;
    a.classList.add(
      'block', 'px-3', 'py-2', 'text-base', 'font-medium',
      'text-apple-gray-600', 'hover:text-apple-gray-900',
      'hover:bg-apple-gray-100', 'transition', 'duration-300'
    );

    // Add onclick handler for mobile menu
    a.addEventListener('click', function () {
      const mobileMenu = document.getElementById('mobile-menu');
      const mobileIconPath = document.getElementById('mobile-icon-path');

      if (mobileMenu && mobileIconPath) {
        mobileMenu.style.display = 'none';
        mobileIconPath.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
      }
    });

    container.appendChild(a);
  });
};

// Initialize desktop navigation links
function initializeNavLinks() {
  // Find navigation container with data-nav-links attribute
  const navContainer = document.querySelector('[data-nav-links]');
  if (navContainer) {
    try {
      // Get the links from the data attribute (format: href1:text1,href2:text2)
      const linksData = navContainer.getAttribute('data-nav-links');
      const linkItems = linksData.split(',').map(item => {
        const [href, text] = item.split(':');
        return { href: href.trim(), text: text.trim() };
      });

      // Clear existing content and create the links
      navContainer.innerHTML = '';
      window.createNavLink(navContainer, linkItems);
      console.log('Desktop navigation initialized');
    } catch (error) {
      console.error('Error initializing desktop navigation:', error);
    }
  }
}

// Initialize mobile navigation links
function initializeMobileNavLinks() {
  // Find mobile navigation container
  const mobileNavContainer = document.querySelector('[data-mobile-nav-links]');
  if (mobileNavContainer) {
    try {
      // Get the links from the data attribute (format: href1:text1,href2:text2)
      const linksData = mobileNavContainer.getAttribute('data-mobile-nav-links');
      const linkItems = linksData.split(',').map(item => {
        const [href, text] = item.split(':');
        return { href: href.trim(), text: text.trim() };
      });

      // Create the mobile links
      window.createMobileNavLink(mobileNavContainer, linkItems);
      console.log('Mobile navigation initialized');
    } catch (error) {
      console.error('Error initializing mobile navigation:', error);
    }
  }
}

// Initialize skill tags
function initializeSkillTags() {
  // Find all elements with data-skill-tags attribute
  document.querySelectorAll('[data-skill-tags]').forEach(container => {
    // Parse the tags from the data attribute
    const tagsString = container.getAttribute('data-skill-tags');
    const tags = tagsString.split(',').map(tag => tag.trim());

    // Create the tags
    window.createSkillTag(container, tags);
  });
}