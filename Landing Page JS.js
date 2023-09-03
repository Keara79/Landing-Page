/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
* Define Global Variables
*
*/

// Stores important elements and data used throughout the script
const sections = document.querySelectorAll('section');
const navMenu = document.querySelector('#navbar__list');
let activeSection = null;

// End Global Variables

// Start Helper Functions

// This function checks if a given section is currently in view
function isSectionInView(section) {
  const sectionRect = section.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  return (
    sectionRect.top >= 0 &&
    sectionRect.bottom <= windowHeight
  );
}

// End Helper Functions

// Begin Main Functions

// This function builds the navigation menu dynamically based on the sections
function buildNavMenu() {
  const navMenu = document.querySelector('#navbar__list');
  const sections = document.querySelectorAll('section');
  const navList = document.createElement('ul');

  sections.forEach((section) => {
    const navItem = document.createElement('li');
    const navLink = document.createElement('a');

    navLink.textContent = section.getAttribute('data-nav');
    navLink.setAttribute('href', `#${section.id}`);
    navLink.classList.add('menu__link');

    navItem.appendChild(navLink);
    navList.appendChild(navItem);
  });

  navMenu.appendChild(navList);
}

// This function determines which section is currently in the viewport and applies the active state
function setActiveSection() {
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const navLink = document.querySelector(`a[href="#${section.id}"]`);

    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
      section.classList.add('your-active-class');
      navLink.classList.add('active');
    } else {
      section.classList.remove('your-active-class');
      navLink.classList.remove('active');
    }
  });
}

// This function is active when a navigation item is clicked and scrolls the page smoothly to the corresponding section
function scrollToSection(event) {
  event.preventDefault();
  const targetId = event.target.getAttribute('href');
  const targetSection = document.querySelector(targetId);

  targetSection.scrollIntoView({
    behavior: 'smooth',
  });
}

// End Main Functions

// Begin Events

// Build menu
buildNavMenu();

// Scrolls to section on link click
const navLinks = document.querySelectorAll('.menu__link');
navLinks.forEach((navLink) => {
  navLink.addEventListener('click', scrollToSection);
});

// Sets sections as active
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const section = entry.target;
    const navLink = document.querySelector(`a[href="#${section.id}"]`);

    if (entry.isIntersecting) {
      section.classList.add('your-active-class');
      navLink.classList.add('active');
    } else {
      section.classList.remove('your-active-class');
      navLink.classList.remove('active');
    }
  });
});

sections.forEach((section) => {
  observer.observe(section);
}); 