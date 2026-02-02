/**
 * Cloud Native Valencia - Main JavaScript
 * Features: Scroll animations, YouTube API, CFP modal, sticky button
 */

// ==========================================
// CONFIGURATION
// ==========================================
const CONFIG = {
  // YouTube Configuration
  youtube: {
    channelId: '@cloudnativevalencia',  // EDIT: Your YouTube channel ID
    apiKey: '', // OPTIONAL: Add YouTube Data API v3 key for dynamic video loading
    maxResults: 6,
    playlistId: '' // OPTIONAL: Specific playlist ID if you want to feature a playlist
  },
  
  // Scroll reveal configuration
  scrollReveal: {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  },
  
  // Sticky CFP button appears after scrolling this many pixels
  stickyCFPScrollThreshold: 500
};

// ==========================================
// INTERSECTION OBSERVER FOR SCROLL REVEALS
// ==========================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-up');
  
  if (!revealElements.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Optionally stop observing after reveal for performance
        observer.unobserve(entry.target);
      }
    });
  }, CONFIG.scrollReveal);
  
  revealElements.forEach((el) => observer.observe(el));
}

// ==========================================
// STICKY CFP BUTTON VISIBILITY
// ==========================================
function initStickyCFP() {
  const stickyBtn = document.getElementById('sticky-cfp');
  if (!stickyBtn) return;
  
  let lastScrollPosition = 0;
  let ticking = false;
  
  function updateStickyButton(scrollPos) {
    if (scrollPos > CONFIG.stickyCFPScrollThreshold) {
      stickyBtn.classList.add('visible');
    } else {
      stickyBtn.classList.remove('visible');
    }
  }
  
  window.addEventListener('scroll', () => {
    lastScrollPosition = window.scrollY;
    
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateStickyButton(lastScrollPosition);
        ticking = false;
      });
      
      ticking = true;
    }
  });
  
  // Click handler for sticky CFP button
  stickyBtn.addEventListener('click', () => {
    openCFPModal();
  });
}

// ==========================================
// CFP MODAL HANDLERS
// ==========================================
function openCFPModal() {
  const modal = document.getElementById('cfp-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus first input for accessibility
    const firstInput = modal.querySelector('input, textarea');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }
  }
}

function closeCFPModal() {
  const modal = document.getElementById('cfp-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeCFPModal();
  }
});

// Prevent modal content clicks from closing modal
document.addEventListener('DOMContentLoaded', () => {
  const modalContent = document.querySelector('.modal-content');
  if (modalContent) {
    modalContent.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
});

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (!toggle || !navLinks) return;
  
  toggle.addEventListener('click', () => {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !isExpanded);
    navLinks.style.display = isExpanded ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '100%';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'white';
    navLinks.style.padding = '1rem';
    navLinks.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
  });
  
  // Close menu on nav link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        navLinks.style.display = 'none';
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#" or modal trigger
      if (href === '#' || href === '#cfp-modal') {
        if (href === '#cfp') {
          e.preventDefault();
          openCFPModal();
        }
        return;
      }
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ==========================================
// YOUTUBE DATA API INTEGRATION (OPTIONAL)
// Fetches latest videos from channel and populates video grid
// ==========================================
async function loadYouTubeVideos() {
  // Skip if no API key configured
  if (!CONFIG.youtube.apiKey) {
    console.info('YouTube API key not configured. Using placeholder videos.');
    return;
  }
  
  const videoGrid = document.getElementById('video-grid');
  if (!videoGrid) return;
  
  try {
    // Construct API URL
    const apiUrl = new URL('https://www.googleapis.com/youtube/v3/search');
    apiUrl.searchParams.append('key', CONFIG.youtube.apiKey);
    apiUrl.searchParams.append('channelId', CONFIG.youtube.channelId);
    apiUrl.searchParams.append('part', 'snippet,id');
    apiUrl.searchParams.append('order', 'date');
    apiUrl.searchParams.append('maxResults', CONFIG.youtube.maxResults);
    apiUrl.searchParams.append('type', 'video');
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      console.warn('No videos found from YouTube API');
      return;
    }
    
    // Clear placeholder videos
    videoGrid.innerHTML = '';
    
    // Create video cards from API response
    data.items.forEach((video, index) => {
      const videoCard = createVideoCard(video);
      videoCard.classList.add('reveal-up');
      videoCard.style.animationDelay = `${index * 0.1}s`;
      videoGrid.appendChild(videoCard);
    });
    
    // Re-initialize scroll reveal for new elements
    initScrollReveal();
    
  } catch (error) {
    console.error('Failed to load YouTube videos:', error);
    // Keep placeholder videos on error
  }
}

/**
 * Creates a video card element from YouTube API data
 * @param {Object} video - YouTube video data from API
 * @returns {HTMLElement} Video card element
 */
function createVideoCard(video) {
  const card = document.createElement('div');
  card.className = 'video-card';
  
  const videoId = video.id.videoId;
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const thumbnailUrl = video.snippet.thumbnails.medium.url;
  const title = video.snippet.title;
  const publishedDate = new Date(video.snippet.publishedAt);
  const timeAgo = getTimeAgo(publishedDate);
  
  card.innerHTML = `
    <a href="${videoUrl}" target="_blank" rel="noopener noreferrer" class="video-thumbnail">
      <img src="${thumbnailUrl}" alt="${escapeHtml(title)}" loading="lazy">
      <div class="play-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      </div>
    </a>
    <div class="video-info">
      <h3>${escapeHtml(title)}</h3>
      <p class="video-meta">${timeAgo}</p>
    </div>
  `;
  
  return card;
}

/**
 * Calculate relative time (e.g., "2 weeks ago")
 * @param {Date} date - Date to compare
 * @returns {string} Relative time string
 */
function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };
  
  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
    }
  }
  
  return 'just now';
}

/**
 * Escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ==========================================
// FORM VALIDATION & NETLIFY FORMS SETUP
// ==========================================
function initFormValidation() {
  const form = document.querySelector('form[name="cfp"]');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    // Basic validation (browser handles required fields)
    // You can add custom validation here if needed
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Submitting...';
      submitBtn.disabled = true;
      
      // Netlify Forms will handle the submission
      // Form will redirect to success.html on success
      // You can create a custom success page or handle it here
    }
  });
}

// ==========================================
// ANALYTICS & TRACKING (OPTIONAL)
// Add your analytics code here (Google Analytics, Plausible, etc.)
// ==========================================
function initAnalytics() {
  // Example: Track CFP modal opens
  const stickyCfpBtn = document.getElementById('sticky-cfp');
  const heroCfpBtn = document.querySelector('.hero-ctas .btn-primary');
  
  [stickyCfpBtn, heroCfpBtn].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        // Track event with your analytics tool
        if (typeof gtag !== 'undefined') {
          gtag('event', 'cfp_modal_open', {
            'event_category': 'engagement',
            'event_label': btn.id || 'hero_cta'
          });
        }
      });
    }
  });
}

// ==========================================
// ACCESSIBILITY ENHANCEMENTS
// ==========================================
function initAccessibility() {
  // Add skip to content link
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'skip-to-content';
  skipLink.textContent = 'Skip to content';
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Trap focus in modal when open
  const modal = document.getElementById('cfp-modal');
  if (modal) {
    modal.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const focusableElements = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    });
  }
}

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================
function initLazyLoading() {
  // Native lazy loading is already used in img tags
  // This function can be extended for additional optimizations
  
  // Defer non-critical JavaScript
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      loadYouTubeVideos();
    });
  } else {
    setTimeout(loadYouTubeVideos, 1000);
  }
}

// ==========================================
// INITIALIZATION
// ==========================================
function init() {
  // Core features
  initScrollReveal();
  initStickyCFP();
  initMobileMenu();
  initSmoothScroll();
  initFormValidation();
  initAccessibility();
  initLazyLoading();
  
  // Optional features
  initAnalytics();
  
  // Log initialization
  console.info('Cloud Native Valencia website initialized ✓');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ==========================================
// UTILITY FUNCTIONS (exported for testing)
// ==========================================
window.CloudNativeValencia = {
  openCFPModal,
  closeCFPModal,
  loadYouTubeVideos,
  CONFIG
};
