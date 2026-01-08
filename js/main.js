/**
 * HYPE FOUNDRY - Main JavaScript
 * Handles all interactions: navigation, pricing toggle, FAQ accordion, portfolio filtering
 */

// =========================================
// MOBILE NAVIGATION TOGGLE
// =========================================
function initMobileNav() {
  const navToggle = document.querySelector('.nav__toggle');
  const navMenu = document.querySelector('.nav__menu');

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('nav__toggle--active');
    navMenu.classList.toggle('nav__menu--active');
  });

  // Close menu when clicking nav links
  const navLinks = document.querySelectorAll('.nav__link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('nav__toggle--active');
      navMenu.classList.remove('nav__menu--active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navToggle.classList.remove('nav__toggle--active');
      navMenu.classList.remove('nav__menu--active');
    }
  });
}

// =========================================
// PRICING TOGGLE (MONTHLY/QUARTERLY)
// =========================================
function initPricingToggle() {
  const toggle = document.querySelector('.toggle');
  const monthlyLabel = document.querySelector('[data-pricing="monthly"]');
  const quarterlyLabel = document.querySelector('[data-pricing="quarterly"]');
  const priceDisplay = document.querySelector('[data-price-display]');
  const priceNote = document.querySelector('[data-price-note]');
  const ctaButton = document.querySelector('[data-pricing-cta]');

  if (!toggle) return;

  // Stripe Payment Link placeholders
  const stripeLinks = {
    monthly: 'https://buy.stripe.com/MONTHLY_PLACEHOLDER',
    quarterly: 'https://buy.stripe.com/QUARTERLY_PLACEHOLDER'
  };

  // Pricing data
  const pricing = {
    monthly: {
      price: '$3,495',
      note: 'per month',
      link: stripeLinks.monthly
    },
    quarterly: {
      price: '$9,435',
      note: 'per quarter ($3,145/mo - save 10%)',
      link: stripeLinks.quarterly
    }
  };

  let currentPlan = 'monthly';

  toggle.addEventListener('click', () => {
    // Toggle active state
    toggle.classList.toggle('toggle--active');

    // Update current plan
    currentPlan = currentPlan === 'monthly' ? 'quarterly' : 'monthly';

    // Update labels
    if (monthlyLabel && quarterlyLabel) {
      monthlyLabel.classList.toggle('pricing-toggle__label--active');
      quarterlyLabel.classList.toggle('pricing-toggle__label--active');
    }

    // Update price display
    if (priceDisplay) {
      priceDisplay.textContent = pricing[currentPlan].price;
    }

    // Update price note
    if (priceNote) {
      priceNote.textContent = pricing[currentPlan].note;
    }

    // Update CTA button link
    if (ctaButton) {
      ctaButton.href = pricing[currentPlan].link;
    }
  });
}

// =========================================
// FAQ ACCORDION
// =========================================
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');

    question.addEventListener('click', () => {
      // Close other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('faq__item--active');
        }
      });

      // Toggle current item
      item.classList.toggle('faq__item--active');
    });
  });
}

// =========================================
// PORTFOLIO FILTERING
// =========================================
function initPortfolioFilter() {
  const filters = document.querySelectorAll('.work-filter');
  const workItems = document.querySelectorAll('.work-item');

  if (filters.length === 0) return;

  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      const category = filter.dataset.category;

      // Update active filter
      filters.forEach(f => f.classList.remove('work-filter--active'));
      filter.classList.add('work-filter--active');

      // Filter work items
      workItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
          item.style.display = 'block';
          // Fade in animation
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

// =========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// =========================================
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Ignore # only links
      if (href === '#') return;

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 80; // Account for sticky header

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// =========================================
// ACTIVE NAV LINK BASED ON CURRENT PAGE
// =========================================
function initActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav__link');

  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;

    if (currentPath === linkPath ||
        (currentPath === '/' && linkPath.includes('index.html')) ||
        (currentPath.includes('index.html') && linkPath === '/')) {
      link.classList.add('nav__link--active');
    }
  });
}

// =========================================
// SCROLL ANIMATIONS (FADE IN ON SCROLL)
// =========================================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements with data-animate attribute
  const animatedElements = document.querySelectorAll('[data-animate]');
  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

// =========================================
// HEADER SCROLL EFFECT
// =========================================
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  });
}

// =========================================
// CAL.COM EMBED INITIALIZATION
// =========================================
function initCalEmbed() {
  // Cal.com embed will be initialized via their embed script
  // This is just a placeholder for any additional setup needed
  const calEmbed = document.querySelector('.cal-embed');

  if (calEmbed) {
    console.log('Cal.com embed container found');
  }
}

// =========================================
// INITIALIZE ALL FUNCTIONS ON DOM LOAD
// =========================================
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initPricingToggle();
  initFAQ();
  initPortfolioFilter();
  initSmoothScroll();
  initActiveNavLink();
  initScrollAnimations();
  initHeaderScroll();
  initCalEmbed();

  console.log('Hype Foundry: All scripts initialized');
});

// =========================================
// UTILITY: LOG PRICING TOGGLE FOR DEBUGGING
// =========================================
// Uncomment the following to debug pricing toggle
/*
window.addEventListener('load', () => {
  const toggle = document.querySelector('.toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      console.log('Pricing plan toggled');
    });
  }
});
*/
