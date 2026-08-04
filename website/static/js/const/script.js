// Main application initialization
function initApplication() {
    console.log('Initializing application...');
    
    try {
        // Initialize the application
        if (typeof initializeApp === 'function') {
            initializeApp();
            console.log('Application initialized successfully');
        } else {
            console.error('initializeApp function not found');
        }
    } catch (error) {
        console.error('Error initializing application:', error);
    }
}

// Function to safely initialize Lucide icons
function initLucideIcons() {
    try {
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
            console.log('Lucide icons initialized');
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error initializing Lucide icons:', error);
        return false;
    }
}

// Call Lucide initialization
initLucideIcons();

// Start the application when the DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApplication);
} else {
    // DOMContentLoaded has already fired
    initApplication();
}

// Application state
let selectedBranch = '';
let selectedSemester = '';

// Data
const branches = [
    { id: 'computer', name: 'Computer Engineering', icon: '💻' },
    { id: 'mechanical', name: 'Mechanical Engineering', icon: '⚙️' },
    { id: 'electrical', name: 'Electrical Engineering', icon: '⚡' },
    { id: 'civil', name: 'Civil Engineering', icon: '🏗️' },
    { id: 'electronics', name: 'Electronics Engineering', icon: '📡' },
    { id: 'automobile', name: 'Automobile Engineering', icon: '🚗' }
];

const semesters = [
    { id: '1', name: 'Semester 1' },
    { id: '2', name: 'Semester 2' },
    { id: '3', name: 'Semester 3' },
    { id: '4', name: 'Semester 4' },
    { id: '5', name: 'Semester 5' },
    { id: '6', name: 'Semester 6' }
];

const quickResources = [
    { id: 'syllabus', name: 'Syllabus', icon: 'book-open', color: 'bg-blue-500', description: 'Latest curriculum', url: 'syllabus.html' },
    { id: 'practicals', name: 'Lab Manuals', icon: 'settings', color: 'bg-green-500', description: 'Hands-on experiments', url: 'lab-manuals.html' },
    { id: 'assignments', name: 'Assignments', icon: 'file-text', color: 'bg-purple-500', description: 'Practice problems', url: 'assignments.html' },
    { id: 'projects', name: 'Micro-Projects', icon: 'lightbulb', color: 'bg-orange-500', description: 'Project ideas', url: 'microprojects.html' },
    { id: 'papers', name: 'Question Papers', icon: 'clipboard-list', color: 'bg-red-500', description: 'Previous year papers', url: 'question_papers.html' }
];

const trendingMaterials = [
    {
        id: 1,
        title: 'Data Structures & Algorithms Complete Notes',
        subject: 'Computer Engineering',
        semester: 'Semester 4',
        downloads: 2847,
        views: 12450,
        rating: 4.9,
        uploadDate: '2 days ago',
        trending: true,
        type: 'Notes',
        weeklyGrowth: '+45%'
    },
    {
        id: 2,
        title: 'Engineering Mechanics Lab Manual 2025',
        subject: 'Mechanical Engineering',
        semester: 'Semester 3',
        downloads: 1923,
        views: 8760,
        rating: 4.8,
        uploadDate: '1 week ago',
        trending: true,
        type: 'Lab Manual',
        weeklyGrowth: '+32%'
    },
    {
        id: 3,
        title: 'Digital Electronics Micro-Project Collection',
        subject: 'Electronics Engineering',
        semester: 'Semester 5',
        downloads: 3156,
        views: 15230,
        rating: 4.9,
        uploadDate: '3 days ago',
        trending: true,
        type: 'Projects',
        weeklyGrowth: '+67%'
    },
    {
        id: 4,
        title: 'Construction Technology Assignment Solutions',
        subject: 'Civil Engineering',
        semester: 'Semester 4',
        downloads: 1456,
        views: 6890,
        rating: 4.7,
        uploadDate: '5 days ago',
        trending: true,
        type: 'Assignments',
        weeklyGrowth: '+28%'
    }
];

const officialUpdates = [
    {
        id: 1,
        title: 'MSBTE Summer 2025 Exam Schedule Released',
        description: 'Check your exam dates and prepare accordingly. Download the complete timetable.',
        date: '2025-01-15',
        type: 'Exam Schedule',
        priority: 'high',
        link: '#'
    },
    {
        id: 2,
        title: 'New Curriculum Updates for AY 2024-25',
        description: 'Updated syllabus for Computer and Electronics Engineering branches.',
        date: '2025-01-12',
        type: 'Curriculum',
        priority: 'medium',
        link: '#'
    },
    {
        id: 3,
        title: 'Online Practical Submission Guidelines',
        description: 'Important instructions for submitting lab practicals online.',
        date: '2025-01-10',
        type: 'Guidelines',
        priority: 'high',
        link: '#'
    }
];

const importantLinks = [
    { name: 'MSBTE Official Portal', url: 'https://msbte.ac.in/', description: 'Official MSBTE website' },
    { name: 'Student Login Portal', url: 'https://mahadbt.maharashtra.gov.in/Login/Login', description: 'Access your student dashboard' },
    { name: 'Exam Results', url: 'syllabus.html', description: 'Check your semester results' },
    { name: 'Admission Information', url: 'https://poly25.dtemaharashtra.gov.in/diploma25/index.php/login_controller/candidatelogin/', description: 'Polytechnic admission details' },
    { name: 'Scholarship Portal', url: 'syllabus.html', description: 'Apply for scholarships' },
    { name: 'Academic Calendar', url: 'https://drive.google.com/file/d/1kDcLtkiF73OvbIFJmQOYXEypovEPZiN1/view?usp=sharing', description: 'Important academic dates' }
];

const recentReviews = [
    {
        id: 1,
        userName: 'Priya S.',
        branch: 'Computer Engineering',
        rating: 5,
        comment: 'Amazing collection of notes! Helped me score 85% in my semester exams.',
        date: '2 days ago',
        materialTitle: 'Java Programming Notes'
    },
    {
        id: 2,
        userName: 'Rahul M.',
        branch: 'Mechanical Engineering',
        rating: 5,
        comment: 'Lab manuals are very detailed and easy to understand. Highly recommended!',
        date: '1 week ago',
        materialTitle: 'Thermodynamics Lab Manual'
    },
    {
        id: 3,
        userName: 'Sneha K.',
        branch: 'Electronics Engineering',
        rating: 4,
        comment: 'Great micro-project ideas. Successfully completed my semester project.',
        date: '3 days ago',
        materialTitle: 'IoT Project Collection'
    }
];

const trustFeatures = [
    {
        icon: 'shield',
        title: 'Verified & High-Quality',
        description: 'All materials are reviewed and verified by experts',
        color: 'text-green-600'
    },
    {
        icon: 'check-circle',
        title: 'Easy to Navigate',
        description: 'Intuitive design makes finding resources effortless',
        color: 'text-blue-600'
    },
    {
        icon: 'award',
        title: 'Completely Free',
        description: 'Access all resources without any cost or hidden fees',
        color: 'text-purple-600'
    }
];

// Initialize the application
function initializeApp() {
    console.log('Starting application initialization...');
    
    try {
        // List of all render functions to call
        const renderFunctions = [
            { name: 'Quick Resources', func: renderQuickResources },
            { name: 'Trending Materials', func: renderTrendingMaterials },
            { name: 'Branches', func: renderBranches },
            { name: 'Semesters', func: renderSemesters },
            { name: 'Trust Features', func: renderTrustFeatures },
            { name: 'Official Updates', func: renderOfficialUpdates },
            { name: 'Student Reviews', func: renderStudentReviews },
            { name: 'Important Links', func: renderImportantLinks }
        ];
        
        // Execute each render function with error handling
        renderFunctions.forEach(({ name, func }) => {
            try {
                console.log(`Rendering: ${name}...`);
                func();
            } catch (error) {
                console.error(`Error rendering ${name}:`, error);
            }
        });
        
        // Setup event listeners last
        try {
            setupEventListeners();
            console.log('Event listeners set up successfully');
        } catch (error) {
            console.error('Error setting up event listeners:', error);
        }
        
        // Refresh Lucide icons after all content is rendered
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }
        
        console.log('Application initialization completed');
    } catch (error) {
        console.error('Error during application initialization:', error);
    }
}

// Render functions with error handling and logging
function renderQuickResources() {
    try {
        const container = document.getElementById('quick-resources');
        if (!container) {
            console.error('Quick Resources container not found');
            return;
        }
        
        if (!Array.isArray(quickResources)) {
            console.error('quickResources data is not an array');
            return;
        }
        
        container.innerHTML = quickResources.map(resource => `
            <a href="${resource.url || '#'}" class="block bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 group hover:-translate-y-1" style="transform: translateY(0); text-decoration: none;">
                <div class="w-12 h-12 ${resource.color || 'bg-blue-500'} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                    <i data-lucide="${resource.icon || 'file'}" class="w-6 h-6 text-white"></i>
                </div>
                <h3 class="font-semibold text-gray-900 mb-2">${resource.name || 'Resource'}</h3>
                <p class="text-sm text-gray-600">${resource.description || 'Access resource'}</p>
                <div class="mt-4 flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
                    <span>Access Now</span>
                    <i data-lucide="chevron-right" class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200"></i>
                </div>
            </a>
        `).join('');
        
        console.log('Quick Resources rendered successfully');
    } catch (error) {
        console.error('Error rendering Quick Resources:', error);
    }
}

function renderTrendingMaterials() {
    try {
        const container = document.getElementById('trending-materials');
        if (!container) {
            console.error('Trending Materials container not found');
            return;
        }
        
        if (!Array.isArray(trendingMaterials)) {
            console.error('trendingMaterials data is not an array');
            return;
        }
        
        container.innerHTML = trendingMaterials.map(item => `
            <div class="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100 hover:shadow-lg transition-all duration-200 cursor-pointer group hover:-translate-y-1" style="transform: translateY(0);">
                <div class="flex justify-between items-start mb-4">
                    <div class="flex items-center space-x-2">
                        <i data-lucide="zap" class="w-4 h-4 text-orange-500"></i>
                        <span class="text-xs font-semibold px-2 py-1 rounded-full bg-orange-100 text-orange-800">
                            TRENDING
                        </span>
                    </div>
                    <div class="flex items-center space-x-1">
                        <i data-lucide="star" class="w-3 h-3 text-yellow-400 fill-current"></i>
                        <span class="text-xs text-gray-600">${item.rating || '0.0'}</span>
                    </div>
                </div>
                <h3 class="font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                    ${item.title || 'No title available'}
                </h3>
                <p class="text-sm text-gray-600 mb-1">${item.subject || 'General'}</p>
                <p class="text-xs text-gray-500 mb-4">${item.semester || 'Semester'}</p>
                <div class="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div class="flex items-center space-x-3">
                        <div class="flex items-center space-x-1">
                            <i data-lucide="download" class="w-3 h-3"></i>
                            <span>${item.downloads || '0'}</span>
                        </div>
                        <div class="flex items-center space-x-1">
                            <i data-lucide="eye" class="w-3 h-3"></i>
                            <span>${item.views || '0'}</span>
                        </div>
                    </div>
                    ${item.weeklyGrowth ? `
                    <div class="flex items-center space-x-1 text-green-600 font-semibold">
                        <i data-lucide="trending-up" class="w-3 h-3"></i>
                        <span>${item.weeklyGrowth}</span>
                    </div>
                    ` : ''}
                </div>
                <div class="flex items-center justify-between">
                    <button class="text-orange-600 hover:text-orange-700 text-sm font-medium">
                        Download Now
                    </button>
                    <i data-lucide="chevron-right" class="w-4 h-4 text-gray-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all duration-200"></i>
                </div>
            </div>
        `).join('');
        
        console.log('Trending Materials rendered successfully');
    } catch (error) {
        console.error('Error rendering Trending Materials:', error);
    }
}

function renderBranches() {
    try {
        const container = document.getElementById('branches-grid');
        if (!container) {
            console.error('Branches container not found');
            return;
        }
        
        if (!Array.isArray(branches)) {
            console.error('branches data is not an array');
            return;
        }
        
        container.innerHTML = branches.map(branch => `
            <button
                data-branch="${branch.id || ''}"
                class="branch-btn p-4 rounded-xl border-2 border-gray-200 bg-white transition-all duration-200 text-left hover:shadow-md hover:border-blue-300"
            >
                <div class="flex items-center space-x-3">
                    <span class="text-2xl">${branch.icon || '📚'}</span>
                    <div>
                        <div class="font-medium text-gray-900">
                            ${branch.name || 'Branch'}
                        </div>
                    </div>
                </div>
            </button>
        `).join('');
        
        console.log('Branches rendered successfully');
    } catch (error) {
        console.error('Error rendering Branches:', error);
    }
}

function renderSemesters() {
    try {
        const container = document.getElementById('semesters-grid');
        if (!container) {
            console.error('Semesters container not found');
            return;
        }
        
        if (!Array.isArray(semesters)) {
            console.error('semesters data is not an array');
            return;
        }
        
        container.innerHTML = semesters.map(semester => `
            <button
                data-semester="${semester.id || ''}"
                class="semester-btn p-4 rounded-xl border-2 border-gray-200 bg-white transition-all duration-200 hover:shadow-md hover:border-orange-300"
            >
                <div class="font-medium text-center text-gray-900">
                    ${semester.name || 'Semester'}
                </div>
            </button>
        `).join('');
        
        console.log('Semesters rendered successfully');
    } catch (error) {
        console.error('Error rendering Semesters:', error);
    }
}

function renderTrustFeatures() {
    try {
        const container = document.getElementById('trust-features');
        if (!container) {
            console.error('Trust Features container not found');
            return;
        }
        
        if (!Array.isArray(trustFeatures)) {
            console.error('trustFeatures data is not an array');
            return;
        }
        
        container.innerHTML = trustFeatures.map(feature => `
            <div class="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
                <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                    <i data-lucide="${feature.icon || 'check-circle'}" class="w-6 h-6"></i>
                </div>
                <h3 class="font-semibold text-lg text-gray-900 mb-2">${feature.title || 'Feature'}</h3>
                <p class="text-gray-600">${feature.description || 'No description available'}</p>
            </div>
        `).join('');
        
        // Refresh Lucide icons
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }
        
        console.log('Trust Features rendered successfully');
    } catch (error) {
        console.error('Error rendering Trust Features:', error);
    }
}

function renderOfficialUpdates() {
    try {
        const container = document.getElementById('official-updates');
        if (!container) {
            console.error('Official Updates container not found');
            return;
        }
        
        if (!Array.isArray(officialUpdates)) {
            console.error('officialUpdates data is not an array');
            return;
        }
        
        container.innerHTML = officialUpdates.map(update => `
            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-200 cursor-pointer group">
                <div class="flex items-start justify-between mb-4">
                    <div class="px-3 py-1 rounded-full text-xs font-semibold ${
                        update.priority === 'high' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-yellow-100 text-yellow-800'
                    }">
                        ${update.type || 'Update'}
                    </div>
                    <div class="flex items-center text-xs text-gray-500">
                        <i data-lucide="calendar" class="w-3 h-3 mr-1"></i>
                        ${update.date ? new Date(update.date).toLocaleDateString() : 'No date'}
                    </div>
                </div>
                <h3 class="font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    ${update.title || 'No title available'}
                </h3>
                <p class="text-sm text-gray-600 mb-4 leading-relaxed">
                    ${update.description || 'No description available'}
                </p>
                <div class="flex items-center justify-between">
                    <a href="${update.link || '#'}" class="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
                        <span>Read More</span>
                        <i data-lucide="external-link" class="w-3 h-3"></i>
                    </a>
                    ${update.priority === 'high' ? '<i data-lucide="alert-circle" class="w-4 h-4 text-red-500"></i>' : ''}
                </div>
            </div>
        `).join('');
        
        // Refresh Lucide icons
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }
        
        console.log('Official Updates rendered successfully');
    } catch (error) {
        console.error('Error rendering Official Updates:', error);
    }
}



function renderStudentReviews() {
    try {
        const container = document.getElementById('student-reviews');
        if (!container) {
            console.error('Student Reviews container not found');
            return;
        }
        
        if (!Array.isArray(recentReviews)) {
            console.error('recentReviews data is not an array');
            return;
        }
        
        container.innerHTML = recentReviews.map(review => `
            <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center space-x-2">
                        <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                            ${review.userName ? review.userName.charAt(0) : 'U'}
                        </div>
                        <div>
                            <div class="font-medium text-gray-900">${review.userName || 'User'}</div>
                            <div class="text-xs text-gray-500">${review.branch || 'Branch'}</div>
                        </div>
                    </div>
                    <div class="flex items-center space-x-1">
                        ${Array(5).fill().map((_, i) => 
                            `<i data-lucide="star" class="w-4 h-4 ${i < (review.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}"></i>`
                        ).join('')}
                    </div>
                </div>
                <p class="text-gray-700 mb-4 leading-relaxed">"${review.comment || 'No review text available'}"</p>
                <div class="flex items-center justify-between text-sm">
                    <span class="text-blue-600 font-medium">${review.materialTitle || 'Material'}</span>
                    <span class="text-gray-500">${review.date || 'No date'}</span>
                </div>
            </div>
        `).join('');
        
        // Refresh Lucide icons
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }
        
        console.log('Student Reviews rendered successfully');
    } catch (error) {
        console.error('Error rendering Student Reviews:', error);
    }
}

function renderImportantLinks() {
    try {
        const container = document.getElementById('important-links');
        if (!container) {
            console.error('Important Links container not found');
            return;
        }
        
        if (!Array.isArray(importantLinks)) {
            console.error('importantLinks data is not an array');
            return;
        }
        
        container.innerHTML = importantLinks.map(link => `
            <a href="${link.url || '#'}" class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100 hover:shadow-lg transition-all duration-200 cursor-pointer group hover:-translate-y-1" style="transform: translateY(0);">
                <div class="flex items-center justify-between mb-3">
                    <h3 class="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                        ${link.name || 'Link'}
                    </h3>
                    <i data-lucide="external-link" class="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors"></i>
                </div>
                <p class="text-sm text-gray-600 leading-relaxed">
                    ${link.description || 'No description available'}
                </p>
            </a>
        `).join('');
        
        // Refresh Lucide icons
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }
        
        console.log('Important Links rendered successfully');
    } catch (error) {
        console.error('Error rendering Important Links:', error);
    }
}

// Event listeners
function setupEventListeners() {
    // Branch selection
    document.addEventListener('click', function(e) {
        if (e.target.closest('.branch-btn')) {
            const branchBtn = e.target.closest('.branch-btn');
            const branchId = branchBtn.dataset.branch;
            
            // Remove previous selection
            document.querySelectorAll('.branch-btn').forEach(btn => {
                btn.classList.remove('selected');
            });
            
            // Add selection to clicked branch
            branchBtn.classList.add('selected');
            selectedBranch = branchId;
            
            // Show semester section
            const semesterSection = document.getElementById('semester-section');
            semesterSection.style.display = 'block';
            semesterSection.classList.add('animate-fadeIn');
            
            // Render semesters
            renderSemesters();
            
            // Hide show materials button
            document.getElementById('show-materials-section').style.display = 'none';
            selectedSemester = '';
        }
        
        // Semester selection
        if (e.target.closest('.semester-btn')) {
            const semesterBtn = e.target.closest('.semester-btn');
            const semesterId = semesterBtn.dataset.semester;
            
            // Remove previous selection
            document.querySelectorAll('.semester-btn').forEach(btn => {
                btn.classList.remove('semester-selected');
            });
            
            // Add selection to clicked semester
            semesterBtn.classList.add('semester-selected');
            selectedSemester = semesterId;
            
            // Show materials button
            const showMaterialsSection = document.getElementById('show-materials-section');
            showMaterialsSection.style.display = 'block';
            showMaterialsSection.classList.add('animate-fadeIn');
        }
        
        // Show materials button
        if (e.target.closest('#show-materials-btn')) {
            handleShowMaterials();
        }
    });
}

function handleShowMaterials() {
    if (selectedBranch && selectedSemester) {
        const branchName = branches.find(b => b.id === selectedBranch)?.name;
        const semesterName = semesters.find(s => s.id === selectedSemester)?.name;
        
        alert(`Showing materials for ${branchName} - ${semesterName}\n\nThis would typically navigate to a materials page or open a modal with the available resources.`);
        
        console.log(`Showing materials for ${selectedBranch} - ${selectedSemester}`);
    }
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
});

// Add hover effects for cards
document.addEventListener('mouseover', function(e) {
    if (e.target.closest('.group')) {
        const card = e.target.closest('.group');
        if (card.style.transform === 'translateY(0px)' || card.style.transform === '') {
            card.style.transform = 'translateY(-4px)';
        }
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.closest('.group')) {
        const card = e.target.closest('.group');
        if (card.style.transform === 'translateY(-4px)') {
            card.style.transform = 'translateY(0px)';
        }
    }
});



