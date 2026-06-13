// ============================================
// Portfolio JavaScript - Modern Interactive UI
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // ---- Preloader ----
  const preloader = document.getElementById('preloader');

  function hidePreloader() {
    if (preloader && !preloader.classList.contains('loaded')) {
      preloader.classList.add('loaded');
      document.body.classList.remove('no-scroll');
      document.querySelector('.hero')?.classList.add('visible');
      initRevealAnimations();
    }
  }

  window.addEventListener('load', () => setTimeout(hidePreloader, 1500));
  setTimeout(hidePreloader, 4000); // Fallback

  // ---- Mobile Navigation ----
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-menu__overlay');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');
  const header = document.getElementById('header');

  navToggle?.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen);
    mobileMenu.setAttribute('aria-hidden', !isOpen);
    document.body.classList.toggle('no-scroll', isOpen);
  });

  const closeMobileMenu = () => {
    mobileMenu.classList.remove('active');
    navToggle?.classList.remove('active');
    navToggle?.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  };

  mobileOverlay?.addEventListener('click', closeMobileMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // ---- Navbar Scroll Effect ----
  let lastScrollY = 0;
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (currentScrollY > lastScrollY && currentScrollY > 400) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    lastScrollY = currentScrollY;
  });

  // ---- Active Nav Link on Scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  function highlightNavLink() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', highlightNavLink);

  // ---- Smooth Scroll ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

  // ---- Scroll Reveal Animations ----
  function initRevealAnimations() {
    const revealElements = document.querySelectorAll('[data-reveal]');

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.revealDelay || 0;
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, parseInt(delay));
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ---- Stats Counter Animation ----
  const statNumbers = document.querySelectorAll('.about__stat-number');

  function animateCounter(el) {
    const target = parseInt(el.dataset.count);
    const duration = 2000;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(target * easeProgress);
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(updateCounter);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => statsObserver.observe(num));

  // ---- Skill Bars Animation ----
  const skillBars = document.querySelectorAll('.skills__card-bar-fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.dataset.width;
        bar.style.width = width + '%';
        skillObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach(bar => skillObserver.observe(bar));

  // ---- Project Filter ----
  const filterBtns = document.querySelectorAll('.projects__filter');
  const projectCards = document.querySelectorAll('.project__card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.dataset.filter;

      projectCards.forEach((card, index) => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8) translateY(20px)';
          setTimeout(() => {
            card.style.display = '';
            requestAnimationFrame(() => {
              card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
              card.style.opacity = '1';
              card.style.transform = 'scale(1) translateY(0)';
            });
          }, index * 80);
        } else {
          card.style.transition = 'all 0.3s ease';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ---- Contact Form ----
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = document.getElementById('contact-submit');
    const btnSpan = btn.querySelector('span');
    const btnIcon = btn.querySelector('i');
    const originalText = btnSpan.textContent;
    const originalIconClass = btnIcon.className;

    // Validate
    const inputs = contactForm.querySelectorAll('input, textarea');
    let valid = true;
    inputs.forEach(input => {
      if (!input.value.trim()) {
        valid = false;
        input.classList.add('error');
        setTimeout(() => input.classList.remove('error'), 2000);
      }
    });

    if (!valid) {
      formStatus.textContent = 'Please fill in all fields.';
      formStatus.className = 'contact__form-status error';
      return;
    }

    // Sending State
    btn.disabled = true;
    btnSpan.textContent = 'Sending...';
    btn.classList.add('sending');

    const formData = {
      // NOTE: You must get your free Access Key from https://web3forms.com and paste it below
      access_key: "YOUR_ACCESS_KEY_HERE",
      name: document.getElementById('contact-name').value,
      email: document.getElementById('contact-email').value,
      subject: document.getElementById('contact-subject').value,
      message: document.getElementById('contact-message').value
    };

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Form submission failed");
        }
        return response.json();
      })
      .then(data => {
        btn.classList.remove('sending');
        btn.classList.add('sent');
        btnSpan.textContent = 'Message Sent!';
        btnIcon.className = 'fa-solid fa-check';
        formStatus.textContent = 'Thank you! Your message has been sent successfully.';
        formStatus.className = 'contact__form-status success';

        contactForm.reset();

        setTimeout(() => {
          btn.disabled = false;
          btn.classList.remove('sent');
          btnSpan.textContent = originalText;
          btnIcon.className = originalIconClass;
          formStatus.textContent = '';
          formStatus.className = 'contact__form-status';
        }, 4000);
      })
      .catch(error => {
        btn.disabled = false;
        btn.classList.remove('sending');
        btnSpan.textContent = originalText;
        btnIcon.className = originalIconClass;
        formStatus.textContent = 'Something went wrong. Please try again later.';
        formStatus.className = 'contact__form-status error';
      });
  });

  // ---- Back to Top Button ----
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop?.classList.add('visible');
    } else {
      backToTop?.classList.remove('visible');
    }
  });

  // ---- Tilt Effect on Project Cards ----
  const tiltCards = document.querySelectorAll('.project__card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });

  // ---- Mouse Cursor Glow Effect ----
  const cursorGlow = document.createElement('div');
  cursorGlow.classList.add('cursor-glow');
  document.body.appendChild(cursorGlow);

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();

  // ---- Parallax Effect on Hero Orbs ----
  const orbs = document.querySelectorAll('.hero__orb');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroHeight = document.querySelector('.hero')?.offsetHeight || 0;
    if (scrolled < heroHeight) {
      orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.15;
        orb.style.transform = `translateY(${scrolled * speed}px)`;
      });
    }
  });

  // ---- Experience Timeline Animation ----
  const timelineItems = document.querySelectorAll('.experience__item');
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  timelineItems.forEach(item => timelineObserver.observe(item));

  // ---- Year in Footer ----
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Keyboard Navigation ----
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      mobileMenu?.classList.remove('active');
      navToggle?.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  });

  // ---- Toast Notification ----
  window.showToast = function (message) {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  // ---- Theme Toggle ----
  const themeToggle = document.getElementById('theme-toggle');
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');

  const toggleTheme = () => {
    const isLight = document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  };

  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
  }

  themeToggle?.addEventListener('click', toggleTheme);
  mobileThemeToggle?.addEventListener('click', toggleTheme);

  // ---- Certifications Slider ----
  const certTrack = document.getElementById('cert-track');
  const certPrev = document.getElementById('cert-prev');
  const certNext = document.getElementById('cert-next');
  const certDotsContainer = document.getElementById('cert-dots');
  const certCards = document.querySelectorAll('.cert__card');

  if (certTrack && certCards.length > 0) {
    let currentSlide = 0;
    const totalSlides = certCards.length;

    const getSlidesPerPage = () => {
      if (window.innerWidth <= 650) return 1;
      if (window.innerWidth <= 992) return 2;
      return 3;
    };

    const getMaxIndex = () => {
      return Math.max(0, totalSlides - getSlidesPerPage());
    };

    const updateSlider = () => {
      const slidesPerPage = getSlidesPerPage();
      const maxIndex = getMaxIndex();

      // Bound check
      if (currentSlide > maxIndex) currentSlide = maxIndex;
      if (currentSlide < 0) currentSlide = 0;

      // Calculate width percentage
      const gap = 32; // corresponds to var(--spacing-lg) (2rem = 32px)
      const containerWidth = certTrack.parentElement.clientWidth;
      const cardWidth = (containerWidth - (slidesPerPage - 1) * gap) / slidesPerPage;
      const offset = currentSlide * (cardWidth + gap);

      certTrack.style.transform = `translateX(-${offset}px)`;

      // Update dots
      const dots = certDotsContainer?.querySelectorAll('.slider-dot');
      dots?.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlide);
      });

      // Update buttons state
      if (certPrev) certPrev.disabled = currentSlide === 0;
      if (certNext) certNext.disabled = currentSlide >= maxIndex;
    };

    // Initialize Dots
    if (certDotsContainer) {
      certDotsContainer.innerHTML = '';
      const numDots = totalSlides; // Show a dot for each card
      for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('span');
        dot.classList.add('slider-dot');
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('role', 'button');
        dot.setAttribute('aria-label', `Slide ${i + 1}`);
        dot.addEventListener('click', () => {
          currentSlide = i;
          updateSlider();
        });
        certDotsContainer.appendChild(dot);
      }
    }

    certPrev?.addEventListener('click', () => {
      if (currentSlide > 0) {
        currentSlide--;
        updateSlider();
      }
    });

    certNext?.addEventListener('click', () => {
      const maxIndex = getMaxIndex();
      if (currentSlide < maxIndex) {
        currentSlide++;
        updateSlider();
      }
    });

    // Touch Swipe Support
    let startX = 0;
    let isSwiping = false;

    certTrack.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isSwiping = true;
    }, { passive: true });

    certTrack.addEventListener('touchmove', (e) => {
      if (!isSwiping) return;
      const diffX = e.touches[0].clientX - startX;
      if (Math.abs(diffX) > 50) {
        if (diffX > 0 && currentSlide > 0) {
          currentSlide--;
          updateSlider();
          isSwiping = false;
        } else if (diffX < 0 && currentSlide < getMaxIndex()) {
          currentSlide++;
          updateSlider();
          isSwiping = false;
        }
      }
    }, { passive: true });

    certTrack.addEventListener('touchend', () => {
      isSwiping = false;
    });

    window.addEventListener('resize', updateSlider);
    updateSlider(); // Initial call
  }

  // ---- Certificate Zoom / Lightbox Modal ----
  const certModal = document.getElementById('cert-modal');
  const certModalImg = document.getElementById('cert-modal-img');
  const certModalTitle = document.getElementById('cert-modal-title');
  const certModalClose = document.getElementById('cert-modal-close');

  const openCertModal = (src, title) => {
    if (!certModal || !certModalImg) return;
    certModalImg.src = src;
    if (certModalTitle) certModalTitle.textContent = title;
    certModal.classList.add('active');
    certModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
  };

  const closeCertModal = () => {
    if (!certModal) return;
    certModal.classList.remove('active');
    certModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  };

  document.querySelectorAll('.cert__zoom-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.dataset.certSrc;
      const title = btn.dataset.certTitle;
      openCertModal(src, title);
    });
  });

  certModalClose?.addEventListener('click', closeCertModal);
  certModal?.querySelector('.cert-modal__overlay')?.addEventListener('click', closeCertModal);

  // ---- Project Details Modal ----
  const projectModal = document.getElementById('project-modal');
  const projectModalTitle = document.getElementById('project-modal-title');
  const projectModalCategory = document.getElementById('project-modal-category');
  const projectModalDescription = document.getElementById('project-modal-description');
  const projectModalShowcase = document.getElementById('project-modal-showcase');
  const projectModalTags = document.getElementById('project-modal-tags');
  const projectModalLink = document.getElementById('project-modal-link');
  const projectModalClose = document.getElementById('project-modal-close');

  // Detailed Project Data
  const projectsData = {
    'elevator-system-simulation': {
      title: 'Elevator System Simulation',
      category: 'Java / Software',
      description: 'An academic simulation built in Java to model elevator cabin movement and scheduling logic in real-time. The system accepts passenger requests for destination floors, evaluates the optimal cabin to assign based on current direction and distance, and handles elevator acceleration, decelerations, and door operations.\n\nKey features include modular Object-Oriented design (Elevator, Controller, Building, Request), multi-cabin optimization scheduling algorithms, and visual log outputs of door and cabin state transitions.',
      tags: ['Java', 'Object-Oriented Programming', 'Simulation Logic', 'Design Patterns'],
      github: 'https://github.com/SahilRaj-202',
      type: 'console',
      consoleTitle: 'ElevatorSystem.java',
      consoleOutput: `[BUILD SUCCESSFUL in 1.2s]

$ java Main
=== ELEVATOR SYSTEM SIMULATION INITIALIZED ===
Building floors: 10
Cabin count: 2
Status: Idle

[Request] Passenger at Floor 3 wants to go UP to Floor 8.
[System] Dispatching Cabin A (Currently at Floor 1, Idle).
[Cabin A] Moving Up: Floor 1 -> Floor 2 -> Floor 3.
[Cabin A] Arrived at Floor 3. Doors Opening...
[Cabin A] Passenger Entered. Doors Closing.
[Cabin A] Moving Up: Floor 3 -> Floor 4 -> Floor 5 -> Floor 6 -> Floor 7 -> Floor 8.
[Cabin A] Arrived at Floor 8. Doors Opening...
[Cabin A] Passenger Exited. Doors Closing.
[System] Simulation run completed successfully.`
    },
    'hotel-management-system': {
      title: 'Hotel Management System',
      category: 'Java / Software',
      description: 'A modular Java console application built to streamline operations of a front-desk hotel system. It allows operators to check room availability, record guest registrations, issue invoices, and manage check-outs.\n\nTo ensure data persistence, the system utilizes robust Java file streams (File I/O) to save and load database tables directly from local disk files, meaning check-ins and billing data are retained across application restarts.',
      tags: ['Java', 'File I/O', 'Data Persistence', 'Modular Architecture'],
      github: 'https://github.com/SahilRaj-202',
      type: 'console',
      consoleTitle: 'HotelManagement.java',
      consoleOutput: `[BUILD SUCCESSFUL]

$ java HotelApp
============================================
       HOTEL REGISTRATION DESK v1.0
============================================
1. Room Availability Check
2. Check-In New Guest
3. Check-Out & Generate Invoice
4. View Active Bookings
5. Exit
Enter Choice: 2

Entering Guest Details:
Name: Sahil Raj
Room Type: Deluxe Suite
Room Allocated: Suite 402
Nights: 3
Status: Room booked. Guest details written to bookings.txt.

Enter Choice: 3
Enter Room Number: Suite 402
================ INVOICE ===================
Guest: Sahil Raj
Room: Suite 402 (Deluxe Suite)
Rate: $150 / night
Duration: 3 nights
Total Charge: $450.00
Payment Status: Paid
============================================
Check-out processed. bookings.txt updated.`
    },
    'tech-consulting-simulation': {
      title: 'Tech Consulting Simulation',
      category: 'Job Simulation',
      description: 'A professional simulation from Accenture Australia. It involved gathering complex system requirements from virtual stakeholders, analyzing technical frameworks, designing Development Lifecycles (exploring Agile Scrum, Rapid Application Development, and Waterfall tradeoffs), and presenting a scalable cloud system architecture configuration to suit client scaling targets.',
      tags: ['Agile / SDLC', 'Requirement Analysis', 'Cloud Computing', 'Consulting CASE'],
      github: 'https://www.linkedin.com/in/sahil-raj-77565a373',
      type: 'image',
      imageSrc: 'assets/project_ecommerce.png'
    },
    'data-analytics-case-study': {
      title: 'Data Analytics Case Study',
      category: 'Job Simulation',
      description: 'A Deloitte Australia virtual data simulation engagement. Core deliverables included cleansing massive raw data sets, designing relational schemas, writing highly optimized SQL search queries to query transaction data, and designing data visualization dashboards to show key business performance metrics to executive leadership.',
      tags: ['Data Cleaning', 'SQL Optimization', 'Database Schema', 'Data Visualization'],
      github: 'https://www.linkedin.com/in/sahil-raj-77565a373',
      type: 'image',
      imageSrc: 'assets/project_travel.png'
    },
    'developer-portfolio': {
      title: 'Developer Portfolio Website',
      category: 'Web Dev',
      description: 'A premium, responsive portfolio website (this site!) showcasing my development skills, achievements, certifications, and academic progress. Built with a mobile-first responsive layout, smooth CSS transition effects, a custom glassmorphism theme modal system, and a dark/light mode toggle with state persistence.',
      tags: ['HTML5', 'CSS3', 'JavaScript (ES6)', 'Responsive Web Design'],
      github: 'https://github.com/SahilRaj-202',
      type: 'image',
      imageSrc: 'assets/project_social.png'
    },
    'modern-web-applications': {
      title: 'Modern Web Applications',
      category: 'Web Dev',
      description: 'A compilation of responsive interface prototypes and stateful UI components. Built using React and modern CSS methods to study modular interface styling, hook-based state management, database connections, and collaborative code revision management using Git and GitHub.',
      tags: ['React.js', 'State Management', 'Git / GitHub', 'CSS Modules'],
      github: 'https://github.com/SahilRaj-202',
      type: 'image',
      imageSrc: 'assets/project_health.png'
    }
  };

  const openProjectModal = (projectId) => {
    const data = projectsData[projectId];
    if (!projectModal || !data) return;

    projectModalTitle.textContent = data.title;
    projectModalCategory.textContent = data.category;
    projectModalDescription.textContent = data.description;
    projectModalLink.href = data.github;

    // Render Showcase Area
    if (data.type === 'console') {
      projectModalShowcase.innerHTML = `
        <div class="console-mockup">
          <div class="console-mockup__header">
            <div class="console-mockup__dots">
              <span class="console-mockup__dot console-mockup__dot--red"></span>
              <span class="console-mockup__dot console-mockup__dot--yellow"></span>
              <span class="console-mockup__dot console-mockup__dot--green"></span>
            </div>
            <span class="console-mockup__title">${data.consoleTitle}</span>
            <span></span>
          </div>
          <div class="console-mockup__body">
            <div class="console-mockup__prompt">c:\\users\\sahil\\projects></div>
            <div class="console-mockup__output">${data.consoleOutput}</div>
          </div>
        </div>
      `;
    } else {
      projectModalShowcase.innerHTML = `
        <img src="${data.imageSrc}" alt="${data.title} preview" />
      `;
    }

    // Render Tech Tags
    projectModalTags.innerHTML = '';
    data.tags.forEach(tag => {
      const span = document.createElement('span');
      span.classList.add('project-modal__tag');
      span.textContent = tag;
      projectModalTags.appendChild(span);
    });

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
  };

  const closeProjectModal = () => {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  };

  // Bind click event to Project Cards
  document.querySelectorAll('.project__card').forEach(card => {
    // Determine project ID from card contents or structure
    const titleText = card.querySelector('.project__card-title')?.textContent.trim();
    let projectId = '';

    if (titleText === 'Elevator System Simulation') projectId = 'elevator-system-simulation';
    else if (titleText === 'Hotel Management System') projectId = 'hotel-management-system';
    else if (titleText === 'Tech Consulting Simulation') projectId = 'tech-consulting-simulation';
    else if (titleText === 'Data Analytics Case Study') projectId = 'data-analytics-case-study';
    else if (titleText === 'Developer Portfolio') projectId = 'developer-portfolio';
    else if (titleText === 'Modern Web Applications') projectId = 'modern-web-applications';

    if (projectId) {
      // Intercept click on the "View Project" link or card image overlay
      const viewLink = card.querySelector('.project__card-view');
      const imageOverlayLink = card.querySelector('.project__card-link');

      const clickHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        openProjectModal(projectId);
      };

      viewLink?.addEventListener('click', clickHandler);
      imageOverlayLink?.addEventListener('click', clickHandler);
    }
  });

  projectModalClose?.addEventListener('click', closeProjectModal);
  projectModal?.querySelector('.project-modal__overlay')?.addEventListener('click', closeProjectModal);

  // Global escape key handler to close all active modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeCertModal();
    }
  });
});
