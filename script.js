// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Set current year
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Smooth link hovers
    const links = document.querySelectorAll('.link');
    links.forEach(link => {
      link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-1px)';
      });
      
      link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });
  });