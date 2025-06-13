        // Variables globales
        let currentSlide = 0;
        
        // Mobile menu toggle
        document.querySelector('.menu-toggle').addEventListener('click', function() {
            document.querySelector('.nav-links').classList.toggle('active');
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    document.querySelector('.nav-links').classList.remove('active');
                }
            });
        });

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Modal functions
        function openModal(serviceName) {
            const modal = document.getElementById('modal');
            const modalTitle = document.getElementById('modal-title');
            const modalText = document.getElementById('modal-text');
            
            modalTitle.textContent = serviceName;
            modalText.textContent = `¡Gracias por tu interés en ${serviceName}! Nos pondremos en contacto contigo pronto para discutir este servicio en detalle.`;
            
            modal.style.display = 'flex';
            
            // Add event listener to close modal when clicking outside
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal();
                }
            });
        }

        function closeModal() {
            document.getElementById('modal').style.display = 'none';
        }

        // Form submission handler
        function handleSubmit(event) {
            event.preventDefault();
            
            // Get form data
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            console.log('Datos del formulario:', data);
            
            // Show success message
            openModal('Mensaje Enviado');
            document.getElementById('modal-text').textContent = '¡Gracias por contactarnos! Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.';
            
            // Reset form
            event.target.reset();
        }

        // Add some interactive effects
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Dynamic year in footer
        document.addEventListener('DOMContentLoaded', function() {
            const currentYear = new Date().getFullYear();
            const yearElements = document.querySelectorAll('footer p');
            if (yearElements.length > 0) {
                yearElements[0].innerHTML = yearElements[0].innerHTML.replace('2024', currentYear);
            }
        });

        // Add loading animation
        window.addEventListener('load', function() {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });

        // Keyboard navigation for accessibility
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.querySelector('.nav-links').classList.remove('active');
            }
        });

        // Add parallax effect to hero section
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Dynamic service counter animation
        function animateCounters() {
            const counters = document.querySelectorAll('.price');
            counters.forEach(counter => {
                const target = parseInt(counter.textContent.replace(/[^0-9]/g, '')) || 100;
                let current = 0;
                const increment = target / 100;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    if (counter.textContent.includes('$')) {
                        counter.innerHTML = counter.innerHTML.replace(/\d+/, Math.floor(current));
                    }
                }, 20);
            });
        }

        // Trigger counter animation when services section is visible
        const servicesSection = document.querySelector('.services');
        if (servicesSection) {
            observer.observe(servicesSection);
        }