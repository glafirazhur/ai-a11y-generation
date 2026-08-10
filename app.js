/**
 * Elena Vance Portfolio — Interactive JavaScript & Accessibility Controller
 * Vanilla HTML5 / CSS3 / JS
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize features
  initProjectsData();
  initSearch();
  initModal();
  initMobileNav();
  initContactForm();
  initEventsCalendar();
  initEventModal();
});

/* ==========================================================================
   1. Projects Database
   ========================================================================== */
const PROJECTS_DATA = {
  1: {
    title: 'Nova Metrics — Analytics Visualizer',
    tag: 'Data Visualization',
    category: 'Data Visualization & Analytics',
    year: '2026',
    client: 'Lead UI & Accessibility Architect',
    image: 'assets/project1.png',
    alt: 'Interactive Data Visualization Dashboard showing sleek dark interface with glowing violet charts',
    description: 'Nova Metrics is a next-generation real-time data analytics suite tailored for high-density telemetry operations. Designed with custom dark-mode glassmorphic UI widgets, high-contrast charts, screen-reader accessible data summaries, and zero latency telemetry streams.',
    tech: ['D3.js', 'Vanilla JS', 'WCAG AAA', 'SVG Telemetry', 'WebSockets', 'High-Contrast Themes'],
    link: '#'
  },
  2: {
    title: 'Verde — Sustainable Living Mobile App',
    tag: 'Mobile UI/UX',
    category: 'Mobile Application UX/UI',
    year: '2026',
    client: 'Product Designer & Design System Lead',
    image: 'assets/project2.png',
    alt: 'Verde Eco-App UI on a smartphone screen showing clean green energy tracking interfaces',
    description: 'An intuitive mobile experience guiding urban users toward carbon-neutral habits through micro-incentives. Features fluid gesture interactions, dynamic habit visualizers, accessible color contrast modes, and voice-assisted environmental impact reporting.',
    tech: ['iOS & Android', 'Design Systems', 'Accessible Gestures', 'Micro-Interactions', 'Voice UI'],
    link: '#'
  },
  3: {
    title: 'Aetheria — AI Brand Identity & Sculptures',
    tag: 'Generative Art',
    category: 'Generative Art & 3D Shaders',
    year: '2025',
    client: 'Digital Artist & Shader Programmer',
    image: 'assets/project3.png',
    alt: '3D Generative AI Brand Identity showing glowing geometric glass artwork',
    description: 'A series of algorithmic 3D glass sculptures created using procedural shaders and generative mathematical equations. Commissioned for an international immersive art gallery installation in London, featuring responsive light refraction physics.',
    tech: ['Three.js', 'GLSL Shaders', 'Generative Art', '3D WebGL', 'Procedural Textures'],
    link: '#'
  },
  4: {
    title: 'Aura Luxury — Accessible Shopping Experience',
    tag: 'E-Commerce',
    category: 'E-Commerce & Retail Platform',
    year: '2025',
    client: 'Web Accessibility Specialist & Lead Architect',
    image: 'assets/project4.png',
    alt: 'Luxury accessible e-commerce platform web design rendered on a modern laptop',
    description: 'A high-end retail interface crafted around universal design principles. Integrates full keyboard checkout flows, screen-reader optimized product galleries, dynamic alt captions, and ultra-fast sub-100ms page load speeds.',
    tech: ['Semantic HTML5', 'ARIA Live', 'Keyboard Focus Traps', 'Web Vitals 100', 'CSS Grid'],
    link: '#'
  },
  5: {
    title: 'Resonance — 3D Spatial Audio Interface',
    tag: 'Spatial Audio & AR',
    category: 'Spatial Audio & WebXR',
    year: '2026',
    client: 'UX Engineer & Sound Designer',
    image: 'assets/project5.png',
    alt: '3D Spatial Audio Visualizer with glowing cyan audio waveforms in a dark cyber interface',
    description: 'An augmented reality audio workstation that renders acoustic frequencies into interactive 3D light streams. Built with WebXR and WebAudio API, incorporating sensory haptic feedback and live visual captions for deaf and hard-of-hearing music creators.',
    tech: ['WebXR', 'WebAudio API', 'Haptic Feedback', 'Spatial Sound', 'Live Visual Captions'],
    link: '#'
  },
  6: {
    title: 'Solaria — Sustainable Smart Home Hub',
    tag: 'IoT & Smart Systems',
    category: 'IoT & Smart Home Dashboard',
    year: '2026',
    client: 'Lead System Designer',
    image: 'assets/project6.png',
    alt: 'Smart home control center dashboard interface with neon solar and temperature widgets',
    description: 'A unified IoT control center optimizing renewable solar grid storage and indoor environmental comfort. Offers adaptive screen contrast auto-dimming, focus-friendly grid layouts, and emergency voice action triggers.',
    tech: ['IoT Dashboard', 'WebSockets', 'Dark Mode Auto-Contrast', 'Voice Actions', 'Energy Analytics'],
    link: '#'
  }
};

let lastFocusedElement = null;

function initProjectsData() {
  // Setup data links if needed
}

/* ==========================================================================
   2. Search & Real-Time Filtering
   ========================================================================== */
function initSearch() {
  const searchInput = document.getElementById('project-search-input');
  const clearBtn = document.getElementById('clear-search-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const countDisplay = document.getElementById('search-results-count');
  const announcer = document.getElementById('a11y-announcer');

  if (!searchInput) return;

  function filterProjects() {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    // Toggle clear button visibility
    if (query.length > 0) {
      clearBtn.classList.remove('hidden');
    } else {
      clearBtn.classList.add('hidden');
    }

    projectCards.forEach(card => {
      const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.card-description')?.textContent.toLowerCase() || '';
      const tag = card.querySelector('.card-tag')?.textContent.toLowerCase() || '';
      const category = card.getAttribute('data-category')?.toLowerCase() || '';

      const matches = title.includes(query) || desc.includes(query) || tag.includes(query) || category.includes(query);

      if (matches) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    // Update screen reader & visible status text
    const statusMsg = query.length > 0 
      ? `Found ${visibleCount} project${visibleCount === 1 ? '' : 's'} matching "${query}"`
      : `Showing all ${visibleCount} projects`;

    if (countDisplay) {
      countDisplay.textContent = statusMsg;
    }

    if (announcer) {
      announcer.textContent = statusMsg;
    }
  }

  // Debounced input handler for smooth performance
  let debounceTimer;
  searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(filterProjects, 150);
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchInput.value) {
      searchInput.value = '';
      filterProjects();
    }
  });

  clearBtn?.addEventListener('click', () => {
    searchInput.value = '';
    filterProjects();
    searchInput.focus();
  });
}

/* ==========================================================================
   3. Accessible Modal Dialog Logic
   ========================================================================== */
function initModal() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const secondaryCloseBtn = modal?.querySelector('.modal-secondary-close');
  const backdrop = modal?.querySelector('.modal-backdrop');

  if (!modal) return;

  // Open modal buttons (both "Show details" buttons and Title links)
  document.querySelectorAll('[data-project-id], [data-open-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = trigger.getAttribute('data-project-id') || trigger.getAttribute('data-open-modal');
      openModal(projectId);
    });
  });

  function openModal(id) {
    const data = PROJECTS_DATA[id];
    if (!data) return;

    // Save active element to restore focus on close
    lastFocusedElement = document.activeElement;

    // Populate modal fields
    document.getElementById('modal-tag').textContent = data.tag;
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-desc').textContent = data.description;
    document.getElementById('modal-category').textContent = data.category;
    document.getElementById('modal-year').textContent = data.year;
    document.getElementById('modal-client').textContent = data.client;
    
    const imgEl = document.getElementById('modal-image');
    imgEl.src = data.image;
    imgEl.alt = data.alt;

    // Technologies tags
    const techContainer = document.getElementById('modal-tech-list');
    techContainer.innerHTML = '';
    data.tech.forEach(t => {
      const li = document.createElement('li');
      li.className = 'tech-tag';
      li.textContent = t;
      techContainer.appendChild(li);
    });

    // Populate external demo link
    const externalLink = document.getElementById('modal-external-link');
    if (externalLink) {
      externalLink.href = data.link || '#';
    }

    // Show dialog
    if (typeof modal.showModal === 'function') {
      modal.showModal();
    } else {
      modal.setAttribute('open', '');
    }

    document.body.style.overflow = 'hidden';

    // Shift focus inside modal
    setTimeout(() => {
      closeBtn?.focus();
    }, 50);

    // Announce to screen reader
    const announcer = document.getElementById('a11y-announcer');
    if (announcer) {
      announcer.textContent = `Opened details dialog for ${data.title}`;
    }
  }

  function closeModal() {
    if (typeof modal.close === 'function' && modal.open) {
      modal.close();
    } else {
      modal.removeAttribute('open');
    }

    document.body.style.overflow = '';

    // Restore focus
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }

    const announcer = document.getElementById('a11y-announcer');
    if (announcer) {
      announcer.textContent = 'Closed project details dialog';
    }
  }

  closeBtn?.addEventListener('click', closeModal);
  secondaryCloseBtn?.addEventListener('click', closeModal);

  // Close on native dialog cancel (e.g. Escape key)
  modal.addEventListener('cancel', (e) => {
    e.preventDefault();
    closeModal();
  });

  // Close when clicking native dialog backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Keyboard Focus Trap inside modal
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      const focusables = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

/* ==========================================================================
   4. Mobile Navigation Menu Toggle
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.getElementById('primary-navigation');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', (!isExpanded).toString());
    navMenu.classList.toggle('is-open');

    const announcer = document.getElementById('a11y-announcer');
    if (announcer) {
      announcer.textContent = !isExpanded ? 'Mobile navigation menu opened' : 'Mobile navigation menu closed';
    }
  });

  // Close nav when clicking a link
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Close nav on click outside or Escape key
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('is-open') && !navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      navMenu.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
      navMenu.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.focus();
    }
  });
}

/* ==========================================================================
   5. Contact Form Accessible Validation
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusBanner = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  const fields = {
    name: {
      input: document.getElementById('contact-name'),
      error: document.getElementById('name-error'),
      validate: (val) => val.trim().length > 0
    },
    email: {
      input: document.getElementById('contact-email'),
      error: document.getElementById('email-error'),
      validate: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())
    },
    subject: {
      input: document.getElementById('contact-subject'),
      error: document.getElementById('subject-error'),
      validate: (val) => val !== null && val.trim() !== ''
    },
    message: {
      input: document.getElementById('contact-message'),
      error: document.getElementById('message-error'),
      validate: (val) => val.trim().length >= 10
    }
  };

  // Real-time blur validation
  Object.keys(fields).forEach(key => {
    const field = fields[key];
    if (!field.input) return;

    field.input.addEventListener('blur', () => {
      validateSingleField(field);
    });

    field.input.addEventListener('input', () => {
      if (field.input.classList.contains('invalid')) {
        validateSingleField(field);
      }
    });
  });

  function validateSingleField(field) {
    const isValid = field.validate(field.input.value);
    if (!isValid) {
      field.input.classList.add('invalid');
      field.input.setAttribute('aria-invalid', 'true');
      field.error?.classList.remove('hidden');
    } else {
      field.input.classList.remove('invalid');
      field.input.setAttribute('aria-invalid', 'false');
      field.error?.classList.add('hidden');
    }
    return isValid;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isFormValid = true;
    let firstInvalidField = null;

    Object.keys(fields).forEach(key => {
      const field = fields[key];
      const valid = validateSingleField(field);
      if (!valid) {
        isFormValid = false;
        if (!firstInvalidField) firstInvalidField = field.input;
      }
    });

    if (!isFormValid) {
      statusBanner.className = 'form-status error';
      statusBanner.textContent = 'Please correct the errors in the form before submitting.';
      statusBanner.classList.remove('hidden');
      firstInvalidField?.focus();
      return;
    }

    // Simulate submission
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').textContent = 'Sending...';
    submitBtn.querySelector('.btn-spinner').classList.remove('hidden');

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').textContent = 'Send Message';
      submitBtn.querySelector('.btn-spinner').classList.add('hidden');

      statusBanner.className = 'form-status success';
      statusBanner.textContent = 'Thank you! Your message has been sent successfully. Elena will get back to you within 24 hours.';
      statusBanner.classList.remove('hidden');

      form.reset();

      // Reset invalid states
      Object.keys(fields).forEach(key => {
        fields[key].input.classList.remove('invalid');
        fields[key].input.setAttribute('aria-invalid', 'false');
      });

      const announcer = document.getElementById('a11y-announcer');
      if (announcer) {
        announcer.textContent = 'Contact form submitted successfully.';
      }
    }, 700);
  });
}

/* ==========================================================================
   6. Events & Visual Calendar Grid Controller
   ========================================================================== */
const EVENTS_DATA = [
  {
    id: 'evt-1',
    day: 5,
    month: 'August',
    year: 2026,
    dateString: 'Wednesday, Aug 5, 2026',
    time: '10:00 AM PST',
    title: 'Global Inclusive Design Summit',
    category: 'keynote',
    categoryName: 'Keynote Speaker',
    location: 'San Francisco & Virtual Streaming',
    role: 'Keynote Speaker & Panel Host',
    organizer: 'Inclusive Tech Alliance',
    description: 'Elena presents "Designing Beyond 2D: WCAG AAA Standards in WebXR & Spatial Interfaces", exploring accessible spatial audio cues and contrast management in 3D WebGL worlds.',
    topics: ['WCAG AAA', 'WebXR', 'Spatial Audio', 'Universal UX Design', 'Inclusive Tech']
  },
  {
    id: 'evt-2',
    day: 11,
    month: 'August',
    year: 2026,
    dateString: 'Tuesday, Aug 11, 2026',
    time: '6:30 PM BST',
    title: 'Aetheria Generative Light Premiere',
    category: 'exhibition',
    categoryName: 'Art Exhibition',
    location: 'Tate Modern (Digital Wing), London & Live VR Stream',
    role: 'Featured Digital Artist',
    organizer: 'Tate Modern Digital Arts Guild',
    description: 'Official premiere of Elena\'s algorithmic 3D glass sculpture series "Aetheria". Features interactive WebGL light refraction shaders synced to live sensory haptic feedback.',
    topics: ['Three.js', 'Generative Shaders', '3D WebGL', 'Immersive Art', 'Sensory Haptics']
  },
  {
    id: 'evt-3',
    day: 18,
    month: 'August',
    year: 2026,
    dateString: 'Tuesday, Aug 18, 2026',
    time: '2:00 PM PST',
    title: 'Accessible UI Masterclass',
    category: 'workshop',
    categoryName: 'Design Workshop',
    location: 'Online Interactive Workshop',
    role: 'Workshop Leader',
    organizer: 'Frontend Design Systems Guild',
    description: 'An intensive 3-hour masterclass teaching developers and designers how to build ultra-fast, WCAG 2.1 AAA accessible UI components using pure Vanilla HTML5, CSS3, and JavaScript.',
    topics: ['Vanilla JS', 'ARIA Patterns', 'Keyboard Focus Traps', 'High Contrast', 'Performance']
  },
  {
    id: 'evt-4',
    day: 22,
    month: 'August',
    year: 2026,
    dateString: 'Saturday, Aug 22, 2026',
    time: '4:00 PM EST',
    title: 'High-Contrast Aesthetics Forum',
    category: 'panel',
    categoryName: 'Panel Discussion',
    location: 'New York Design Hub & Live Stream',
    role: 'Panel Speaker',
    organizer: 'UX & Telemetry Design Forum',
    description: 'Fireside panel discussing the union of sleek dark glassmorphism aesthetics with screen-reader friendly data analytics and real-time visualization dashboards.',
    topics: ['Data Visualizer', 'Telemetry Design', 'Color Contrast', 'Dark Mode UI', 'a11y Auditing']
  },
  {
    id: 'evt-5',
    day: 27,
    month: 'August',
    year: 2026,
    dateString: 'Thursday, Aug 27, 2026',
    time: '11:00 AM PST',
    title: 'Verde Eco UI Webinar',
    category: 'webinar',
    categoryName: 'Webinar Presentation',
    location: 'Design Systems Live Stream',
    role: 'Lead Presenter',
    organizer: 'Eco Tech & Design Community',
    description: 'Case study showcase on designing carbon-neutral habit trackers with fluid gesture interactions, dynamic visualizers, and AAA contrast palette modes.',
    topics: ['Mobile UI/UX', 'Behavioral Design', 'Micro-Interactions', 'Green Tech', 'Design Systems']
  },
  {
    id: 'evt-6',
    day: 29,
    month: 'August',
    year: 2026,
    dateString: 'Saturday, Aug 29, 2026',
    time: '9:00 AM PST',
    title: 'Accessible Web Architecture Hackathon',
    category: 'keynote',
    categoryName: 'Hackathon & Mentorship',
    location: 'San Francisco Innovation Hub',
    role: 'Guest Judge & Design Mentor',
    organizer: 'Bay Area Web Accessibility Group',
    description: 'Elena serves as lead judge and mentor for over 200 developers creating accessible web apps for users with vision, auditory, and motor impairments.',
    topics: ['Mentorship', 'Assistive Tech', 'Screen Readers', 'Universal Access', 'Community']
  }
];

function initEventsCalendar() {
  const daysContainer = document.getElementById('calendar-days-container');
  const listContainer = document.getElementById('events-list-container');
  const monthBadge = document.getElementById('month-badge-count');
  const filterPills = document.querySelectorAll('.category-filters .filter-pill');
  const btnGrid = document.getElementById('btn-view-grid');
  const btnList = document.getElementById('btn-view-list');
  const gridView = document.getElementById('calendar-grid-view');
  const listView = document.getElementById('calendar-list-view');
  const statusMsg = document.getElementById('calendar-status-msg');

  if (!daysContainer) return;

  let activeCategory = 'all';

  // August 2026 calendar parameters:
  // Aug 1, 2026 is Saturday (index 6, Sun=0..Sat=6)
  const startDayOfWeek = 6;
  const totalDaysInMonth = 31;
  const todayDate = 10; // Aug 10, 2026

  function renderCalendar() {
    daysContainer.innerHTML = '';
    listContainer.innerHTML = '';

    // Filter events
    const filteredEvents = activeCategory === 'all'
      ? EVENTS_DATA
      : EVENTS_DATA.filter(evt => evt.category === activeCategory);

    if (monthBadge) {
      monthBadge.textContent = `${filteredEvents.length} Active Event${filteredEvents.length === 1 ? '' : 's'}`;
    }

    const eventsByDay = {};
    filteredEvents.forEach(evt => {
      if (!eventsByDay[evt.day]) eventsByDay[evt.day] = [];
      eventsByDay[evt.day].push(evt);
    });

    /* 1. Grid View Render */
    const prevMonthDays = 31;
    let allCells = [];

    // July previous month cells
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const dayNum = prevMonthDays - i;
      const cell = document.createElement('div');
      cell.className = 'calendar-day-cell other-month';
      cell.setAttribute('role', 'gridcell');
      cell.setAttribute('aria-label', `July ${dayNum}, 2026`);
      cell.innerHTML = `
        <div class="day-header-row">
          <span class="day-number" aria-hidden="true">${dayNum}</span>
        </div>
      `;
      allCells.push(cell);
    }

    // August current month cells
    for (let day = 1; day <= totalDaysInMonth; day++) {
      const cell = document.createElement('div');
      const isToday = (day === todayDate);
      cell.className = `calendar-day-cell${isToday ? ' day-today' : ''}`;
      cell.setAttribute('role', 'gridcell');
      cell.setAttribute('aria-label', `August ${day}, 2026${isToday ? ', Today' : ''}`);

      let eventsHtml = '';
      const dayEvts = eventsByDay[day] || [];
      if (dayEvts.length > 0) {
        eventsHtml = `<div class="day-events-wrapper">`;
        dayEvts.forEach(evt => {
          eventsHtml += `
            <button type="button" class="event-chip cat-${evt.category}" data-event-id="${evt.id}" aria-label="${evt.categoryName}: ${evt.title}, at ${evt.time}">
              <span class="event-chip-time">${evt.time}</span>
              <span class="event-chip-title">${evt.title}</span>
            </button>
          `;
        });
        eventsHtml += `</div>`;
      }

      cell.innerHTML = `
        <div class="day-header-row">
          <span class="day-number">${day}</span>
          ${isToday ? '<span class="today-label">Today</span>' : ''}
        </div>
        ${eventsHtml}
      `;

      allCells.push(cell);
    }

    // September next month cells
    const totalCellsSoFar = startDayOfWeek + totalDaysInMonth;
    const remainingCells = (totalCellsSoFar <= 35) ? (35 - totalCellsSoFar) : (42 - totalCellsSoFar);
    for (let day = 1; day <= remainingCells; day++) {
      const cell = document.createElement('div');
      cell.className = 'calendar-day-cell other-month';
      cell.setAttribute('role', 'gridcell');
      cell.setAttribute('aria-label', `September ${day}, 2026`);
      cell.innerHTML = `
        <div class="day-header-row">
          <span class="day-number" aria-hidden="true">${day}</span>
        </div>
      `;
      allCells.push(cell);
    }

    // Group cells into 7-day week rows for valid ARIA grid hierarchy (grid -> row -> gridcell)
    for (let i = 0; i < allCells.length; i += 7) {
      const weekRow = document.createElement('div');
      weekRow.className = 'calendar-week-row';
      weekRow.setAttribute('role', 'row');
      for (let j = i; j < i + 7 && j < allCells.length; j++) {
        weekRow.appendChild(allCells[j]);
      }
      daysContainer.appendChild(weekRow);
    }

    /* 2. List View Render */
    if (filteredEvents.length === 0) {
      listContainer.innerHTML = `<p style="padding: 2rem; text-align: center; color: var(--text-muted);">No events found for this category.</p>`;
    } else {
      filteredEvents.forEach(evt => {
        const item = document.createElement('div');
        item.className = 'event-list-item';
        item.setAttribute('role', 'listitem');
        item.innerHTML = `
          <div class="event-list-date-box" aria-label="${evt.dateString}">
            <span class="event-list-day" aria-hidden="true">${evt.day}</span>
            <abbr class="event-list-month" title="${evt.month}">${evt.month.substring(0, 3).toUpperCase()}</abbr>
          </div>
          <div class="event-list-details">
            <div class="event-list-meta">
              <span class="filter-pill active" style="font-size: 0.75rem; padding: 0.2rem 0.6rem;">${evt.categoryName}</span>
              <span class="event-chip-time">${evt.time}</span>
            </div>
            <h4 class="event-list-title">${evt.title}</h4>
            <p class="event-list-location">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              ${evt.location}
            </p>
          </div>
          <div>
            <button type="button" class="btn btn-secondary" data-event-id="${evt.id}" aria-label="View details for ${evt.title}" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
              View Details
            </button>
          </div>
        `;
        listContainer.appendChild(item);
      });
    }

    // Attach listeners for event dialog triggers
    document.querySelectorAll('[data-event-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const evtId = btn.getAttribute('data-event-id');
        openEventModal(evtId);
      });
    });

    const categoryLabel = activeCategory === 'all' ? 'all' : activeCategory;
    const msg = `Showing ${filteredEvents.length} event${filteredEvents.length === 1 ? '' : 's'} for ${categoryLabel} in August 2026.`;
    if (statusMsg) statusMsg.textContent = msg;
  }

  // Category filters handler
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-pressed', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-pressed', 'true');
      activeCategory = pill.getAttribute('data-category');
      renderCalendar();
    });
  });

  // View toggle handler
  function setView(view) {
    if (view === 'grid') {
      btnGrid.classList.add('active');
      btnGrid.setAttribute('aria-pressed', 'true');
      btnList.classList.remove('active');
      btnList.setAttribute('aria-pressed', 'false');
      gridView.classList.remove('hidden');
      listView.classList.add('hidden');
    } else {
      btnList.classList.add('active');
      btnList.setAttribute('aria-pressed', 'true');
      btnGrid.classList.remove('active');
      btnGrid.setAttribute('aria-pressed', 'false');
      listView.classList.remove('hidden');
      gridView.classList.add('hidden');
    }
  }

  btnGrid?.addEventListener('click', () => setView('grid'));
  btnList?.addEventListener('click', () => setView('list'));

  renderCalendar();
}

/* ==========================================================================
   7. Event Detail Accessible Dialog Controller
   ========================================================================== */
function initEventModal() {
  const modal = document.getElementById('event-modal');
  const closeBtn = document.getElementById('event-modal-close-btn');
  const secondaryCloseBtn = modal?.querySelector('.event-modal-secondary-close');
  const addCalBtn = document.getElementById('event-modal-add-cal');

  if (!modal) return;

  function closeModal() {
    if (typeof modal.close === 'function' && modal.open) {
      modal.close();
    } else {
      modal.removeAttribute('open');
    }

    modal.classList.remove('active');
    document.body.style.overflow = '';

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }

    const announcer = document.getElementById('a11y-announcer');
    if (announcer) {
      announcer.textContent = 'Closed event details dialog';
    }
  }

  closeBtn?.addEventListener('click', closeModal);
  secondaryCloseBtn?.addEventListener('click', closeModal);

  modal.addEventListener('cancel', (e) => {
    e.preventDefault();
    closeModal();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Keyboard Focus Trap inside event modal
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      const focusables = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  addCalBtn?.addEventListener('click', () => {
    const title = document.getElementById('event-modal-title').textContent;
    const announcer = document.getElementById('a11y-announcer');
    if (announcer) {
      announcer.textContent = `"${title}" has been added to your calendar schedule.`;
    }
    addCalBtn.textContent = 'Added to Calendar ✓';
    setTimeout(() => {
      addCalBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        Add to Calendar
      `;
    }, 2500);
  });
}

function openEventModal(evtId) {
  const modal = document.getElementById('event-modal');
  const evt = EVENTS_DATA.find(e => e.id === evtId);
  if (!modal || !evt) return;

  lastFocusedElement = document.activeElement;

  document.getElementById('event-modal-category').textContent = evt.categoryName;
  document.getElementById('event-modal-date').textContent = evt.dateString;
  document.getElementById('event-modal-time').textContent = evt.time;
  document.getElementById('event-modal-title').textContent = evt.title;
  document.getElementById('event-modal-desc').textContent = evt.description;
  document.getElementById('event-modal-location').textContent = evt.location;
  document.getElementById('event-modal-role').textContent = evt.role;
  document.getElementById('event-modal-organizer').textContent = evt.organizer;

  const topicsList = document.getElementById('event-modal-topics');
  if (topicsList) {
    topicsList.innerHTML = evt.topics.map(t => `<li class="tech-tag">${t}</li>`).join('');
  }

  const addCalBtn = document.getElementById('event-modal-add-cal');
  if (addCalBtn) {
    addCalBtn.setAttribute('aria-label', `Add ${evt.title} to calendar schedule`);
  }

  if (typeof modal.showModal === 'function') {
    modal.showModal();
  } else {
    modal.setAttribute('open', '');
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  setTimeout(() => {
    document.getElementById('event-modal-close-btn')?.focus();
  }, 50);

  const announcer = document.getElementById('a11y-announcer');
  if (announcer) {
    announcer.textContent = `Opened event details dialog for ${evt.title}`;
  }
}
