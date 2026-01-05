// ===================================
// NAVIGATION
// ===================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
    
    // Navbar shadow on scroll
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
});

// ===================================
// SCROLL ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
});

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach(el => {
    observer.observe(el);
});

// Observe experience cards
document.querySelectorAll('.experience-card').forEach(el => {
    observer.observe(el);
});

// Observe project cards
document.querySelectorAll('.project-card').forEach(el => {
    observer.observe(el);
});

// Observe contact items
document.querySelectorAll('.contact-item, .contact-form').forEach(el => {
    observer.observe(el);
});

// ===================================
// PROJECT FILTERING
// ===================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter projects
        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category');
            
            if (filter === 'all' || categories.includes(filter)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.classList.add('visible');
                }, 10);
            } else {
                card.classList.remove('visible');
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===================================
// PROJECT MODALS
// ===================================
const projectData = {
    'cubesat': {
        title: 'CubeSAT Camera Bracket',
        category: 'Aerospace Engineering',
        date: '2024',
        overview: 'Designed a critical camera bracket for a 1U CubeSAT that would be used across multiple satellites in a constellation mission.',
        technologies: ['SolidWorks', 'FEA Analysis', 'GD&T', 'SLA 3D Printing', 'FDM Printing'],
        challenges: [
            'Ensuring structural integrity under launch and orbital conditions',
            'Optimizing design for minimal weight while maintaining strength',
            'Meeting tight dimensional tolerances for optical alignment'
        ],
        process: [
            'Created initial CAD models using SolidWorks with focus on modularity',
            'Conducted finite element analysis (FEA) to validate structural integrity',
            'Applied GD&T principles for high-tolerance manufacturing specifications',
            'Produced functional prototypes using SLA 3D printing for fit testing',
            'Prepared manufacturing-ready drawings for final production'
        ],
        results: [
            'Successfully designed bracket approved for manufacturing',
            'Component integrated into satellite and passed TVAC testing',
            'Conducted shock and vibration testing to simulate launch conditions',
            'Design validated for use across entire satellite constellation'
        ],
        skills: ['CAD Modeling', 'Structural Analysis', 'Manufacturing Design', 'Aerospace Standards']
    },
    'flight-computer': {
        title: 'Avionics Flight Computer',
        category: 'Electronics & Aerospace',
        date: '2024',
        overview: 'Developed a complete flight computer system for a test rocket, including PCB design, firmware development, and real-time data acquisition.',
        technologies: ['KiCad', 'Altium', 'C++', 'Microcontrollers', 'PCB Design'],
        challenges: [
            'Minimizing electromagnetic interference (EMI) in compact design',
            'Ensuring reliable operation in high-vibration environment',
            'Implementing robust state machine for flight phase detection'
        ],
        process: [
            'Designed circuit diagrams optimizing for noise reduction and power efficiency',
            'Created PCB layout with proper EMI shielding and thermal management',
            'Programmed flight software in C++ with state machine architecture',
            'Implemented sensor fusion for barometric pressure and accelerometer data',
            'Developed real-time data logging and telemetry system'
        ],
        results: [
            'Flight computer successfully tracked all flight phases during test launch',
            'Real-time data acquisition performed flawlessly throughout flight',
            'State machine accurately detected launch, ascent, apogee, and descent',
            'System demonstrated robust performance under flight conditions'
        ],
        skills: ['Circuit Design', 'Embedded Programming', 'Signal Processing', 'Avionics Systems']
    },
    'gnc': {
        title: 'Guidance, Navigation & Control Satellite Simulation',
        category: 'Aerospace Engineering',
        date: '2024',
        overview: 'Developed comprehensive attitude determination and control algorithms for a nanosatellite mission using MATLAB/Simulink.',
        technologies: ['MATLAB', 'Simulink', 'Extended Kalman Filter', 'Control Systems'],
        challenges: [
            'Achieving accurate attitude estimation with noisy sensor data',
            'Balancing pointing accuracy with power consumption',
            'Ensuring robust performance across varying initial conditions'
        ],
        process: [
            'Implemented Extended Kalman Filter (MEKF) for attitude estimation',
            'Integrated sensor fusion combining magnetometer, sun sensor, and gyroscope',
            'Designed control algorithms for reaction wheels and magnetorquers',
            'Built power-aware control system tracking solar panel efficiency',
            'Created mission simulation software for validation testing'
        ],
        results: [
            'Verified pointing accuracy requirements for polarimeter field-of-view',
            'Demonstrated robust control across 40+ Monte Carlo simulation runs',
            'Validated 8+ hour continuous operation with positive power margin',
            'Achieved wheel desaturation capability for extended mission duration'
        ],
        skills: ['Control Theory', 'State Estimation', 'MATLAB Simulation', 'Spacecraft Dynamics']
    },
    'horse-tracking': {
        title: 'Horse Racing Real-Time Tracking Collar',
        category: 'Robotics & Electronics',
        date: '2024',
        overview: 'Designed and built a wearable telemetry system for real-time motion tracking of horses during races.',
        technologies: ['ESP32', 'Python', 'Kalman Filter', 'SolidWorks', '3D Printing', 'WiFi'],
        challenges: [
            'Minimizing sensor noise in high-motion environment',
            'Ensuring wireless transmission reliability during races',
            'Creating durable, lightweight hardware casing'
        ],
        process: [
            'Designed hardware casing using SolidWorks for optimal sensor placement',
            'Manufactured prototypes using FDM 3D printing',
            'Implemented Kalman filtering algorithms to enhance data reliability',
            'Developed P2P WiFi communication protocols for wireless transmission',
            'Created Python-based GUI for live data visualization and analysis'
        ],
        results: [
            'Successfully enabled real-time data logging with live streaming',
            'Achieved reliable wireless transmission with filtered sensor data',
            'Accurate motion tracking with position, velocity, and acceleration',
            'Presented project to panel and received recognition for innovation'
        ],
        skills: ['IoT Systems', 'Sensor Integration', 'Signal Processing', 'GUI Development']
    },
    'nasa-techrise': {
        title: 'NASA TechRise High Altitude Balloon',
        category: 'Aerospace & Research',
        date: '2022',
        overview: 'Created an atmospheric research payload to study greenhouse gas effects throughout different layers of the atmosphere.',
        technologies: ['OnShape', 'AutoCAD', 'Arduino', 'Laser Cutting', 'CNC Machining'],
        challenges: [
            'Designing system to withstand extreme atmospheric conditions',
            'Ensuring sensor accuracy at varying altitudes and pressures',
            'Creating weatherproof housing for electronics'
        ],
        process: [
            'Designed payload housing using OnShape and AutoCAD',
            'Selected weather-resistant materials for extreme conditions',
            'Manufactured wooden frames using laser cutter and CNC router',
            'Integrated sensors for ozone, CO2, nitrogen, and humidity',
            'Assembled and tested complete system in environmental chamber'
        ],
        results: [
            'Successfully captured atmospheric data throughout different layers',
            'Collected valuable data on ozone, carbon emissions, and humidity',
            'Data presented to scientific community at NASA TechRise showcase',
            'Payload survived high-altitude flight and recovery'
        ],
        skills: ['Environmental Testing', 'Data Collection', 'Manufacturing', 'Scientific Research']
    },
    'materials-research': {
        title: 'Microstructure Adhesive Properties Research',
        category: 'Materials Science',
        date: '2024',
        overview: 'Investigated the effects of structural order and disorder on adhesive properties of microstructures using advanced 3D printing.',
        technologies: ['DIW 3D Printing', 'PDMS', 'CAD', 'Materials Testing'],
        challenges: [
            'Achieving micron-level precision in 3D printed structures',
            'Controlling order/disorder parameters consistently',
            'Measuring adhesive forces accurately at microscale'
        ],
        process: [
            'Designed CAD models and molds for PDMS specimen fabrication',
            'Operated large-volume DIW 3D printer with micron-level precision',
            'Created foam prints with varying structural properties',
            'Fabricated 30+ experimental samples with controlled microstructures',
            'Conducted adhesion testing and data analysis'
        ],
        results: [
            'Contributed to understanding of structural effects on adhesion',
            'Generated significant dataset for materials research',
            'Presented findings at Northeastern RISE conference',
            'Results inform future soft materials design approaches'
        ],
        skills: ['Materials Science', 'Precision Manufacturing', '3D Printing', 'Research Methods']
    }
};

function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const project = projectData[projectId];
    
    if (!project) return;
    
    modalBody.innerHTML = `
        <div class="modal-header">
            <span class="modal-category">${project.category}</span>
            <h2 class="modal-title">${project.title}</h2>
            <span class="modal-date">${project.date}</span>
        </div>
        
        <div class="modal-section">
            <h3>Project Overview</h3>
            <p>${project.overview}</p>
        </div>
        
        <div class="modal-section">
            <h3>Technologies Used</h3>
            <div class="modal-tags">
                ${project.technologies.map(tech => `<span class="badge">${tech}</span>`).join('')}
            </div>
        </div>
        
        <div class="modal-section">
            <h3>Key Challenges</h3>
            <ul class="modal-list">
                ${project.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal-section">
            <h3>Process & Methodology</h3>
            <ul class="modal-list">
                ${project.process.map(step => `<li>${step}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal-section">
            <h3>Results & Impact</h3>
            <ul class="modal-list">
                ${project.results.map(result => `<li>${result}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal-section">
            <h3>Skills Demonstrated</h3>
            <div class="modal-tags">
                ${project.skills.map(skill => `<span class="badge">${skill}</span>`).join('')}
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal when clicking outside
document.getElementById('projectModal').addEventListener('click', (e) => {
    if (e.target.id === 'projectModal') {
        closeProjectModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProjectModal();
    }
});

// ===================================
// CONTACT FORM
// ===================================
const contactForm = document.querySelector('.contact-form');
/*
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Here you would typically send the data to a server
    // For now, we'll just show an alert
    alert('Thank you for your message! I\'ll get back to you soon.');
    
    // Reset form
    contactForm.reset();
});
*/
// ===================================
// SMOOTH REVEAL ANIMATIONS
// ===================================
window.addEventListener('load', () => {
    // Trigger animations for elements in viewport on load
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('visible');
        }
    });
});

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Debounce function for performance
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

// Smooth scroll to section (fallback for older browsers)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Log page load for analytics (optional)
console.log('Portfolio loaded successfully! 🚀');
console.log('Built with ❤️ by Alvin Reji');
