// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM fully loaded and parsed');

  // Initialize all components
  initializeHamburgerMenu();
  initializeNavLinks();
  initializeMobileNavLinks();
  initializeSkillTags();
  initializeSmoothScrolling();
});

// Simple Hamburger menu functionality
function initializeHamburgerMenu() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!hamburgerBtn || !mobileMenu) {
    console.error('Hamburger menu elements not found');
    return;
  }

  // Toggle menu function
  function toggleMenu() {
    hamburgerBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  }

  // Add click event to hamburger button
  hamburgerBtn.addEventListener('click', function (e) {
    e.preventDefault();
    toggleMenu();
  });

  // Close menu when clicking outside
  document.addEventListener('click', function (e) {
    if (!hamburgerBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      hamburgerBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
    }
  });

  // Close menu when clicking a menu link
  const menuLinks = mobileMenu.querySelectorAll('.mobile-menu-link');
  menuLinks.forEach(link => {
    link.addEventListener('click', function () {
      hamburgerBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });
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
      'text-apple-gray-100', 'hover:text-white',
      'px-3', 'py-2', 'text-sm', 'font-medium',
      'transition', 'duration-300', 'relative',
      'after:absolute', 'after:bottom-0', 'after:left-0', 'after:right-0',
      'after:h-0.5', 'after:bg-white', 'after:transform', 'after:scale-x-0',
      'after:origin-bottom-left', 'hover:after:scale-x-100', 'after:transition-transform', 'after:duration-200'
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
      'text-apple-gray-700', 'hover:text-apple-gray-900',
      'hover:bg-apple-gray-100', 'transition', 'duration-300',
      'relative', 'border-l-transparent', 'border-l-2',
      'hover:border-l-apple-gray-700'
    );
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