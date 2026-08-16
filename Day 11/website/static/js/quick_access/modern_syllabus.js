// Modern Syllabus JavaScript

// Global state
let currentBranch = null;
let currentSemester = null;
let allSubjects = [];

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    
    // Add animation delays to cards
    const cards = document.querySelectorAll('.branch-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });

    // Initialize any existing data from Django context
    if (typeof syllabusData !== 'undefined') {
        allSubjects = syllabusData;
    }
    
    // Add click event listeners to branch cards as backup
    document.querySelectorAll('.branch-card').forEach(card => {
        const branchId = card.getAttribute('data-branch-id');
        const branchName = branchDisplayNames[branchId];
        
        card.addEventListener('click', function(e) {
            // Only trigger if clicking the card itself, not the button
            if (e.target.closest('button')) return;
            
            console.log('Branch card clicked:', branchName, branchId);
            showSemesterView(branchName, branchId);
        });
    });
    
    // Add click event listeners to semester cards
    document.querySelectorAll('.semester-card').forEach((card, index) => {
        card.addEventListener('click', function() {
            const semester = index + 1;
            console.log('Semester card clicked:', semester);
            showSubjectView(semester);
        });
    });
    
    console.log('Modern syllabus JavaScript loaded successfully');
});

// Branch display names mapping
const branchDisplayNames = {
    'computer': 'Computer Engineering',
    'mechanical': 'Mechanical Engineering', 
    'civil': 'Civil Engineering',
    'electrical': 'Electrical Engineering',
    'electronics': 'Electronics Engineering',
    'information': 'Information Technology'
};

// Get CSRF token for Django requests
function getCSRFToken() {
    const csrfToken = document.querySelector('meta[name="csrf-token"]');
    return csrfToken ? csrfToken.getAttribute('content') : '';
}

// Show branch selection view
function showBranchView() {
    document.getElementById('branch-selection').classList.remove('hidden');
    document.getElementById('semester-selection').classList.add('hidden');
    document.getElementById('subject-listing').classList.add('hidden');
    
    // Update breadcrumb
    document.getElementById('breadcrumb-branch').classList.add('hidden');
    document.getElementById('breadcrumb-semester').classList.add('hidden');
    
    // Reset state
    currentBranch = null;
    currentSemester = null;
    
    // Animate cards
    const cards = document.querySelectorAll('.branch-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
}

// Show semester selection view
function showSemesterView(branchName = null, branchId = null) {
    if (branchName && branchId) {
        currentBranch = {
            name: branchName,
            id: branchId
        };
    }
    
    if (!currentBranch) {
        console.error('No branch selected');
        return;
    }
    
    document.getElementById('branch-selection').classList.add('hidden');
    document.getElementById('semester-selection').classList.remove('hidden');
    document.getElementById('subject-listing').classList.add('hidden');
    
    // Update UI
    document.getElementById('selected-branch-name').textContent = currentBranch.name;
    
    // Update breadcrumb
    document.getElementById('breadcrumb-branch').classList.remove('hidden');
    document.getElementById('breadcrumb-branch-btn').textContent = currentBranch.name;
    document.getElementById('breadcrumb-semester').classList.add('hidden');
    
    // Animate semester cards
    const cards = document.querySelectorAll('.semester-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
}

// Show subject listing view
function showSubjectView(semester) {
    if (!currentBranch) {
        console.error('No branch selected');
        return;
    }
    
    currentSemester = semester;
    
    document.getElementById('branch-selection').classList.add('hidden');
    document.getElementById('semester-selection').classList.add('hidden');
    document.getElementById('subject-listing').classList.remove('hidden');
    
    // Update UI
    const semesterNames = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth'];
    document.getElementById('selected-semester-name').textContent = semesterNames[semester - 1];
    document.getElementById('selected-branch-name-subjects').textContent = currentBranch.name;
    document.getElementById('selected-semester-number').textContent = semester;
    
    // Update breadcrumb
    document.getElementById('breadcrumb-semester').classList.remove('hidden');
    document.getElementById('breadcrumb-semester-text').textContent = `Semester ${semester}`;
    
    // Load subjects for this branch and semester
    loadSubjects(currentBranch.id, semester);
}

// Load subjects from Django backend
async function loadSubjects(branchId, semester) {
    const grid = document.getElementById('subjects-grid');
    const noSubjects = document.getElementById('no-subjects');
    
    // Show loading state
    grid.innerHTML = '<div class="col-span-full text-center py-12"><div class="loading"></div><p class="text-gray-600 mt-4">Loading subjects...</p></div>';
    noSubjects.classList.add('hidden');
    
    try {
        // Map branch IDs to Django model values
        const branchMapping = {
            'computer': 'CO',
            'mechanical': 'ME', 
            'civil': 'CE',
            'electrical': 'EE',
            'electronics': 'EC',
            'information': 'IT'
        };
        
        const response = await fetch(`/api/syllabus/?branch=${branchMapping[branchId]}&semester=${semester}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken()
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.syllabus && data.syllabus.length > 0) {
            displaySubjects(data.syllabus);
        } else {
            showNoSubjects();
        }
    } catch (error) {
        console.error('Error loading subjects:', error);
        
        // Show sample data for demonstration
        const sampleSubjects = getSampleSubjects(branchId, semester);
        if (sampleSubjects.length > 0) {
            displaySubjects(sampleSubjects);
        } else {
            showNoSubjects();
        }
    }
}

// Display subjects in the grid
function displaySubjects(subjects) {
    const grid = document.getElementById('subjects-grid');
    grid.innerHTML = '';
    
    subjects.forEach((subject, index) => {
        const subjectCard = createSubjectCard(subject);
        subjectCard.style.animationDelay = `${index * 0.1}s`;
        subjectCard.classList.add('fade-in');
        grid.appendChild(subjectCard);
    });
    
    // Re-initialize Lucide icons
    lucide.createIcons();
}

// Create a subject card element
function createSubjectCard(subject) {
    const card = document.createElement('div');
    card.className = 'subject-card card-hover p-6';
    
    const hasDocument = subject.document_url || subject.has_document;
    const downloadUrl = subject.document_url || '#';
    
    card.innerHTML = `
        <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
                <div class="subject-code mb-3">${subject.subject_code || 'N/A'}</div>
                <h3 class="text-lg font-bold text-gray-900 mb-2 leading-tight">${subject.subject_name || subject.name}</h3>
                <div class="flex items-center space-x-4 text-sm text-gray-600">
                    <span class="flex items-center">
                        <i data-lucide="clock" class="w-4 h-4 mr-1"></i>
                        ${subject.credits || 4} Credits
                    </span>
                    <span class="flex items-center">
                        <i data-lucide="calendar" class="w-4 h-4 mr-1"></i>
                        ${subject.academic_year || '2024-25'}
                    </span>
                </div>
            </div>
            <div class="ml-4">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <i data-lucide="book-open" class="w-6 h-6 text-white"></i>
                </div>
            </div>
        </div>
        
        ${subject.description ? `
        <p class="text-gray-600 mb-4 text-sm leading-relaxed">${subject.description}</p>
        ` : ''}
        
        <div class="flex items-center justify-between pt-4 border-t border-gray-100">
            <div class="flex items-center space-x-2 text-sm">
                <i data-lucide="file-text" class="w-4 h-4 text-gray-400"></i>
                <span class="text-gray-600">Syllabus Document</span>
            </div>
            ${hasDocument ? `
                <a href="${downloadUrl}" 
                   class="download-btn" 
                   target="_blank"
                   onclick="trackDownload('${subject.subject_code}')">
                    <i data-lucide="download" class="w-4 h-4"></i>
                    Download
                </a>
            ` : `
                <button class="download-btn unavailable" disabled>
                    <i data-lucide="clock" class="w-4 h-4"></i>
                    Coming Soon
                </button>
            `}
        </div>
    `;
    
    return card;
}

// Show no subjects message
function showNoSubjects() {
    const grid = document.getElementById('subjects-grid');
    const noSubjects = document.getElementById('no-subjects');
    
    grid.innerHTML = '';
    noSubjects.classList.remove('hidden');
}

// Track download for analytics
function trackDownload(subjectCode) {
    console.log(`Download tracked: ${subjectCode}`);
    // Add analytics tracking here if needed
}

// Get sample subjects for demonstration
function getSampleSubjects(branchId, semester) {
    const subjects = {
        'computer': {
            1: [
                {
                    subject_code: '22101',
                    subject_name: 'Applied Mathematics',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Fundamental mathematical concepts including calculus, differential equations, and linear algebra.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/co_sem1_math.pdf'
                },
                {
                    subject_code: '22102',
                    subject_name: 'Applied Physics',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Basic principles of physics including mechanics, thermodynamics, and wave motion.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/co_sem1_physics.pdf'
                },
                {
                    subject_code: '22103',
                    subject_name: 'Applied Chemistry',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Chemical principles including atomic structure, chemical bonding, and organic chemistry.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/co_sem1_chemistry.pdf'
                },
                {
                    subject_code: '22104',
                    subject_name: 'Engineering Drawing',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Technical drawing fundamentals, orthographic projections, and CAD basics.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/co_sem1_drawing.pdf'
                },
                {
                    subject_code: '22105',
                    subject_name: 'Basic Electrical Engineering',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Electrical fundamentals including DC/AC circuits, electrical machines, and power systems.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/co_sem1_electrical.pdf'
                }
            ],
            2: [
                {
                    subject_code: '22201',
                    subject_name: 'Applied Mathematics - II',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Advanced mathematical concepts including complex analysis and probability.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/co_sem2_math.pdf'
                },
                {
                    subject_code: '22202',
                    subject_name: 'Applied Physics - II',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Advanced physics including optics, modern physics, and semiconductor physics.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/co_sem2_physics.pdf'
                },
                {
                    subject_code: '22203',
                    subject_name: 'Programming in C',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Introduction to programming with C language, data structures, and algorithms.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/co_sem2_programming.pdf'
                },
                {
                    subject_code: '22204',
                    subject_name: 'Basic Electronics',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Electronic devices, circuits, amplifiers, and digital electronics.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/co_sem2_electronics.pdf'
                }
            ],
            3: [
                {
                    subject_code: '22301',
                    subject_name: 'Object Oriented Programming',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'OOP concepts using C++/Java including inheritance, polymorphism, and encapsulation.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/co_sem3_oop.pdf'
                },
                {
                    subject_code: '22302',
                    subject_name: 'Data Structures',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Arrays, linked lists, stacks, queues, trees, and graph algorithms.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/co_sem3_ds.pdf'
                },
                {
                    subject_code: '22303',
                    subject_name: 'Digital Electronics',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Boolean algebra, logic gates, combinational and sequential circuits.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/co_sem3_digital.pdf'
                }
            ]
        },
        'mechanical': {
            1: [
                {
                    subject_code: '22101',
                    subject_name: 'Applied Mathematics',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Mathematical foundations for mechanical engineering applications.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/me_sem1_math.pdf'
                },
                {
                    subject_code: '22102',
                    subject_name: 'Applied Physics',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Physics principles relevant to mechanical systems and materials.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/me_sem1_physics.pdf'
                },
                {
                    subject_code: '22107',
                    subject_name: 'Engineering Mechanics',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Statics, dynamics, and mechanics of materials for engineering applications.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/me_sem1_mechanics.pdf'
                },
                {
                    subject_code: '22108',
                    subject_name: 'Basic Workshop Practice',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Hands-on experience with manufacturing processes and tools.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/me_sem1_workshop.pdf'
                }
            ],
            2: [
                {
                    subject_code: '22201',
                    subject_name: 'Applied Mathematics - II',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Advanced mathematics for mechanical engineering problems.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/me_sem2_math.pdf'
                },
                {
                    subject_code: '22207',
                    subject_name: 'Strength of Materials',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Stress, strain, bending, and torsion in mechanical components.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/me_sem2_som.pdf'
                },
                {
                    subject_code: '22208',
                    subject_name: 'Thermodynamics',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Heat, work, energy, and thermodynamic cycles.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/me_sem2_thermo.pdf'
                }
            ]
        },
        'civil': {
            1: [
                {
                    subject_code: '22101',
                    subject_name: 'Applied Mathematics',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Mathematical concepts for civil engineering analysis and design.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/ce_sem1_math.pdf'
                },
                {
                    subject_code: '22109',
                    subject_name: 'Building Materials',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Properties and applications of construction materials.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/ce_sem1_materials.pdf'
                },
                {
                    subject_code: '22110',
                    subject_name: 'Surveying',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Land surveying techniques and instruments.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/ce_sem1_surveying.pdf'
                }
            ],
            2: [
                {
                    subject_code: '22209',
                    subject_name: 'Concrete Technology',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Concrete mix design, properties, and testing methods.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/ce_sem2_concrete.pdf'
                },
                {
                    subject_code: '22210',
                    subject_name: 'Fluid Mechanics',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Fluid properties, flow analysis, and hydraulic systems.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/ce_sem2_fluid.pdf'
                }
            ]
        },
        'electrical': {
            1: [
                {
                    subject_code: '22101',
                    subject_name: 'Applied Mathematics',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Mathematical foundations for electrical engineering.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/ee_sem1_math.pdf'
                },
                {
                    subject_code: '22111',
                    subject_name: 'DC Circuits',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Direct current circuit analysis and network theorems.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/ee_sem1_dc.pdf'
                },
                {
                    subject_code: '22112',
                    subject_name: 'Electrical Materials',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Properties of conductors, insulators, and magnetic materials.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/ee_sem1_materials.pdf'
                }
            ],
            2: [
                {
                    subject_code: '22211',
                    subject_name: 'AC Circuits',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Alternating current analysis, phasors, and power calculations.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/ee_sem2_ac.pdf'
                },
                {
                    subject_code: '22212',
                    subject_name: 'Electrical Machines - I',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Transformers, DC machines, and their applications.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/ee_sem2_machines.pdf'
                }
            ]
        },
        'electronics': {
            1: [
                {
                    subject_code: '22101',
                    subject_name: 'Applied Mathematics',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Mathematical concepts for electronics engineering.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/ec_sem1_math.pdf'
                },
                {
                    subject_code: '22113',
                    subject_name: 'Electronic Devices',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Semiconductor devices, diodes, and transistors.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/ec_sem1_devices.pdf'
                },
                {
                    subject_code: '22114',
                    subject_name: 'Network Analysis',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Circuit analysis techniques and network theorems.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/ec_sem1_network.pdf'
                }
            ],
            2: [
                {
                    subject_code: '22213',
                    subject_name: 'Electronic Circuits',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Amplifiers, oscillators, and electronic circuit design.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/ec_sem2_circuits.pdf'
                },
                {
                    subject_code: '22214',
                    subject_name: 'Digital Electronics',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Digital logic, Boolean algebra, and combinational circuits.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/ec_sem2_digital.pdf'
                }
            ]
        },
        'information': {
            1: [
                {
                    subject_code: '22101',
                    subject_name: 'Applied Mathematics',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Mathematical foundations for information technology.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/it_sem1_math.pdf'
                },
                {
                    subject_code: '22115',
                    subject_name: 'Programming Fundamentals',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Introduction to programming concepts and problem-solving.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/it_sem1_programming.pdf'
                },
                {
                    subject_code: '22116',
                    subject_name: 'Computer Fundamentals',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Computer architecture, operating systems, and hardware basics.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/it_sem1_computer.pdf'
                }
            ],
            2: [
                {
                    subject_code: '22215',
                    subject_name: 'Database Management',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'Database design, SQL, and database administration.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/it_sem2_database.pdf'
                },
                {
                    subject_code: '22216',
                    subject_name: 'Web Technologies',
                    credits: 4,
                    academic_year: '2024-25',
                    description: 'HTML, CSS, JavaScript, and web development fundamentals.',
                    has_document: true,
                    document_url: '/media/sample_pdfs/it_sem2_web.pdf'
                }
            ]
        }
    };
    
    return subjects[branchId]?.[semester] || [];
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Handle mobile menu toggle
document.addEventListener('click', function(e) {
    if (e.target.matches('[data-lucide="menu"]') || e.target.closest('button')?.querySelector('[data-lucide="menu"]')) {
        // Mobile menu logic here
        console.log('Mobile menu clicked');
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Handle escape key - go back to previous view
        if (!document.getElementById('branch-selection').classList.contains('hidden')) {
            return; // Already at top level
        } else if (!document.getElementById('semester-selection').classList.contains('hidden')) {
            showBranchView();
        } else if (!document.getElementById('subject-listing').classList.contains('hidden')) {
            showSemesterView();
        }
    }
});

// Add search functionality (if needed in future)
function searchSubjects(query) {
    // Implementation for searching subjects
    console.log('Searching for:', query);
}

// Utility function to debounce API calls
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

// Export functions for global access
window.showBranchView = showBranchView;
window.showSemesterView = showSemesterView;
window.showSubjectView = showSubjectView;
window.trackDownload = trackDownload;
