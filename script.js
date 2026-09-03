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
    'atlas': {
        title: 'ATLAS – Direction Finding System (IPT-D)',
        category: 'BAE Systems Intern Program · Defense Systems',
        date: '2026',
        images: [
            { src: 'assets/projects/atlas-1.jpg', fit: 'cover' },
            { src: 'assets/projects/atlas-10.jpg', fit: 'cover' },
            { src: 'assets/projects/atlas-2.jpg', fit: 'contain' },
            { src: 'assets/projects/atlas-5.jpg', fit: 'contain' },
            { src: 'assets/projects/atlas-6.jpg', fit: 'contain' },
            { src: 'assets/projects/atlas-7.jpg', fit: 'contain' },
            { src: 'assets/projects/atlas-8.jpg', fit: 'contain' },
            { src: 'assets/projects/atlas-9.jpg', fit: 'contain' },
            { src: 'assets/projects/atlas-3.jpg', fit: 'contain' },
            { src: 'assets/projects/atlas-4.jpg', fit: 'contain' },
            { src: 'assets/projects/atlas-11.jpg', fit: 'cover' },
            { src: 'assets/projects/atlas-12.jpg', fit: 'cover' }
        ],
        overview: 'ATLAS (Angular Triangulation Location Assistance System) is a Multi-Point SBI Geo-Locator System developed during a BAE Systems intern program to detect and geolocate a stranded warfighter in real time, improving battlefield situational awareness. The system was built across four Integrated Project Teams (IPTs), and I served as Hardware Lead for IPT-D — owning the complete direction-finding hardware, from component selection through final field-tested build.',
        highlights: [
            'Directed hardware design and component selection for the Direction Finding subsystem (IPT-D)',
            'Presented hardware design and rationale at customer-facing design reviews (SRR, CDR, TRR, FDR)',
            'Closed 25 of 25 IPT-D requirements with zero failures — 4 verified with significant margin',
            'Integrated one hardware design across two independent platforms: a wearable unit and an autonomous UGV'
        ],
        technologies: ['SolidWorks', 'GD&T', 'RF Hardware Integration', 'TPU/PLA 3D Printing', 'Component Selection', 'IP-Rated Enclosure Design', 'Requirements Traceability'],
        challenges: [
            'Fitting a motor, dual antennas, and a full electronics stack into a housing under the 10-pound weight limit',
            'Sealing a rotating mechanical assembly to an IP53 (dust/water) rating without compromising smooth rotation',
            'Preventing wire tangling as the antenna assembly spins, since coax and sensor leads had to cross the rotating joint',
            'Routing RF cabling and shielding sensitive components within a compact, shared enclosure without introducing interference',
            'Meeting shock, vibration, and thermal resistance requirements while keeping the design lightweight and field-serviceable'
        ],
        process: [
            'Selected every hardware component in the DF system — the 467MHz Yagi and omni antennas, DC motor, magnetometer, ADALM Pluto SDR, wideband LNA, SPDT switch, H-bridge motor driver, step-up converter, and battery — while tracking spend against an allocated budget',
            'Designed the Rotating Region: a fixture mounting the magnetometer, omni antenna, and directional antenna together on a single spinning assembly, with a TPU press-fit liner and grommet for IP53 sealing and heat-set inserts for the magnetometer',
            'Designed the Wire Slack Region: an off-center cylindrical section built around the off-center DC motor that gives coax and sensor cables room to flex, letting the antenna assembly rotate clockwise and counterclockwise without kinking the wires',
            'Designed the Electronics Enclosure: a modular box housing the Pluto/LNA holder, SPDT switch, H-bridge, step-up converter, and battery, with a removable maintenance wall, grommeted cable pass-throughs, and a mounting baseplate for integration onto the UGV',
            'Produced GD&T-compliant CAD models and exploded-view drawings mapping every part back to its governing hardware requirement for full traceability',
            'Iterated from CAD design through 3D-printed prototypes to the final test-day build, integrating the completed hardware onto both the wearable backpack (IPT-A) and autonomous UGV (IPT-C) platforms',
            'Presented the hardware design and design rationale at customer-facing design reviews, including the Final Design Review (FDR)'
        ],
        results: [
            'Delivered a fully integrated, field-tested direction-finding hardware assembly that operated successfully on test day',
            'Met every hardware-driven requirement I was responsible for: sub-10-pound weight, shock/vibration/thermal resistance, IP53 sealing, direction-finding performance, and transmission to the base station within the required time window',
            'IPT-D closed out with 25 of 25 requirements verified — 4 with significant margin and zero failures',
            'Hardware supported a working DF capability that located target angles within a 5–10 degree margin of error during live field testing',
            'Successfully integrated the same DF hardware design across two different platforms (wearable and UGV) without redesign'
        ],
        skills: ['Mechanical Design & CAD', 'Component Selection & Procurement', 'RF Hardware Integration', 'Environmental Sealing (IP-Rated)', 'Requirements Traceability', 'Customer Design Reviews', 'Cross-IPT Systems Integration']
    },
    'heated-jacket': {
        title: 'Automated Heated Jacket',
        category: 'Biomimicry · Wearable Electronics',
        date: 'Personal Project',
        images: [
            'assets/projects/jacket-2.jpg',
            'assets/projects/jacket-1.jpg'
        ],
        overview: 'A biomimicry-driven wearable that automatically regulates body heat by mimicking how emperor penguins survive extreme Antarctic cold. Penguins conserve core body heat by concentrating insulation and blood flow around vital organs rather than heating themselves uniformly; this jacket applies the same logic electronically, using an Arduino-controlled network of heating pads and thermistors placed at critical regions of the body to sense temperature and respond automatically, with no manual switches required.',
        highlights: [
            'Translated a biological survival strategy (penguin heat retention) into an electromechanical control system',
            'Closed-loop temperature sensing drives fully automatic, zone-by-zone heating with no manual input',
            'Independent heating zones placed at core-priority regions: chest, torso, and arms',
            'Built and iterated across two physical prototypes, from breadboard wiring to a wearable final build'
        ],
        technologies: ['Arduino', 'Thermistors (NTC)', 'Relay Modules', 'Resistive Heating Pads', '12V Power Systems', 'Embedded C++'],
        challenges: [
            'Identifying which body regions most needed active heating to mirror a penguin\'s core-priority heat retention',
            'Safely switching 12V heating loads from low-voltage Arduino logic without damaging the microcontroller',
            'Routing bulky wiring and heating elements through the garment without restricting mobility or comfort',
            'Preventing overheating through reliable closed-loop feedback between thermistors and heating zones',
            'Keeping the electronics assembly compact and low-profile within a wearable garment form factor'
        ],
        process: [
            'Researched emperor penguin thermoregulation biology and identified that they prioritize core heat retention over extremities, informing where heating should be concentrated on the body',
            'Selected the core system architecture: an Arduino microcontroller as the central controller, resistive heating pads as actuators, NTC thermistors as temperature sensors, relay modules to safely switch each 12V heating circuit, and a 12V battery pack as the power source',
            'Built a first-generation prototype directly wired into a fleece jacket to validate thermistor readings and relay switching logic before finalizing pad placement',
            'Wrote embedded control software that continuously reads each thermistor and independently toggles its corresponding relay to keep every zone within a target temperature range',
            'Sewed heating pads, thermistors, and their wiring into fixed channels along the chest, torso, and arms to prevent shifting during movement while keeping wiring flexible',
            'Built a second, cleanly labeled prototype mapping each heating pad and thermistor to its controller and relay, making the wiring easier to test, debug, and demonstrate',
            'Iteratively tuned the closed-loop control logic to avoid both under-heating and overheating across all zones'
        ],
        results: [
            'Built a working wearable prototype with multiple independently-controlled heating zones',
            'Achieved fully automated, sensor-driven heating with no manual switches — mirroring the passive nature of biological thermoregulation',
            'Validated closed-loop temperature control across distinct zones on a single garment',
            'Demonstrated a complete biomimicry-to-engineering translation, from biological research to a functional wearable device'
        ],
        skills: ['Embedded Systems Programming', 'Sensor Integration', 'Relay & Power Switching', 'Wearable Electronics Design', 'Biomimicry-Driven Design', 'Rapid Prototyping']
    },
    'cubesat': {
        title: 'CubeSAT Camera Bracket',
        category: 'Aerospace Engineering',
        date: '2024',
        images: ['assets/projects/cubesat-1.jpg', 'assets/projects/cubesat-2.jpg', 'assets/projects/cubesat-3.jpg'],
        overview: 'Designed a critical camera bracket for a 1U CubeSAT engineered for reuse across every satellite in a broader constellation mission, from initial CAD through manufacturing-ready drawings.',
        highlights: [
            'Designed for reuse across an entire satellite constellation, not a single unit',
            'Validated against launch and orbital conditions via FEA, shock, and vibration testing',
            'Delivered manufacturing-ready, GD&T-compliant drawings for outside fabrication'
        ],
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
        images: ['assets/projects/avionics-1.jpg', 'assets/projects/avionics-2.jpg', 'assets/projects/avionics-3.jpg'],
        overview: 'Built a custom flight computer for a test rocket from the ground up — PCB design, embedded firmware, and real-time telemetry — and flew it successfully on a live launch.',
        highlights: [
            'End-to-end ownership: circuit design, PCB layout, firmware, and flight testing',
            'Custom state machine accurately tracked launch, ascent, apogee, and descent in real time',
            'Flight-proven aboard an actual rocket launch, not just simulated'
        ],
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
        images: ['assets/projects/gnc-1.jpg', 'assets/projects/gnc-2.jpg', 'assets/projects/gnc-3.jpg'],
        overview: 'Developed and validated a full attitude determination and control simulation for a nanosatellite mission in MATLAB/Simulink, from sensor fusion through mission-scale reliability testing.',
        highlights: [
            'Extended Kalman Filter achieved robust attitude estimation from noisy sensor data',
            'Validated across 40+ randomized Monte Carlo simulation runs',
            'Modeled full mission power budget alongside pointing accuracy for realistic performance'
        ],
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
        images: ['assets/projects/horse-1.jpg', 'assets/projects/horse-2.jpg', 'assets/projects/horse-3.jpg'],
        overview: 'Engineered a wearable IoT telemetry collar that streams live motion data from a horse mid-race, pairing embedded sensor fusion with a custom analytics dashboard for real-time visualization.',
        highlights: [
            'Fully wireless, wearable design built for a real high-motion environment',
            'Live position, velocity, and acceleration streamed over WiFi in real time',
            'Custom Python GUI built from scratch for live data visualization'
        ],
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
        images: ['assets/projects/techrise-1.jpg', 'assets/projects/techrise-2.jpg', 'assets/projects/techrise-3.jpg'],
        overview: 'Selected for NASA\'s national TechRise Student Challenge, this atmospheric research payload captured greenhouse gas data across multiple layers of the atmosphere during a real high-altitude balloon flight.',
        highlights: [
            'One of a select group of payloads chosen for NASA\'s national TechRise program',
            'Captured ozone, CO2, nitrogen, and humidity data across distinct atmospheric layers',
            'Engineered to survive extreme temperature and pressure swings at altitude'
        ],
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
        images: ['assets/projects/materials-1.jpg', 'assets/projects/materials-2.jpg', 'assets/projects/materials-3.jpg'],
        overview: 'Investigated how microscopic structural order and disorder affect adhesive performance in soft materials, fabricating precision 3D-printed test specimens to push the research forward.',
        highlights: [
            'Explored a previously underexplored variable in soft-material adhesion research',
            'Fabricated 30+ controlled test specimens at micron-level precision',
            'Findings presented to industry professionals at Northeastern\'s RISE conference'
        ],
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
    
    carouselIndex = 0;
    carouselTotal = project.images.length;
    
    modalBody.innerHTML = `
        <div class="modal-header">
            <span class="modal-category">${project.category}</span>
            <h2 class="modal-title">${project.title}</h2>
            <span class="modal-date">${project.date}</span>
        </div>
        
        <div class="modal-section">
            <h3>Project Overview</h3>
            <p>${project.overview}</p>
            ${project.highlights ? `
            <div class="modal-highlights">
                <span class="modal-highlights-label">At a Glance</span>
                <ul>
                    ${project.highlights.map(h => `<li>${h}</li>`).join('')}
                </ul>
            </div>` : ''}
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

        <div class="modal-section">
            <h3>Project Gallery</h3>
            <div class="carousel" id="projectCarousel">
                <div class="carousel-track" id="carouselTrack">
                    ${project.images.map((img, i) => {
                        const src = typeof img === 'string' ? img : img.src;
                        const fitClass = (typeof img === 'object' && img.fit === 'contain') ? ' carousel-slide-contain' : '';
                        return `<div class="carousel-slide${fitClass}"><img src="${src}" alt="${project.title} photo ${i + 1}" loading="lazy" onclick="openLightbox('${src}')"></div>`;
                    }).join('')}
                </div>
                ${project.images.length > 1 ? `
                <button class="carousel-btn carousel-prev" onclick="moveCarousel(-1)" aria-label="Previous photo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"></path></svg>
                </button>
                <button class="carousel-btn carousel-next" onclick="moveCarousel(1)" aria-label="Next photo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"></path></svg>
                </button>
                <div class="carousel-dots" id="carouselDots">
                    ${project.images.map((_, i) => `<span class="carousel-dot ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i})"></span>`).join('')}
                </div>
                ` : ''}
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

let carouselIndex = 0;
let carouselTotal = 0;

function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    if (!track) return;
    track.style.transform = `translateX(-${carouselIndex * 100}%)`;
    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === carouselIndex);
    });
}

function moveCarousel(delta) {
    carouselIndex = (carouselIndex + delta + carouselTotal) % carouselTotal;
    updateCarousel();
}

function goToSlide(i) {
    carouselIndex = i;
    updateCarousel();
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

// ===================================
// IMAGE LIGHTBOX
// ===================================

function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    lightboxImg.src = src;
    lightbox.classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') {
        closeLightbox();
    }
});

// Close modal / lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
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
