// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Active link highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Skill bars animation
const skillBars = document.querySelectorAll('.skill-bar');

skillBars.forEach(bar => {
    const progress = bar.getAttribute('data-progress');
    const progressBar = bar.querySelector('.progress');
    progressBar.style.setProperty('--progress', `${progress}%`);
});

// Initialize EmailJS with your public key
(function() {
    emailjs.init('YnBqQF-d8usqb73bi');
})();

// Handle form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Show sending state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Get form data
    const formData = {
        name: this.querySelector('#name').value,
        email: this.querySelector('#email').value,
        subject: this.querySelector('#subject').value,
        message: this.querySelector('#message').value
    };

    // Send email using EmailJS
    emailjs.send('client_notification', 'template_25duo8f', {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'samsonoakinsanya@gmail.com'
    })
    .then(function() {
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'alert success';
        successMessage.textContent = 'Thank you! Your message has been sent successfully.';
        document.getElementById('contact-form').insertBefore(successMessage, submitButton);
        
        // Remove success message after 5 seconds
        setTimeout(() => successMessage.remove(), 5000);
        
        // Reset form
        document.getElementById('contact-form').reset();
    })
    .catch(function(error) {
        // Show error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'alert error';
        errorMessage.textContent = 'Sorry, failed to send message. Please try again.';
        document.getElementById('contact-form').insertBefore(errorMessage, submitButton);
        
        // Remove error message after 5 seconds
        setTimeout(() => errorMessage.remove(), 5000);
        
        console.error('EmailJS error:', error);
    })
    .finally(function() {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Portfolio hover effect
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.querySelector('.portfolio-overlay').style.opacity = '1';
    });
    
    item.addEventListener('mouseleave', () => {
        item.querySelector('.portfolio-overlay').style.opacity = '0';
    });
});

// Responsive navigation
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
    } else {
        navLinks.style.display = 'none';
    }
});