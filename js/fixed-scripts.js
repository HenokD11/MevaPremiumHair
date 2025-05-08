document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
        // Fallback to hide preloader after 3 seconds in case window load event doesn't fire
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 3000);
    }

    // Initialize AOS (Animate on Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const header = document.querySelector('header');
    const body = document.body;

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            header.classList.toggle('mobile-open');
            body.classList.toggle('no-scroll');
        });

        // Close mobile nav when clicking on a link
        const mobileLinks = document.querySelectorAll('.mobile-nav .nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                header.classList.remove('mobile-open');
                body.classList.remove('no-scroll');
            });
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .footer-links a, .btn');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Scroll effect for header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Hero Slider
    const slides = document.querySelectorAll('.hero-slider .slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Initialize hero slider
    if (slides.length > 0 && dots.length > 0) {
        // Set up auto-slide
        slideInterval = setInterval(nextSlide, 5000);

        // Arrow controls
        if (prevArrow && nextArrow) {
            prevArrow.addEventListener('click', function() {
                clearInterval(slideInterval);
                prevSlide();
                slideInterval = setInterval(nextSlide, 5000);
            });

            nextArrow.addEventListener('click', function() {
                clearInterval(slideInterval);
                nextSlide();
                slideInterval = setInterval(nextSlide, 5000);
            });
        }

        // Dot controls
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                clearInterval(slideInterval);
                showSlide(index);
                slideInterval = setInterval(nextSlide, 5000);
            });
        });
    }

    // Product Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabBtns.length > 0 && tabContents.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const target = this.dataset.tab;
                
                tabBtns.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.style.display = 'none');
                
                this.classList.add('active');
                document.getElementById(target).style.display = 'block';
            });
        });
    }

    // Featured Products Slider
    const featuredSlides = document.querySelectorAll('.featured-slide');
    const featuredDots = document.querySelectorAll('.featured-dot');
    const prevFeatured = document.querySelector('.prev-featured');
    const nextFeatured = document.querySelector('.next-featured');
    let currentFeatured = 0;

    function showFeatured(index) {
        featuredSlides.forEach(slide => slide.classList.remove('active'));
        featuredDots.forEach(dot => dot.classList.remove('active'));
        
        featuredSlides[index].classList.add('active');
        featuredDots[index].classList.add('active');
        currentFeatured = index;
    }

    // Initialize featured slider
    if (featuredSlides.length > 0 && featuredDots.length > 0) {
        // Arrow controls
        if (prevFeatured && nextFeatured) {
            prevFeatured.addEventListener('click', function() {
                currentFeatured = (currentFeatured - 1 + featuredSlides.length) % featuredSlides.length;
                showFeatured(currentFeatured);
            });

            nextFeatured.addEventListener('click', function() {
                currentFeatured = (currentFeatured + 1) % featuredSlides.length;
                showFeatured(currentFeatured);
            });
        }

        // Dot controls
        featuredDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showFeatured(index);
            });
        });
    }

    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    let currentTestimonial = 0;
    let testimonialInterval;

    function showTestimonial(index) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        
        testimonialSlides[index].classList.add('active');
        testimonialDots[index].classList.add('active');
        currentTestimonial = index;
    }

    // Initialize testimonial slider
    if (testimonialSlides.length > 0 && testimonialDots.length > 0) {
        // Set up auto-slide
        testimonialInterval = setInterval(function() {
            currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
            showTestimonial(currentTestimonial);
        }, 4000);

        // Dot controls
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                clearInterval(testimonialInterval);
                showTestimonial(index);
                testimonialInterval = setInterval(function() {
                    currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
                    showTestimonial(currentTestimonial);
                }, 4000);
            });
        });
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });

        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Form submission with FormSubmit & Telegram integration
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Let FormSubmit handle the form submission
            // No need to prevent default as we want the form to actually submit
            
            // Show a temporary notification
            showNotification('success', 'Sending...', 'Your message is being sent to our Telegram.');
        });
    }

    // Form notification function
    function showNotification(type, title, message) {
        // Create notification element if it doesn't exist
        let notification = document.querySelector('.form-notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'form-notification';
            document.body.appendChild(notification);
        }
        
        // Configure notification
        notification.className = `form-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-icon">
                <i class="fas ${type === 'success' ? 'fa-check' : 'fa-exclamation-triangle'}"></i>
            </div>
            <div class="notification-text">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
            <button class="close-notification">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('active');
        }, 10);
        
        // Set up auto-hide
        setTimeout(() => {
            notification.classList.remove('active');
        }, 5000);
        
        // Set up close button
        const closeBtn = notification.querySelector('.close-notification');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                notification.classList.remove('active');
            });
        }
    }
});
