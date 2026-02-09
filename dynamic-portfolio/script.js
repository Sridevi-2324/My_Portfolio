// Project Data
const projects = [
    {
        title: "Employee Attrition Analysis",
        description: "Analyzed employee attrition data to identify key factors contributing to employee turnover and developed a predictive model to identify at-risk employees.",
        tags: ["Python", "Machine Learning", "Data Visualization"],
        github: "https://github.com/Sridevi-2324/Databricks_Projects",
        image: "employee-attrition.jpg"
    },
    {
        title: "Olympics Data Analysis with Azure",
        description: "Analyzed Olympics data to identify key trends and patterns and developed a predictive model to identify at-risk athletes.",
        tags: ["Python", "SQL", "Azure", "Data Visualization"],
        github: "https://github.com/Sridevi-2324/AzureProjects",
        image: "Olympics_Workflow.png"
    },
    {
        title: "SQL Analyzer using Agentic AI - QueryLens",
        description: "Developed an AI-powered SQL query analyzer that helps identify SQL Keywords and Functions in SQL queries and provides F1 Score.",
        tags: ["Python", "SQL", "Agentic AI", "Streamlit"],
        github: "https://github.com/Sridevi-2324/SQL-Analyzer",
        image: "SQL_analyzer.png"
    }
];

// Certifications Data
const certifications = [
    {
        title: "Databricks Certified Data Engineer Associate",
        issuer: "Databricks",
        date: "2025",
        link: "https://credentials.databricks.com/21cfab2f-f1bc-4d98-9d6d-147e3628abc3#acc.ir2gWDPt",
        image: "dbx-cert.png"
    }
];

// Render Projects & Certifications
const projectsContainer = document.getElementById('projects-container');
const certificationsContainer = document.getElementById('certifications-container');

function renderContent() {
    console.log("Rendering projects and certifications.");
    // Projects
    if (!projectsContainer) {
        console.error("Projects container not found!");
    } else {
        projectsContainer.innerHTML = projects.map(project => `
            <div class="project-card fade-in">
                <div class="project-img">
                    <!-- Use actual img tag if URL is valid, or keep CSS background -->
                    <img src="${project.image}" alt="${project.title}" style="width:100%; height:100%; object-fit:cover; opacity:0.8;" onerror="this.style.display='none'; console.error('Image failed to load:', '${project.image}')">
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="project-links" style="margin-top: 1rem;">
                        <a href="${project.github}" title="GitHub"><i class="fab fa-github"></i></a>
                    </div>
                </div>
            </div>
        `).join('');
    }


    // Certifications
    if (certificationsContainer) {
        certificationsContainer.innerHTML = certifications.map(cert => `
            <div class="project-card fade-in" style="display: flex; flex-direction: row; align-items: center; padding: 1rem;">
                <div style="flex-shrink: 0; width: 80px; height: 80px; border-radius: 10px; overflow: hidden; margin-right: 1.5rem;">
                    <img src="${cert.image}" alt="${cert.title}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div class="project-content" style="padding: 0; flex-grow: 1;">
                    <h3 class="project-title" style="font-size: 1.2rem; margin-bottom: 0.2rem;">${cert.title}</h3>
                    <p class="project-description" style="margin-bottom: 0.5rem;">${cert.issuer} • ${cert.date}</p>
                    <a href="${cert.link}" class="btn secondary" style="padding: 0.3rem 1rem; font-size: 0.8rem;">View Credential</a>
                </div>
            </div>
        `).join('');
    } else {
        console.error("Certifications container not found!");
    }
    console.log("Projects and certifications rendered into containers");
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // Initial Render
    renderContent();

    // Observe elements
    const hiddenElements = document.querySelectorAll('.fade-in');
    hiddenElements.forEach(el => observer.observe(el));

    // Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Form Handle
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thanks for reaching out! (This is a demo action)');
        form.reset();
    });

    // Particle Interaction (Neurons Effect)
    initParticles();
    animateParticles();
});

// Particle Network Animation
const canvas = document.getElementById('neuro-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

// Handle Resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Mouse Interaction
const mouse = {
    x: null,
    y: null,
    radius: 150
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Particle Class
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    // Method to draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    // Check particle position, check mouse position, move the particle, draw the particle
    update() {
        // Check if particle is still within canvas
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // Check collision detection - mouse position / particle position
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }
        }

        // Move particle
        this.x += this.directionX;
        this.y += this.directionY;

        // Draw particle
        this.draw();
    }
}

// Create particle array
function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;

    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        let color = '#38bdf8'; // Primary color

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// Animation Loop
function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

// Check if particles are close enough to draw line between them
function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = 'rgba(56, 189, 248,' + opacityValue + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Start Animation inside initParticles or DOMContentLoaded
