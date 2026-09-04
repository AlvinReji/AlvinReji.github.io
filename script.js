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
        overview: 'ATLAS (Angular Triangulation Location Assistance System) is a Multi-Point SBI Geo-Locator System developed during a BAE Systems intern program to detect and geolocate a stranded warfighter in real time, improving battlefield situational awareness. The system was built across four Integrated Project Teams (IPTs), and I served as Hardware Lead for IPT-D, owning the complete direction-finding hardware from component selection through final field-tested build.',
        highlights: [
            'Directed hardware design and component selection for the Direction Finding subsystem (IPT-D)',
            'Presented hardware design and rationale at customer-facing design reviews (SRR, CDR, TRR, FDR)',
            'Closed 25 of 25 IPT-D requirements with zero failures, 4 of them verified with significant margin',
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
            {
                text: 'Selected every hardware component in the DF system (the 467MHz Yagi and omni antennas, DC motor, magnetometer, ADALM Pluto SDR, wideband LNA, SPDT switch, H-bridge motor driver, step-up converter, and battery) while tracking spend against an allocated budget.',
                images: [
                    { src: 'assets/projects/atlas-3.jpg', caption: 'Direction Finding subsystem block diagram, color-coded by component type (RF, power, processing, mechanical) to keep the four-team IPT structure aligned.' },
                    { src: 'assets/projects/atlas-4.jpg', caption: 'System-level wiring and interface diagram mapping every selected component (Pluto SDR, LNA, SPDT switch, H-bridge, Raspberry Pi, power banks) to its physical, electrical, and data connections.' }
                ]
            },
            {
                text: 'Designed the Rotating Region: a fixture mounting the magnetometer, omni antenna, and directional antenna together on a single spinning assembly, with a TPU press-fit liner and grommet for IP53 sealing and heat-set inserts for the magnetometer.',
                images: [
                    { src: 'assets/projects/atlas-2.jpg', caption: 'Standalone CAD of the directional Yagi antenna used on the rotating assembly.' },
                    { src: 'assets/projects/atlas-6.jpg', caption: 'CAD of the rotating antenna assembly with numbered callouts identifying the magnetometer mount, grommet seal, and heat-set insert locations.' },
                    { src: 'assets/projects/atlas-5.jpg', caption: 'Rendered CAD of the antenna mounted on its IPT-D base housing.' }
                ]
            },
            {
                text: 'Designed the Wire Slack Region: an off-center cylindrical section built around the off-center DC motor that gives coax and sensor cables room to flex, letting the antenna assembly rotate clockwise and counterclockwise without kinking the wires.',
                image: 'assets/projects/atlas-7.jpg',
                caption: 'CAD of the off-center wire slack cylinder that sits below the rotating antenna region, giving coax and sensor leads room to flex through a full rotation.'
            },
            {
                text: 'Designed the Electronics Enclosure: a modular box housing the Pluto/LNA holder, SPDT switch, H-bridge, step-up converter, and battery, with a removable maintenance wall, grommeted cable pass-throughs, and a mounting baseplate for integration onto the UGV.',
                images: [
                    { src: 'assets/projects/atlas-8.jpg', caption: 'Exploded CAD view of the modular electronics enclosure, with lettered and numbered callouts tracing each part back to the component it houses.' },
                    { src: 'assets/projects/atlas-9.jpg', caption: 'Detailed enclosure layout showing the Pluto/LNA holder, SPDT switch, and battery holder placement used to finalize the manufacturing drawings.' }
                ]
            },
            {
                text: 'Produced GD&T-compliant CAD models and exploded-view drawings mapping every part back to its governing hardware requirement for full traceability.'
            },
            {
                text: 'Iterated from CAD design through 3D-printed prototypes to the final test-day build, integrating the completed hardware onto both the wearable backpack (IPT-A) and autonomous UGV (IPT-C) platforms.',
                images: [
                    { src: 'assets/projects/atlas-1.jpg', caption: 'The finished, field-tested direction-finding hardware assembly mounted and ready for a live test run.' },
                    { src: 'assets/projects/atlas-10.jpg', caption: 'A second angle of the completed hardware build during field testing.' },
                    { src: 'assets/projects/atlas-12.jpg', caption: 'The team running a live field test, taking bearing measurements with the integrated hardware.' }
                ]
            },
            {
                text: 'Presented the hardware design and design rationale at customer-facing design reviews, including the Final Design Review (FDR).',
                image: 'assets/projects/atlas-11.jpg',
                caption: 'Presenting the completed IPT-D hardware alongside a teammate at a customer-facing design review.'
            }
        ],
        results: [
            'Delivered a fully integrated, field-tested direction-finding hardware assembly that operated successfully on test day',
            'Met every hardware-driven requirement I was responsible for: sub-10-pound weight, shock/vibration/thermal resistance, IP53 sealing, direction-finding performance, and transmission to the base station within the required time window',
            'IPT-D closed out with 25 of 25 requirements verified, 4 of them with significant margin and zero failures',
            'Hardware supported a working DF capability that located target angles within a 5–10 degree margin of error during live field testing',
            'Successfully integrated the same DF hardware design across two different platforms (wearable and UGV) without redesign'
        ],
        skills: ['Mechanical Design & CAD', 'Component Selection & Procurement', 'RF Hardware Integration', 'Environmental Sealing (IP-Rated)', 'Requirements Traceability', 'Customer Design Reviews', 'Cross-IPT Systems Integration']
    },
    'heated-jacket': {
        title: 'Automated Heated Jacket',
        category: 'Biomimicry · Wearable Electronics',
        date: 'Personal Project',
        overview: 'A biomimicry-driven wearable that automatically regulates body heat by mimicking how emperor penguins survive extreme Antarctic cold. Penguins conserve core body heat by concentrating insulation and blood flow around vital organs rather than heating themselves uniformly; this jacket applies the same logic electronically, using an Arduino-controlled network of resistive heating pads and NTC thermistors placed at critical regions of the body to sense temperature and respond automatically, with no manual switches required.',
        highlights: [
            'Translated a biological survival strategy (penguin heat retention) into an electromechanical control system',
            'Closed-loop temperature sensing drives fully automatic, zone-by-zone heating with no manual input',
            'Independent heating zones placed at core-priority regions: chest, torso, and arms',
            'Validated pad and wiring placement with a mockup before building a fully sewn, wearable final prototype'
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
            { text: 'Researched emperor penguin thermoregulation biology and identified that they prioritize core heat retention over extremities, informing where heating should be concentrated on the body.' },
            { text: 'Selected the core system architecture: an Arduino microcontroller as the central controller, resistive heating pads as actuators, NTC thermistors as temperature sensors, relay modules to safely switch each 12V heating circuit, and a 12V battery pack as the power source.' },
            {
                text: 'Built a cardboard mockup directly on a jacket to plan component layout before committing to any permanent wiring, taping cardboard stand-ins for each heating pad and the microcontroller in place and routing tape "traces" to map out wire paths across the chest, torso, and arms.',
                image: 'assets/projects/jacket-2.jpg',
                caption: 'Cardboard mockup used to plan heating pad and microcontroller placement and wire routing (taped-on cardboard labeled "Heating pad" and "µController") before any wiring was permanently installed.'
            },
            { text: 'Wrote embedded control software that continuously reads each thermistor and independently toggles its corresponding relay to keep every zone within a target temperature range.' },
            {
                text: 'Built and wired the final prototype using the mockup as a guide: heating pads, thermistors, and relay wiring were sewn directly into the jacket along the planned channels, then covered with an outer layer of fabric so the electronics stayed hidden and comfortable to wear.',
                image: 'assets/projects/jacket-1.jpg',
                caption: 'The final wearable prototype, with heating pads, thermistors, and relay wiring sewn into the jacket and stitched over with fabric for a clean, comfortable finish.'
            },
            { text: 'Iteratively tuned the closed-loop control logic to avoid both under-heating and overheating across all zones.' }
        ],
        results: [
            'Built a working wearable prototype with multiple independently-controlled heating zones, sewn and finished for everyday wear',
            'Achieved fully automated, sensor-driven heating with no manual switches, mirroring the passive nature of biological thermoregulation',
            'Validated closed-loop temperature control across distinct zones on a single garment',
            'Demonstrated a complete biomimicry-to-engineering translation, from biological research to a functional wearable device'
        ],
        skills: ['Embedded Systems Programming', 'Sensor Integration', 'Relay & Power Switching', 'Wearable Electronics Design', 'Biomimicry-Driven Design', 'Rapid Prototyping']
    },
    'cubesat': {
        title: 'CubeSAT Camera Bracket',
        category: 'Aerospace Engineering',
        date: '2024',
        overview: 'Designed a critical camera-mounting bracket for a 1U CubeSAT flying as part of a broader satellite constellation mission, from initial CAD through manufacturing-ready drawings. The bracket was designed and dimensioned to be geometrically compatible with the other satellites in the constellation, but was fabricated and implemented specifically for the satellite I was working on.',
        highlights: [
            'Designed to a shared interface standard so the bracket geometry was compatible across the constellation, while being fabricated and flown on one specific satellite',
            'Iterated through multiple FDM prototypes in PLA and PETG before finalizing dimensions for a precision SLA production part',
            'Validated against launch and orbital conditions via FEA, shock, and vibration testing',
            'Delivered manufacturing-ready, GD&T-compliant drawings for outside fabrication'
        ],
        technologies: ['SolidWorks', 'FEA Analysis', 'GD&T', 'FDM Printing (PLA/PETG)', 'SLA 3D Printing'],
        challenges: [
            'Ensuring structural integrity under launch and orbital conditions',
            'Optimizing design for minimal weight while maintaining strength',
            'Meeting tight dimensional tolerances for optical alignment',
            'Keeping the mounting interface consistent with the constellation\'s shared design standard while tuning the part for this satellite\'s specific camera and internal layout'
        ],
        process: [
            {
                text: 'Created initial CAD models in SolidWorks with a focus on modularity, dimensioning the mounting interface to match the shared standard used across the satellite constellation.',
                image: 'assets/projects/cubesat-2.jpg',
                caption: 'CAD model of the camera bracket, dimensioned to the constellation\'s shared mounting interface while being fabricated specifically for this satellite.'
            },
            { text: 'Ran multiple rounds of FDM prototyping in PLA and PETG to check fit, clearance, and camera alignment on the bench, iterating the geometry between each print.' },
            { text: 'Conducted finite element analysis (FEA) to validate structural integrity under expected launch and orbital loads.' },
            { text: 'Applied GD&T principles for high-tolerance manufacturing specifications, since the bracket had to hold optical alignment precisely.' },
            { text: 'Once the design was finalized, produced higher-precision SLA prototypes for final fit testing ahead of production.' },
            {
                text: 'Prepared manufacturing-ready drawings for final production and confirmed fit against the rest of the satellite structure.',
                image: 'assets/projects/cubesat-3.jpg',
                caption: 'The bracket integrated onto the satellite\'s internal stack alongside the camera board, confirming fit before final assembly.'
            }
        ],
        results: [
            {
                text: 'Successfully designed a bracket approved for manufacturing and integrated into this satellite\'s build.',
                image: 'assets/projects/cubesat-1.jpg',
                caption: 'The completed 1U CubeSAT, with the camera bracket integrated as part of the internal structure.'
            },
            { text: 'Component integrated into the satellite and passed TVAC (thermal vacuum) testing.' },
            { text: 'Conducted shock and vibration testing to simulate launch conditions.' },
            { text: 'Design geometry validated as compatible with the shared mounting standard used elsewhere in the satellite constellation.' }
        ],
        skills: ['CAD Modeling', 'Structural Analysis', 'Rapid Prototyping (FDM/SLA)', 'Manufacturing Design', 'Aerospace Standards']
    },
    'flight-computer': {
        title: 'Avionics Flight Computer',
        category: 'Electronics & Aerospace',
        date: '2024',
        overview: 'Built a custom flight computer for a test rocket from the ground up, covering schematic and PCB design, embedded firmware, and real-time telemetry, and flew it successfully on a live launch. The board fuses a barometric altitude sensor with an LSM6DS3 inertial measurement unit to autonomously detect each phase of flight and logs the full flight profile to onboard microSD storage.',
        highlights: [
            'End-to-end ownership: schematic capture, PCB layout, firmware, and flight testing',
            'Custom state machine used altitude and inertial data to autonomously detect launch, ascent, apogee, and descent in real time',
            'Onboard microSD logging captured the full flight profile for post-flight analysis',
            'Flight-proven aboard an actual rocket launch, not just simulated'
        ],
        technologies: ['KiCad', 'Altium', 'C++', 'Barometric Altitude Sensor', 'LSM6DS3 IMU', 'microSD Logging', 'PCB Design'],
        challenges: [
            'Minimizing electromagnetic interference (EMI) in a compact, densely-routed design',
            'Ensuring reliable sensor readings and connections in a high-vibration, high-acceleration environment',
            'Implementing a robust state machine that could correctly distinguish flight phases from noisy real-world sensor data',
            'Buffering and writing telemetry to microSD fast enough to keep up with high-rate sensor sampling'
        ],
        process: [
            { text: 'Designed circuit schematics optimizing for noise reduction and power efficiency, selecting a barometric altitude sensor for altitude/vertical-velocity data and an LSM6DS3 6-axis IMU for acceleration and angular rate.' },
            {
                text: 'Created the PCB layout in KiCad and Altium with proper EMI shielding, ground-plane management, and thermal considerations to keep sensor readings clean at high sample rates.',
                image: 'assets/projects/avionics-1.jpg',
                caption: 'PCB layout view showing trace routing and the mounting-hole pattern for the flight computer board.'
            },
            {
                text: 'Programmed the flight software in C++ around a state machine architecture, using the barometric altitude sensor to trigger stage transitions (e.g. launch detection on rapid altitude gain, apogee detection on peak altitude) and the IMU to independently confirm freefall/descent once the rocket began falling back down.',
                image: 'assets/projects/avionics-2.jpg',
                caption: 'The assembled, stacked flight computer boards: the physical hardware that runs the state-machine flight software and hosts the altitude sensor, IMU, and microSD logger.'
            },
            { text: 'Fused barometric altitude and LSM6DS3 accelerometer/gyroscope data so the state machine could cross-check phase transitions against two independent sensors, improving detection reliability over relying on either sensor alone.' },
            {
                text: 'Implemented real-time data logging to onboard microSD storage alongside live telemetry output, then validated the complete system (sensors, state machine, and logging) on an actual rocket launch.',
                image: 'assets/projects/avionics-3.jpg',
                caption: 'The rocket in flight during the live launch used to validate the flight computer, its sensor fusion, and its telemetry/logging system.'
            }
        ],
        results: [
            'Flight computer successfully tracked all flight phases (launch, ascent, apogee, descent) during a live test launch',
            'Barometric altitude and IMU sensor fusion allowed accurate, low-latency phase detection throughout flight',
            'microSD logging captured a complete, uninterrupted flight profile for post-flight data review',
            'System demonstrated robust performance under real flight vibration and acceleration conditions'
        ],
        skills: ['Circuit & PCB Design', 'Embedded Programming (C++)', 'Sensor Fusion', 'State Machine Design', 'Signal Processing', 'Avionics Systems']
    },
    'gnc': {
        title: 'Guidance, Navigation & Control Satellite Simulation',
        category: 'Aerospace Engineering',
        date: '2024',
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
            {
                text: 'Implemented an Extended Kalman Filter (MEKF) for attitude estimation and validated its accuracy against a known truth trajectory.',
                image: 'assets/projects/gnc-2.jpg',
                caption: 'Roll/pitch/yaw attitude estimation error over time, with the 3-sigma bounds confirming the filter kept estimation error tightly controlled.'
            },
            { text: 'Integrated sensor fusion combining magnetometer, sun sensor, and gyroscope data to feed the filter, giving the estimator redundant attitude references throughout the orbit.' },
            { text: 'Modeled ADCS actuator hardware (reaction wheels and magnetorquers) and designed custom control algorithms to slew, point, and desaturate the spacecraft using that hardware.' },
            {
                text: 'Built a power-aware control system tracking solar panel efficiency alongside pointing performance.',
                image: 'assets/projects/gnc-3.jpg',
                caption: 'Simulated ground track showing the satellite\'s orbit and the passes during which it would be transmitting to a ground station.'
            },
            {
                text: 'Created mission simulation software in MATLAB/Simulink to run repeated Monte Carlo trials for validation testing.',
                image: 'assets/projects/gnc-1.jpg',
                caption: 'Simulation flowchart showing the Monte Carlo loop: propagate dynamics, read sensors, run the GNC algorithms, and log results each pass.'
            }
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
        overview: 'Engineered a wearable IoT telemetry collar that streams live motion data from a horse mid-race, pairing embedded sensor fusion with a custom analytics dashboard for real-time visualization.',
        highlights: [
            'Fully wireless, wearable collar built for a real high-motion race environment',
            'Dual ADXL345 accelerometers on an I2C bus fed a Kalman filter for reliable motion estimates',
            'Live position, velocity, and acceleration streamed over WiFi in real time',
            'Custom Python GUI built from scratch for live data visualization'
        ],
        technologies: ['ESP32', 'ADXL345 Accelerometers', 'I2C', 'Python', 'Kalman Filter', 'SolidWorks', 'FDM 3D Printing', 'WiFi'],
        challenges: [
            'Minimizing sensor noise in a high-motion environment',
            'Ensuring wireless transmission reliability during races',
            'Creating a durable, lightweight, and easily accessible hardware casing'
        ],
        process: [
            {
                text: 'Built the core sensor and logging stack around an ESP32 microcontroller, with dual ADXL345 accelerometers on the I2C bus and an SD module for onboard data backup.',
                image: 'assets/projects/horse-1.jpg',
                caption: 'The core ESP32-based sensor and logging hardware (dual ADXL345 accelerometers, SD module, and battery connections), assembled and bench-tested ahead of being mounted in the collar housing.'
            },
            {
                text: 'Wired the dual ADXL345 accelerometers to the ESP32 over I2C and the SD module over SPI, then implemented Kalman filtering in firmware to reduce sensor noise before transmission.',
                image: 'assets/projects/horse-2.jpg',
                caption: 'Wiring diagram showing the ESP32, the dual ADXL345 accelerometers on the I2C bus, and the SD module used for onboard backup logging.'
            },
            { text: 'Designed a SolidWorks casing combining a belt with a 3D-printed enclosure so the electronics could be mounted on and easily removed from the collar for charging, data offload, and maintenance between races, then manufactured it using FDM 3D printing.' },
            { text: 'Developed a peer-to-peer WiFi communication protocol on the ESP32, which proved effective at streaming live telemetry reliably even in the high-motion, high-vibration race environment.' },
            {
                text: 'Created a Python-based GUI for live data visualization and analysis of position, velocity, and acceleration.',
                image: 'assets/projects/horse-3.jpg',
                caption: 'The custom Python dashboard showing live position, velocity, acceleration, and jump-height readouts during tracking.'
            }
        ],
        results: [
            'Successfully enabled real-time data logging with live streaming from a belt-mounted, 3D-printed collar unit',
            'ESP32 WiFi link proved effective at maintaining reliable live data transmission throughout motion testing',
            'Kalman-filtered dual-accelerometer data delivered accurate motion tracking of position, velocity, and acceleration',
            'Presented project to a panel and received recognition for innovation'
        ],
        skills: ['IoT Systems', 'Embedded Sensor Integration (I2C/SPI)', 'Signal Processing (Kalman Filtering)', 'GUI Development']
    },
    'nasa-techrise': {
        title: 'NASA TechRise High Altitude Balloon',
        category: 'Aerospace & Research',
        date: '2022',
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
            { text: 'Designed the payload housing using OnShape and AutoCAD, planning for both structural rigidity and weatherproofing.' },
            { text: 'Built a bill of materials (BOM) and selected weather-resistant materials able to survive the temperature and pressure swings of a high-altitude flight.' },
            { text: 'Manufactured wooden frames using a laser cutter and CNC router, then soldered the sensor package and Arduino controller connections onto the frame.',
                image: 'assets/projects/techrise-1.jpg',
                caption: 'Soldering the sensor package and Arduino controller connections onto the payload frame ahead of final assembly.'
            },
            {
                text: 'Integrated sensors for ozone, CO2, nitrogen, and humidity into the payload housing, then closed and sealed the enclosure.',
                image: 'assets/projects/techrise-2.jpg',
                caption: 'Interior of the sealed payload housing showing the fully wired sensor and controller stack.'
            },
            { text: 'Assembled and tested the complete system in an environmental chamber to confirm it could handle flight conditions before launch.' }
        ],
        results: [
            { text: 'Successfully captured atmospheric data throughout different layers of the atmosphere during a real high-altitude balloon flight.',
                image: 'assets/projects/techrise-3.jpg',
                caption: 'The high-altitude balloon in flight, carrying the payload through the atmospheric layers being measured.'
            },
            { text: 'Collected valuable data on ozone, carbon emissions, and humidity across the flight profile.' },
            { text: 'Data presented to the scientific community at the NASA TechRise showcase.' },
            { text: 'Payload survived the high-altitude flight and recovery intact.' }
        ],
        skills: ['Environmental Testing', 'Data Collection', 'Manufacturing', 'Scientific Research']
    },
    'materials-research': {
        title: 'Microstructure Adhesive Properties Research',
        category: 'Materials Science',
        date: '2024',
        overview: 'Investigated how microscopic structural order and disorder affect adhesive performance in soft materials, fabricating precision 3D-printed test specimens to push the research forward.',
        highlights: [
            'Explored a previously underexplored variable in soft-material adhesion research',
            'Fabricated 30+ controlled test specimens at micron-level precision',
            'Findings presented to industry professionals at Northeastern\'s RISE conference'
        ],
        technologies: ['DIW 3D Printing', 'FDM 3D Printing', 'PDMS', 'CAD', 'Materials Testing'],
        challenges: [
            'Achieving micron-level precision in 3D printed structures',
            'Controlling order/disorder parameters consistently',
            'Measuring adhesive forces accurately at microscale'
        ],
        process: [
            { text: 'Designed CAD models and molds for PDMS specimen fabrication, defining the pillar geometries used to control structural order and disorder.' },
            {
                text: 'Operated a large-volume 3D printer with both FDM and direct-ink-write (DIW) resin printing capabilities, using DIW to deposit mold material at micron-level precision.',
                image: 'assets/projects/materials-1.jpg',
                caption: 'The DIW 3D printer nozzle depositing material for a test-specimen mold at micron-level precision.'
            },
            {
                text: 'Created foam prints with varying structural properties, fabricating 30+ experimental samples with controlled microstructures.',
                image: 'assets/projects/materials-2.jpg',
                caption: 'A printed mold with an ordered pillar array, one of the controlled microstructure geometries used to test adhesion.'
            },
            {
                text: 'Conducted adhesion testing and data analysis on the resulting PDMS specimens.',
                image: 'assets/projects/materials-3.jpg',
                caption: 'A finished PDMS specimen showing the pillar-array imprint used in the adhesion tests.'
            }
        ],
        results: [
            'Contributed to understanding of structural effects on adhesion',
            'Generated significant dataset for materials research',
            'Presented findings at Northeastern RISE conference',
            'Results inform future soft materials design approaches'
        ],
        skills: ['Materials Science', 'Precision Manufacturing', '3D Printing', 'Research Methods']
    },
    'trash-compactor': {
        title: 'Mini Trash Compactor: Mechanical Design & Stress Analysis',
        category: 'ME 4550 Mechanical Engineering Design · Northeastern University',
        date: '2025 · 6-person team project',
        overview: 'A six-person capstone design project to build a motorized household trash compactor small enough for an apartment, dorm, or office. The design uses a single electric motor driving a chain, which turns two synchronized lead screws to lower a ram and crush waste inside a removable bin, avoiding the bulk and cost of a hydraulic or pneumatic system. I led the fatigue failure analysis for the ram and the T-slot fastener analysis for the frame connections, and contributed to the power transmission (chain and motor) analysis.',
        highlights: [
            'Co-designed a fully mechanized, dual-lead-screw compaction mechanism driven by a single motor and chain',
            'Verified every component and bolted connection with hand calculations cross-checked against Fusion 360 / SolidWorks FEA',
            'Confirmed the frame, lead screws, and ram all meet their static, buckling, and fatigue requirements with room to spare',
            'All four bolted-connection types checked out against static failure, joint separation, and fatigue loading',
            'Sized a 42 W motor and chain drive that comfortably covers the required compaction power, plus a full cost and break-even analysis'
        ],
        technologies: ['Fusion 360', 'SolidWorks & FEA', 'Shigley\'s Mechanical Design Method', 'T-Slot Aluminum Extrusion', 'ACME Power Screws', 'Chain Drive Design', 'GD&T'],
        challenges: [
            'Analyzing four distinct bolted-connection types (flange screws, end-support screws, T-slot fasteners, corner brackets) for static failure, joint separation, and fatigue',
            'Setting up accurate FEA fixtures for bolted connections, an area the team had limited prior experience with, since some early attempts gave unreliable results from improper constraints',
            'Balancing a structurally robust frame against a strict 25 lb portability limit for the finished device',
            'Power-screw thread efficiency of only about 12.5% during lowering, which drove up the required motor power'
        ],
        process: [
            {
                text: 'Brainstormed roughly thirty concepts before settling on a dual-power-screw compaction mechanism inspired by kitchen trash compactors, then sketched the full system: an aluminum T-slot frame, a motor-and-chain drive, two lead screws, a ram, a slot for the basket, and a limit-switch/lid interlock for safety.',
                image: 'assets/projects/compactor-1-sketch.jpg',
                caption: 'Initial concept sketch mapping out the frame, drive motor, chain layout, ram, basket, and safety interlock before any CAD work began.'
            },
            {
                text: 'Converted the sketch into an early 3D CAD model of just the frame, ram, and lead screws to nail down how the ram would ride on and interface with each screw.',
                image: 'assets/projects/compactor-2-cad-concept.jpg',
                caption: 'First color-coded CAD pass on the frame (green), ram (pink), and lead screws (orange), used to check part interfaces before adding the drive system.'
            },
            {
                text: 'Cleaned up the frame and ram geometry in a second CAD pass, still without the motor or housing, so the load path through the structure was clear before adding anything else.',
                image: 'assets/projects/compactor-3-cad-frame.jpg',
                caption: 'Refined CAD of the frame, ram, and lead screws with the final aluminum T-slot proportions, ready for the drive system to be added on top.'
            },
            {
                text: 'Added the chain-and-motor assembly to the top of the frame, with a single motor sprocket driving matched sprockets on each lead screw so both screws, and both sides of the ram, move in sync.',
                image: 'assets/projects/compactor-4-cad-motor.jpg',
                caption: 'Completed CAD assembly with the drive motor, sprockets, and chain added on top of the frame to synchronize both lead screws.'
            },
            {
                text: 'Modeled the frame\'s top beam as a beam in bending under the two 100 N lead-screw reaction loads (half of the 200 N design compaction force each), then confirmed the hand-calculated 16.9 MPa peak stress against an FEA run in Fusion 360.',
                image: 'assets/projects/compactor-5-fea-frame.jpg',
                caption: 'FEA of the top frame beam under the two lead-screw reaction loads, showing a peak von Mises stress of 13.7 MPa against a 275 MPa yield strength for the 6061 aluminum frame.'
            },
            {
                text: 'Treated each lead screw as a slender column under its 100 N compaction reaction and ran an Euler buckling check, since the screw\'s length-to-diameter ratio put it well outside the transition to short-column behavior.',
                image: 'assets/projects/compactor-6-fea-screw.jpg',
                caption: 'FEA safety-factor plot for a lead screw modeled as a column under Euler buckling, confirming the critical buckling load stayed well above the 100 N operating load per screw.'
            },
            {
                text: 'Led the fatigue analysis on the stainless-steel ram, which cycles from zero stress to its peak compaction stress on every use, a zero-to-max loading pattern that makes fatigue, not just static strength, the governing failure mode.',
                image: 'assets/projects/compactor-7-fea-ram.jpg',
                caption: 'FEA von Mises stress on the ram at peak compaction load (15.1 MPa). Because the ram cycles from 0 to this peak on every compaction, this fed into a fatigue calculation showing the ram stays within the infinite-life region for the 5,000-cycle, 5-year design life.'
            },
            {
                text: 'Identified and analyzed the four bolted connections most critical to the design\'s safety: the flange screws coupling the ram to each lead screw, the lead-screw end-support fasteners, the T-slot fasteners anchoring the screw supports to the frame, and the corner brackets holding the frame itself together. I ran the T-slot fastener analysis for static failure, separation, and fatigue.',
                image: 'assets/projects/compactor-8-connections.jpg',
                caption: 'The four critical bolted-connection locations (highlighted in red): the flange-to-ram screws, the lead-screw end-support screws, the T-slot fasteners, and the corner-bracket fasteners.'
            },
            {
                text: 'Sized the ANSI 25 roller chain and matched 17-tooth sprockets that transmit torque from the single motor to both lead screws in sync, then verified the chain\'s power rating against the combined torque load from both screws.',
                image: 'assets/projects/compactor-9-chain.jpg',
                caption: 'Close-up of the sprocket-and-chain layout: a center sprocket driven by the motor turns two outer sprockets, one on each lead screw, keeping both screws synchronized.'
            },
            {
                text: 'Worked with a teammate to size the ACME-threaded power screws themselves, calculating the torque needed to raise and lower the ram, thread efficiency, and the resulting motor power requirement.',
                image: 'assets/projects/compactor-10-powerscrew.jpg',
                caption: 'One of the two 12 mm-diameter, 3 mm-pitch ACME lead screws that convert the chain drive\'s rotation into the ram\'s linear compaction motion.'
            },
            {
                text: 'Tabulated a full bill of materials and per-unit cost, sourcing most fasteners and extrusion from McMaster-Carr (at an assumed 67% of list price) but switching the motor and lead-screw end supports to lower-cost equivalents after McMaster pricing came in high.',
                image: 'assets/projects/compactor-11-cost.jpg',
                caption: 'Full bill of materials and cost breakdown, totaling $334.06 in parts per unit, used later to estimate break-even production volume and unit pricing.'
            }
        ],
        results: [
            'Confirmed the frame\'s top beam and vertical members both stay well within the 6061 aluminum\'s yield strength under the full 200 N compaction load',
            'Verified the lead screws against Euler buckling, with the critical buckling load comfortably clearing the per-screw operating load',
            'Verified the ram\'s fatigue life under a zero-to-max loading cycle, keeping it inside the infinite-life region for the 5,000-cycle-per-year, 5-year design target',
            'Checked all four bolted-connection types (flange, end-support, T-slot, corner bracket) against static failure, joint separation, and fatigue, with every connection meeting the requirement',
            'Sized a 42 W motor and ANSI 25 chain drive with power capacity above the required design load, confirming the drivetrain could deliver the required 200 N compaction force',
            'Built a full per-unit cost ($334.06), break-even, and profitability model for a hypothetical production run, in addition to the engineering analysis'
        ],
        skills: ['Mechanical Design & CAD', 'FEA & Hand-Verified Stress Analysis', 'Fastener & Bolted-Joint Design', 'Fatigue & Buckling Analysis', 'Power Screw & Chain Drive Sizing', 'Engineering Cost Estimation', 'Technical Report Writing']
    }
};

// Renders a figure (image + caption) for a single step/result item.
function renderStepFigure(item) {
    const shots = item.images || (item.image ? [{ src: item.image, caption: item.caption }] : []);
    if (!shots.length) return '';
    return shots.map((shot, i) => `
        <figure class="step-figure">
            <img src="${shot.src}" alt="${shot.caption || ''}" loading="lazy" onclick="openLightbox('${shot.src}')">
            ${shot.caption ? `<figcaption>${shot.caption}</figcaption>` : ''}
        </figure>
    `).join('');
}

// Renders an ordered list of process steps, each optionally carrying inline image(s).
function renderProcessSteps(steps) {
    return `<ol class="process-steps">
        ${steps.map(step => {
            const text = typeof step === 'string' ? step : step.text;
            return `<li class="process-step">
                <p class="process-step-text">${text}</p>
                ${typeof step === 'object' ? renderStepFigure(step) : ''}
            </li>`;
        }).join('')}
    </ol>`;
}

// Renders a checkmark list (challenges/results), each optionally carrying an inline image.
function renderModalList(items) {
    return `<ul class="modal-list">
        ${items.map(item => {
            const text = typeof item === 'string' ? item : item.text;
            return `<li>
                ${text}
                ${typeof item === 'object' ? renderStepFigure(item) : ''}
            </li>`;
        }).join('')}
    </ul>`;
}

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
            ${renderModalList(project.challenges)}
        </div>
        
        <div class="modal-section">
            <h3>Process & Methodology</h3>
            ${renderProcessSteps(project.process)}
        </div>
        
        <div class="modal-section">
            <h3>Results & Impact</h3>
            ${renderModalList(project.results)}
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
