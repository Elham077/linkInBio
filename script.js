// script.js - Enhanced with Modern Features
document.addEventListener('DOMContentLoaded', function() {
  // Set current year
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  
  // Initialize animations
  initAnimations();
  
  // Initialize tooltips
  initTooltips();
  
  // Initialize back to top button
  initBackToTop();
  
  // Initialize link interactions
  initLinkInteractions();
  
  // Initialize theme detection
  initThemeDetection();
  
  // Initialize performance optimization
  initPerformanceOptimization();
});

function initAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate__animated', 'animate__fadeInUp');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements
  document.querySelectorAll('.link-card, .stat, .tech-tag').forEach(el => {
    observer.observe(el);
  });
  
  // Add hover animation to stats
  const stats = document.querySelectorAll('.stat');
  stats.forEach(stat => {
    stat.addEventListener('mouseenter', () => {
      stat.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    stat.addEventListener('mouseleave', () => {
      stat.style.transform = 'translateY(0) scale(1)';
    });
  });
}

function initTooltips() {
  // Create tooltip container
  const tooltipContainer = document.createElement('div');
  tooltipContainer.className = 'tooltip-container';
  tooltipContainer.style.cssText = `
    position: fixed;
    background: rgba(30, 41, 59, 0.95);
    color: #f8fafc;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 0.9rem;
    pointer-events: none;
    z-index: 10000;
    opacity: 0;
    transform: translateY(-10px);
    transition: all 0.2s ease;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    max-width: 200px;
    text-align: center;
  `;
  document.body.appendChild(tooltipContainer);
  
  // Add tooltip functionality to tech tags
  const techTags = document.querySelectorAll('.tech-tag');
  techTags.forEach(tag => {
    tag.addEventListener('mouseenter', (e) => {
      const tooltip = e.target.dataset.tooltip;
      if (tooltip) {
        tooltipContainer.textContent = tooltip;
        tooltipContainer.style.opacity = '1';
        tooltipContainer.style.transform = 'translateY(0)';
        
        const rect = e.target.getBoundingClientRect();
        tooltipContainer.style.left = `${rect.left + rect.width / 2}px`;
        tooltipContainer.style.top = `${rect.top - 10}px`;
        tooltipContainer.style.transform = `translate(-50%, -100%)`;
      }
    });
    
    tag.addEventListener('mouseleave', () => {
      tooltipContainer.style.opacity = '0';
      tooltipContainer.style.transform = 'translate(-50%, -110%)';
    });
  });
}

function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

function initLinkInteractions() {
  const linkCards = document.querySelectorAll('.link-card');
  
  linkCards.forEach(card => {
    // Ripple effect
    card.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        top: ${y}px;
        left: ${x}px;
        pointer-events: none;
      `;
      
      this.appendChild(ripple);
      
      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
    
    // Advanced hover effects
    card.addEventListener('mouseenter', function() {
      this.style.zIndex = '10';
      this.querySelector('.link-arrow').style.transform = 'translateX(5px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.zIndex = '';
      this.querySelector('.link-arrow').style.transform = 'translateX(0)';
    });
    
    // Keyboard navigation
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
  
  // Add CSS for ripple animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

function initThemeDetection() {
  // Check for saved theme preference or default to system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });
}

function initPerformanceOptimization() {
  // Lazy load images
  const images = document.querySelectorAll('img[data-src]');
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
  
  // Prefetch important links
  const importantLinks = [
    'https://www.fiverr.com/elham_developer',
    'https://www.linkedin.com/in/mohammad-elham-%E2%80%8Ckohistani-a121b3382'
  ];
  
  importantLinks.forEach(link => {
    const prefetchLink = document.createElement('link');
    prefetchLink.rel = 'prefetch';
    prefetchLink.href = link;
    document.head.appendChild(prefetchLink);
  });
}

// Add error handling for images
window.addEventListener('error', function(e) {
  if (e.target.tagName === 'IMG') {
    const img = e.target;
    if (!img.hasAttribute('data-error-handled')) {
      img.setAttribute('data-error-handled', 'true');
      
      // Try to load placeholder
      if (img.src.includes('07.png')) {
        const placeholder = img.parentElement.querySelector('.avatar-placeholder');
        if (placeholder) {
          placeholder.style.display = 'flex';
        }
      }
      
      // Set a generic placeholder
      img.style.display = 'none';
    }
  }
}, true);

// Add analytics tracking
function trackLinkClick(platform) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'link_click', {
      'event_category': 'engagement',
      'event_label': platform,
      'value': 1
    });
  }
  
  // Store in localStorage for offline tracking
  const clicks = JSON.parse(localStorage.getItem('link_clicks') || '{}');
  clicks[platform] = (clicks[platform] || 0) + 1;
  clicks.timestamp = Date.now();
  localStorage.setItem('link_clicks', JSON.stringify(clicks));
}

// Add click tracking to links
document.querySelectorAll('.link-card').forEach(link => {
  link.addEventListener('click', function() {
    const platform = this.querySelector('.link-name').textContent;
    trackLinkClick(platform);
  });
});

// Send stored analytics when online
window.addEventListener('online', () => {
  const clicks = JSON.parse(localStorage.getItem('link_clicks') || '{}');
  if (Object.keys(clicks).length > 0) {
    // Here you would typically send this to your analytics server
    console.log('Sending stored analytics:', clicks);
    localStorage.removeItem('link_clicks');
  }
});

// Add service worker for PWA capabilities
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(error => {
      console.log('Service Worker registration failed:', error);
    });
  });
}