// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const workItems = document.querySelectorAll('.work-item');
const filterBtns = document.querySelectorAll('.filter-btn');
const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
const statNumbers = document.querySelectorAll('.stat-number');
const contactForm = document.querySelector('.contact-form');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const particlesContainer = document.getElementById('particles-container');

// PDF Download functionality
function initPDFDownloads() {
    const pdfResourcesItem = Array.from(workItems).find(item => {
        const title = item.querySelector('h3');
        return title && title.textContent.includes('PDF Resources');
    });
    
    if (pdfResourcesItem) {
        pdfResourcesItem.style.cursor = 'pointer';
        pdfResourcesItem.addEventListener('click', (e) => {
            // Prevent default link clicks from triggering the modal
            if (e.target.classList.contains('pdf-download')) {
                return;
            }
            showPDFModal();
        });
    }
}

function showPDFModal() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'pdf-modal';
    modal.innerHTML = `
        <div class="pdf-modal-content">
            <div class="pdf-modal-header">
                <h3>View PDF Resources</h3>
                <button class="pdf-modal-close" onclick="this.closest('.pdf-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="pdf-modal-body">
                <div class="pdf-modal-item">
                    <i class="fas fa-mountain"></i>
                    <h4>Mount Package</h4>
                    <a href="Mount Everest Package copy.pdf" class="pdf-download-btn">
                        <i class="fas fa-eye"></i>
                        View PDF
                    </a>
                </div>
                <div class="pdf-modal-item">
                    <i class="fas fa-globe"></i>
                    <h4>God Package</h4>
                    <a href="Untitle.pdf" class="pdf-download-btn">
                        <i class="fas fa-eye"></i>
                        View PDF
                    </a>
                </div>
                <div class="pdf-modal-item">
                    <i class="fas fa-home"></i>
                    <h4>Room Package</h4>
                    <a href="Untitled copy.pdf" class="pdf-download-btn">
                        <i class="fas fa-eye"></i>
                        View PDF
                    </a>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Trigger animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Theme Switching
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Add transition effect
    document.body.style.transition = 'background 0.3s ease, color 0.3s ease';
}

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Particle Animation
function createParticles() {
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation duration and delay
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 20;
    particle.style.animationDuration = duration + 's';
    particle.style.animationDelay = delay + 's';
    
    particlesContainer.appendChild(particle);
    
    // Remove particle after animation and create new one
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
        createParticle();
    }, (duration + delay) * 1000);
}

// Enhanced Text Animation
function animateText(element, text, delay = 0) {
    setTimeout(() => {
        element.innerHTML = '';
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.setProperty('--char-index', index);
            span.style.animationDelay = `${index * 0.05}s`;
            element.appendChild(span);
        });
    }, delay);
}

// Stagger Animation
function applyStaggerAnimation(elements, animationClass) {
    elements.forEach((element, index) => {
        element.style.setProperty('--stagger-delay', index);
        element.classList.add(animationClass);
    });
}

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Work Filter Functionality
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        workItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.classList.add('show');
                }, 100);
            } else {
                item.classList.remove('show');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Animate stat numbers when they come into view
            if (entry.target.classList.contains('stat-number')) {
                animateNumber(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all elements with scroll animations
animateOnScrollElements.forEach(element => {
    observer.observe(element);
});

statNumbers.forEach(number => {
    observer.observe(number);
});

// Animate Numbers
function animateNumber(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Mouse Move Effect for Hero Image
const heroImage = document.querySelector('.hero-image');
if (heroImage) {
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xPos = (clientX - innerWidth / 2) / innerWidth;
        const yPos = (clientY - innerHeight / 2) / innerHeight;
        
        heroImage.style.transform = `translate(${xPos * 20}px, ${yPos * 20}px)`;
    });
}

// Form Submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="loading"></span> Sending...';
        submitBtn.disabled = true;
        
        // Submit to Formspree
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            } else {
                showNotification('Failed to send message. Please try again.', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification('Failed to send message. Please try again.', 'error');
        })
        .finally(() => {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #00b09b, #96c93d)' : 'linear-gradient(135deg, #667eea, #764ba2)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    // Initialize theme
    initTheme();
    
    // Create particles
    createParticles();
    
    // Enhanced hero text animations
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const originalText = nameElement.textContent;
        animateText(nameElement, originalText, 500);
    }
    
    // Apply stagger animations to work items
    applyStaggerAnimation(workItems, 'stagger-slide-up');
    
    // Apply stagger animations to skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    applyStaggerAnimation(skillCategories, 'stagger-scale');
    
    // Apply stagger animations to about sections
    const aboutElements = document.querySelectorAll('.about-text, .about-image');
    applyStaggerAnimation(aboutElements, 'stagger-fade-in');
    
    // Initialize work items with enhanced animation
    workItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('show');
        }, index * 150);
    });
    
    // Add magnetic effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.classList.add('magnetic-btn');
    });
    
    // Add glow effect to theme toggle
    if (themeToggle) {
        themeToggle.classList.add('glow-effect');
    }
});

// Theme toggle event listener
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// Enhanced Cursor Trail Effect
let cursorTrail = [];
const maxTrailLength = 15;

document.addEventListener('mousemove', (e) => {
    // Remove old trail elements
    if (cursorTrail.length >= maxTrailLength) {
        const oldTrail = cursorTrail.shift();
        if (oldTrail && oldTrail.parentNode) {
            oldTrail.parentNode.removeChild(oldTrail);
        }
    }
    
    // Get current theme color
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const trailColor = currentTheme === 'dark' ? '#818cf8' : '#667eea';
    
    // Create new trail element
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: ${trailColor};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        opacity: 0.8;
        transform: translate(-50%, -50%);
        transition: opacity 0.4s ease, transform 0.4s ease;
        filter: blur(1px);
    `;
    
    document.body.appendChild(trail);
    cursorTrail.push(trail);
    
    // Fade out and remove trail
    setTimeout(() => {
        trail.style.opacity = '0';
        trail.style.transform = 'translate(-50%, -50%) scale(0)';
        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 400);
    }, 100);
});

// Work Item Hover Effect
workItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Skill Category Hover Effect
const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach(category => {
    category.addEventListener('mouseenter', () => {
        const icon = category.querySelector('.skill-icon');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(360deg)';
        }
    });
    
    category.addEventListener('mouseleave', () => {
        const icon = category.querySelector('.skill-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Social Links Hover Effect
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-5px) rotate(360deg) scale(1.1)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) rotate(0deg) scale(1)';
    });
});

// Button Ripple Effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    // Scroll-based animations here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Lazy Loading for Images (if you add real images later)
function lazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initAnimations();
    initWorkHover();
    initFilterButtons();
    initContactForm();
    initPDFDownloads();
    initScrollEffects();
    initParticles();
});

// Initialize lazy loading
lazyLoad();

// Add loading screen
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea, #764ba2);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    const loaderContent = document.createElement('div');
    loaderContent.style.cssText = `
        text-align: center;
        color: white;
    `;
    
    loaderContent.innerHTML = `
        <div style="width: 50px; height: 50px; border: 3px solid rgba(255,255,255,0.3); border-top: 3px solid white; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
        <p style="font-size: 1.2rem; font-weight: 500;">Loading amazing content...</p>
    `;
    
    loader.appendChild(loaderContent);
    document.body.appendChild(loader);
    
    // Remove loader after content is loaded
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(loader);
        }, 500);
    }, 1500);
});

// Console welcome message
console.log('%c🎨 Welcome to my Portfolio!', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cBuilt with passion and lots of coffee ☕', 'font-size: 14px; color: #764ba2;');
console.log('%cFeel free to explore the code!', 'font-size: 12px; color: #333;');
