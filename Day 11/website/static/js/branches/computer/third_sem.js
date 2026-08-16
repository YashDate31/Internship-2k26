// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    
    // Initialize all components
    initializeMobileMenu();
    initializeStudyMaterials();
    initializePracticals();
    initializeMicroprojects();
    initializeVideoLectures();
    initializeHelpGuides();
});

// Mobile Menu Functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const menuIcon = document.getElementById('menuIcon');
    const closeIcon = document.getElementById('closeIcon');

    mobileMenuBtn.addEventListener('click', function() {
        const isOpen = mobileNav.classList.contains('active');
        
        if (isOpen) {
            mobileNav.classList.remove('active');
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        } else {
            mobileNav.classList.add('active');
            menuIcon.style.display = 'none';
            closeIcon.style.display = 'block';
        }
    });
}

// Study Materials Data and Functionality
function initializeStudyMaterials() {
    const subjects = [
        {
            id: 'math3',
            name: 'Applied Mathematics - III',
            code: '22301',
            description: 'Differential equations, Laplace transforms, and numerical methods',
            materials: 15,
            lastUpdated: '2 days ago',
            rating: 4.8,
            files: [
                { name: 'Unit 1 - Differential Equations.pdf', size: '2.4 MB', downloads: 1250 },
                { name: 'Unit 2 - Laplace Transforms.pdf', size: '1.8 MB', downloads: 980 },
                { name: 'Important Questions - Mid Sem.pdf', size: '850 KB', downloads: 2100 },
                { name: 'Numerical Methods Notes.pdf', size: '3.2 MB', downloads: 756 }
            ]
        },
        {
            id: 'ds',
            name: 'Data Structure',
            code: '22317',
            description: 'Arrays, linked lists, stacks, queues, trees, and sorting algorithms',
            materials: 22,
            lastUpdated: '1 day ago',
            rating: 4.9,
            files: [
                { name: 'Complete DS Notes.pdf', size: '4.1 MB', downloads: 1890 },
                { name: 'Practical Programs.pdf', size: '2.7 MB', downloads: 1456 },
                { name: 'Important Questions.pdf', size: '1.2 MB', downloads: 2340 }
            ]
        },
        {
            id: 'oop',
            name: 'Object Oriented Programming',
            code: '22316',
            description: 'Java programming, classes, objects, inheritance, and polymorphism',
            materials: 18,
            lastUpdated: '3 days ago',
            rating: 4.7,
            files: [
                { name: 'Java Basics to Advanced.pdf', size: '5.2 MB', downloads: 2100 },
                { name: 'OOP Concepts Explained.pdf', size: '2.1 MB', downloads: 1678 },
                { name: 'Practice Programs.pdf', size: '1.9 MB', downloads: 1234 }
            ]
        },
        {
            id: 'dbms',
            name: 'Database Management System',
            code: '22318',
            description: 'SQL, database design, normalization, and transaction management',
            materials: 20,
            lastUpdated: '1 week ago',
            rating: 4.6,
            files: [
                { name: 'DBMS Complete Notes.pdf', size: '3.8 MB', downloads: 1567 },
                { name: 'SQL Queries Practice.pdf', size: '1.5 MB', downloads: 1890 },
                { name: 'ER Diagrams Guide.pdf', size: '2.2 MB', downloads: 1123 }
            ]
        },
        {
            id: 'cg',
            name: 'Computer Graphics',
            code: '22319',
            description: 'Graphics algorithms, transformations, and OpenGL programming',
            materials: 16,
            lastUpdated: '4 days ago',
            rating: 4.5,
            files: [
                { name: 'Graphics Algorithms.pdf', size: '4.5 MB', downloads: 987 },
                { name: 'OpenGL Programming.pdf', size: '3.1 MB', downloads: 756 },
                { name: 'Practical Exercises.pdf', size: '2.8 MB', downloads: 1234 }
            ]
        },
        {
            id: 'digital',
            name: 'Digital Techniques',
            code: '22320',
            description: 'Logic gates, combinational circuits, and sequential circuits',
            materials: 14,
            lastUpdated: '5 days ago',
            rating: 4.4,
            files: [
                { name: 'Digital Logic Design.pdf', size: '2.9 MB', downloads: 1345 },
                { name: 'Circuit Diagrams.pdf', size: '3.4 MB', downloads: 987 },
                { name: 'Practice Problems.pdf', size: '1.7 MB', downloads: 1567 }
            ]
        }
    ];

    let currentSubjects = subjects;
    let selectedSubject = null;

    const subjectsGrid = document.getElementById('subjectsGrid');
    const subjectDetail = document.getElementById('subjectDetail');
    const materialFilter = document.getElementById('materialFilter');
    const backBtn = document.getElementById('backBtn');

    function renderSubjects() {
        subjectsGrid.innerHTML = '';
        
        currentSubjects.forEach(subject => {
            const subjectCard = document.createElement('div');
            subjectCard.className = 'subject-card';
            subjectCard.innerHTML = `
                <div class="subject-header">
                    <div class="subject-icon">
                        <i data-lucide="book-open"></i>
                    </div>
                    <div class="subject-rating">
                        <i data-lucide="star" class="star-icon"></i>
                        <span class="rating-text">${subject.rating}</span>
                    </div>
                </div>
                <h3 class="subject-title">${subject.name}</h3>
                <p class="subject-code">Code: ${subject.code}</p>
                <p class="subject-description">${subject.description}</p>
                <div class="subject-meta">
                    <div class="meta-item">
                        <i data-lucide="file-text" class="meta-icon"></i>
                        <span>${subject.materials} materials</span>
                    </div>
                    <div class="meta-item">
                        <i data-lucide="clock" class="meta-icon"></i>
                        <span>${subject.lastUpdated}</span>
                    </div>
                </div>
                <button class="btn-primary" onclick="showSubjectDetail('${subject.id}')">
                    View Materials
                </button>
            `;
            subjectsGrid.appendChild(subjectCard);
        });
        
        lucide.createIcons();
    }

    function showSubjectDetail(subjectId) {
        selectedSubject = subjects.find(s => s.id === subjectId);
        if (!selectedSubject) return;

        document.getElementById('detailTitle').textContent = selectedSubject.name;
        document.getElementById('detailCode').textContent = `Code: ${selectedSubject.code}`;

        const filesGrid = document.getElementById('filesGrid');
        filesGrid.innerHTML = '';

        selectedSubject.files.forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <div class="file-content">
                    <div class="file-info">
                        <i data-lucide="file-text" class="file-icon"></i>
                        <div class="file-details">
                            <h4>${file.name}</h4>
                            <div class="file-meta">
                                <span>${file.size}</span>
                                <span>•</span>
                                <i data-lucide="download" class="download-icon"></i>
                                <span>${file.downloads.toLocaleString()} downloads</span>
                            </div>
                        </div>
                    </div>
                    <button class="btn-download">Download</button>
                </div>
            `;
            filesGrid.appendChild(fileItem);
        });

        subjectsGrid.style.display = 'none';
        subjectDetail.style.display = 'block';
        lucide.createIcons();
    }

    function hideSubjectDetail() {
        subjectsGrid.style.display = 'grid';
        subjectDetail.style.display = 'none';
        selectedSubject = null;
    }

    // Filter functionality
    materialFilter.addEventListener('change', function() {
        const filterValue = this.value;
        
        if (filterValue === 'all') {
            currentSubjects = subjects;
        } else if (filterValue === 'recent') {
            currentSubjects = subjects.filter(subject => subject.lastUpdated.includes('day'));
        } else if (filterValue === 'popular') {
            currentSubjects = subjects.filter(subject => subject.rating >= 4.7);
        }
        
        renderSubjects();
    });

    backBtn.addEventListener('click', hideSubjectDetail);

    // Make showSubjectDetail globally accessible
    window.showSubjectDetail = showSubjectDetail;

    // Initial render
    renderSubjects();
}

// Practicals Section
function initializePracticals() {
    const practicals = [
        {
            id: 'java-lab',
            title: 'Java Programming Lab',
            code: 'Practical Set A',
            description: 'Complete Java programming exercises with solutions and explanations',
            programs: 15,
            difficulty: 'intermediate',
            color: 'bg-orange-500'
        },
        {
            id: 'ds-lab',
            title: 'Data Structure Lab',
            code: 'Practical Set B',
            description: 'Implementation of arrays, linked lists, stacks, queues, and trees',
            programs: 12,
            difficulty: 'advanced',
            color: 'bg-green-500'
        },
        {
            id: 'dbms-lab',
            title: 'Database Management Lab',
            code: 'Practical Set C',
            description: 'SQL queries, database design, and normalization exercises',
            programs: 10,
            difficulty: 'intermediate',
            color: 'bg-blue-500'
        },
        {
            id: 'graphics-lab',
            title: 'Computer Graphics Lab',
            code: 'Practical Set D',
            description: 'Graphics programming using OpenGL and basic algorithms',
            programs: 8,
            difficulty: 'advanced',
            color: 'bg-purple-500'
        },
        {
            id: 'digital-lab',
            title: 'Digital Techniques Lab',
            code: 'Practical Set E',
            description: 'Logic circuit design and implementation exercises',
            programs: 6,
            difficulty: 'beginner',
            color: 'bg-red-500'
        }
    ];

    const practicalsGrid = document.querySelector('.practicals-grid');
    
    practicals.forEach(practical => {
        const practicalCard = document.createElement('div');
        practicalCard.className = 'practical-card';
        practicalCard.innerHTML = `
            <div class="practical-header">
                <div class="practical-icon" style="background: ${practical.color.replace('bg-', '#')};">
                    <i data-lucide="settings"></i>
                </div>
                <div class="practical-info">
                    <h3>${practical.title}</h3>
                    <p class="practical-code">${practical.code}</p>
                </div>
            </div>
            <p class="practical-description">${practical.description}</p>
            <div class="practical-meta">
                <div class="programs-count">
                    <i data-lucide="file-text"></i>
                    <span>${practical.programs} programs</span>
                </div>
                <span class="difficulty-badge difficulty-${practical.difficulty}">
                    ${practical.difficulty.charAt(0).toUpperCase() + practical.difficulty.slice(1)}
                </span>
            </div>
            <div class="practical-actions">
                <button class="btn-download-sample">
                    <i data-lucide="download"></i>
                    Download Sample
                </button>
                <button class="btn-view-guide">View Guide</button>
            </div>
        `;
        practicalsGrid.appendChild(practicalCard);
    });
    
    lucide.createIcons();
}

// Microprojects Section
function initializeMicroprojects() {
    const projects = [
        {
            id: 'web-dev',
            title: 'Web Development Projects',
            color: '#3b82f6',
            description: 'Modern web applications using HTML, CSS, JavaScript, and frameworks',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js'],
            difficulty: 'Intermediate',
            projects: [
                'Student Management System',
                'Online Library System',
                'E-commerce Website',
                'Portfolio Website'
            ]
        },
        {
            id: 'java-projects',
            title: 'Java Application Projects',
            color: '#f97316',
            description: 'Desktop and console applications using Java programming',
            technologies: ['Java', 'Swing', 'JDBC', 'MySQL'],
            difficulty: 'Intermediate',
            projects: [
                'Banking Management System',
                'Hospital Management System',
                'Inventory Management',
                'Student Grade Calculator'
            ]
        },
        {
            id: 'database-projects',
            title: 'Database Management Projects',
            color: '#22c55e',
            description: 'Database design and implementation projects with real-world scenarios',
            technologies: ['MySQL', 'SQL Server', 'Oracle', 'MongoDB'],
            difficulty: 'Advanced',
            projects: [
                'College Database System',
                'Employee Management DB',
                'Online Shopping Database',
                'Library Management DB'
            ]
        },
        {
            id: 'mobile-dev',
            title: 'Mobile App Concepts',
            color: '#a855f7',
            description: 'Mobile application ideas and basic implementation concepts',
            technologies: ['Android', 'Java', 'XML', 'SQLite'],
            difficulty: 'Advanced',
            projects: [
                'Student Attendance App',
                'College Notice Board',
                'Study Planner App',
                'Campus Navigation'
            ]
        }
    ];

    const vivaQuestions = [
        {
            question: 'What is the difference between a project and a microproject?',
            answer: 'A microproject is a smaller, focused project that can be completed in 2-4 weeks, while a major project is more comprehensive and takes an entire semester. Microprojects focus on specific skills or technologies.'
        },
        {
            question: 'How do you choose the right technology stack for your project?',
            answer: 'Consider factors like project requirements, your skill level, available resources, scalability needs, and industry standards. Start with technologies you\'re comfortable with and gradually incorporate new ones.'
        },
        {
            question: 'What should be included in a project documentation?',
            answer: 'Include project overview, objectives, system requirements, design diagrams, implementation details, testing results, screenshots, conclusion, and future enhancements.'
        },
        {
            question: 'How do you handle project deadlines and time management?',
            answer: 'Break the project into smaller tasks, create a timeline, prioritize features, work on core functionality first, and keep buffer time for testing and documentation.'
        },
        {
            question: 'What are the common challenges in microproject development?',
            answer: 'Time constraints, scope creep, technical difficulties, resource limitations, and balancing functionality with simplicity. Plan well and start early to overcome these challenges.'
        }
    ];

    const projectsGrid = document.getElementById('projectsGrid');
    const vivaQuestionsContainer = document.getElementById('vivaQuestions');

    // Render project cards
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-header">
                <div class="project-icon" style="background: ${project.color};">
                    <i data-lucide="globe"></i>
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <span class="difficulty-badge difficulty-${project.difficulty.toLowerCase()}">
                        ${project.difficulty}
                    </span>
                </div>
            </div>
            <p class="project-description">${project.description}</p>
            <div class="technologies-section">
                <h4>Technologies:</h4>
                <div class="technologies-list">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
            <div class="projects-section">
                <h4>Sample Projects:</h4>
                <ul class="projects-list">
                    ${project.projects.map(proj => `<li>${proj}</li>`).join('')}
                </ul>
            </div>
            <button class="btn-primary">View Details & Get Ideas</button>
        `;
        projectsGrid.appendChild(projectCard);
    });

    // Render viva questions
    vivaQuestions.forEach((item, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'viva-question';
        questionDiv.innerHTML = `
            <button class="question-button" onclick="toggleVivaAnswer(${index})">
                <span class="question-text">${item.question}</span>
                <i data-lucide="chevron-down" class="chevron-icon" id="chevron-${index}"></i>
            </button>
            <div class="answer-content" id="answer-${index}" style="display: none;">
                <p class="answer-text">${item.answer}</p>
            </div>
        `;
        vivaQuestionsContainer.appendChild(questionDiv);
    });

    // Make toggle function globally accessible
    window.toggleVivaAnswer = function(index) {
        const answer = document.getElementById(`answer-${index}`);
        const chevron = document.getElementById(`chevron-${index}`);
        
        if (answer.style.display === 'none') {
            answer.style.display = 'block';
            chevron.classList.add('rotated');
        } else {
            answer.style.display = 'none';
            chevron.classList.remove('rotated');
        }
    };

    lucide.createIcons();
}

// Video Lectures Section
function initializeVideoLectures() {
    const videoSeries = [
        {
            id: 'math3-series',
            title: 'Applied Mathematics III',
            instructor: 'Prof. Sharma',
            description: 'Comprehensive tutorials covering differential equations, Laplace transforms, and numerical methods',
            duration: '12 hours',
            videos: 24,
            rating: 4.8,
            views: '45.2K',
            thumbnail: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400',
            topics: ['Differential Equations', 'Laplace Transforms', 'Numerical Methods', 'Fourier Series']
        },
        {
            id: 'java-series',
            title: 'Java Programming Complete Course',
            instructor: 'Dr. Patel',
            description: 'From basics to advanced OOP concepts with practical examples and projects',
            duration: '18 hours',
            videos: 36,
            rating: 4.9,
            views: '67.8K',
            thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
            topics: ['Java Basics', 'OOP Concepts', 'Exception Handling', 'Collections Framework']
        },
        {
            id: 'ds-series',
            title: 'Data Structures & Algorithms',
            instructor: 'Prof. Kumar',
            description: 'Complete coverage of data structures with algorithm analysis and implementation',
            duration: '15 hours',
            videos: 30,
            rating: 4.7,
            views: '52.1K',
            thumbnail: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400',
            topics: ['Arrays & Linked Lists', 'Stacks & Queues', 'Trees & Graphs', 'Sorting Algorithms']
        },
        {
            id: 'dbms-series',
            title: 'Database Management Systems',
            instructor: 'Dr. Singh',
            description: 'SQL, database design, normalization, and advanced database concepts',
            duration: '10 hours',
            videos: 20,
            rating: 4.6,
            views: '38.9K',
            thumbnail: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400',
            topics: ['SQL Basics', 'Database Design', 'Normalization', 'Transactions']
        },
        {
            id: 'graphics-series',
            title: 'Computer Graphics Fundamentals',
            instructor: 'Prof. Gupta',
            description: 'Graphics algorithms, transformations, and OpenGL programming tutorials',
            duration: '8 hours',
            videos: 16,
            rating: 4.5,
            views: '29.3K',
            thumbnail: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400',
            topics: ['Graphics Algorithms', '2D Transformations', '3D Graphics', 'OpenGL Basics']
        },
        {
            id: 'digital-series',
            title: 'Digital Techniques & Logic Design',
            instructor: 'Dr. Joshi',
            description: 'Logic gates, combinational circuits, and sequential circuit design',
            duration: '6 hours',
            videos: 12,
            rating: 4.4,
            views: '22.7K',
            thumbnail: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=400',
            topics: ['Logic Gates', 'Boolean Algebra', 'Combinational Circuits', 'Sequential Circuits']
        }
    ];

    const videosGrid = document.getElementById('videosGrid');

    videoSeries.forEach(series => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.innerHTML = `
            <div class="video-thumbnail" style="background-image: url('${series.thumbnail}');">
                <div class="video-overlay">
                    <button class="play-button">
                        <i data-lucide="play"></i>
                    </button>
                </div>
                <div class="video-count">${series.videos} videos</div>
            </div>
            <div class="video-content">
                <h3 class="video-title">${series.title}</h3>
                <p class="video-instructor">by ${series.instructor}</p>
                <p class="video-description">${series.description}</p>
                <div class="video-stats">
                    <div class="stat-item">
                        <i data-lucide="clock" class="stat-icon"></i>
                        <span>${series.duration}</span>
                    </div>
                    <div class="stat-item">
                        <i data-lucide="users" class="stat-icon"></i>
                        <span>${series.views} views</span>
                    </div>
                    <div class="stat-item">
                        <i data-lucide="star" class="stat-icon star-icon"></i>
                        <span>${series.rating}</span>
                    </div>
                </div>
                <div class="topics-section">
                    <h4>Topics Covered:</h4>
                    <div class="topics-list">
                        ${series.topics.map(topic => `<span class="topic-tag">${topic}</span>`).join('')}
                    </div>
                </div>
                <div class="video-actions">
                    <button class="btn-watch">
                        <i data-lucide="play"></i>
                        Watch Playlist
                    </button>
                    <button class="btn-external">
                        <i data-lucide="external-link"></i>
                    </button>
                </div>
            </div>
        `;
        videosGrid.appendChild(videoCard);
    });

    lucide.createIcons();
}

// Help Guides Section
function initializeHelpGuides() {
    const guides = [
        {
            id: 'exam-prep',
            title: 'How to Ace Your MSBTE Exams',
            author: 'Academic Team',
            readTime: '8 min read',
            category: 'Exam Preparation',
            snippet: 'Proven strategies and techniques to excel in your MSBTE semester examinations. Learn effective study methods, time management, and exam-day tips.',
            featured: true,
            tags: ['Study Tips', 'Exam Strategy', 'Time Management']
        },
        {
            id: 'time-management',
            title: 'Time Management for Diploma Students',
            author: 'Dr. Priya Sharma',
            readTime: '6 min read',
            category: 'Study Skills',
            snippet: 'Master the art of balancing academics, practicals, and personal life. Discover productivity techniques specifically designed for polytechnic students.',
            featured: false,
            tags: ['Productivity', 'Planning', 'Balance']
        },
        {
            id: 'career-paths',
            title: 'Career Pathways After Computer Engineering Diploma',
            author: 'Industry Expert',
            readTime: '12 min read',
            category: 'Career Guidance',
            snippet: 'Explore various career opportunities available after completing your computer engineering diploma. From higher education to industry jobs.',
            featured: true,
            tags: ['Career', 'Jobs', 'Higher Education']
        },
        {
            id: 'practical-tips',
            title: 'Writing Better Lab Practicals and Reports',
            author: 'Prof. Kumar',
            readTime: '5 min read',
            category: 'Academic Skills',
            snippet: 'Step-by-step guide to writing comprehensive lab reports and practical files that impress your instructors and improve your grades.',
            featured: false,
            tags: ['Lab Reports', 'Documentation', 'Grades']
        },
        {
            id: 'project-guide',
            title: 'Complete Guide to Microproject Development',
            author: 'Technical Team',
            readTime: '15 min read',
            category: 'Project Development',
            snippet: 'From ideation to implementation - everything you need to know about developing successful microprojects for your semester.',
            featured: false,
            tags: ['Projects', 'Development', 'Implementation']
        },
        {
            id: 'stress-management',
            title: 'Managing Academic Stress and Anxiety',
            author: 'Counseling Team',
            readTime: '7 min read',
            category: 'Mental Health',
            snippet: 'Practical techniques to handle academic pressure, reduce stress, and maintain mental well-being during your diploma studies.',
            featured: false,
            tags: ['Mental Health', 'Stress Relief', 'Well-being']
        }
    ];

    const featuredGuides = guides.filter(guide => guide.featured);
    const regularGuides = guides.filter(guide => !guide.featured);

    const featuredGuidesContainer = document.getElementById('featuredGuides');
    const regularGuidesContainer = document.getElementById('regularGuides');

    // Render featured guides
    featuredGuides.forEach(guide => {
        const guideCard = document.createElement('div');
        guideCard.className = 'guide-card featured';
        guideCard.innerHTML = `
            <div class="guide-header">
                <span class="category-badge featured">${guide.category}</span>
                <div class="read-time">
                    <i data-lucide="clock" class="clock-icon"></i>
                    <span>${guide.readTime}</span>
                </div>
            </div>
            <h4 class="guide-title">${guide.title}</h4>
            <div class="guide-author">
                <i data-lucide="user" class="user-icon"></i>
                <span>${guide.author}</span>
            </div>
            <p class="guide-snippet">${guide.snippet}</p>
            <div class="guide-tags">
                ${guide.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <button class="read-more-btn">
                Read More
                <i data-lucide="arrow-right" class="arrow-icon"></i>
            </button>
        `;
        featuredGuidesContainer.appendChild(guideCard);
    });

    // Render regular guides
    regularGuides.forEach(guide => {
        const guideCard = document.createElement('div');
        guideCard.className = 'guide-card regular';
        guideCard.innerHTML = `
            <div class="guide-header">
                <span class="category-badge regular">${guide.category}</span>
                <div class="read-time">
                    <i data-lucide="clock" class="clock-icon"></i>
                    <span>${guide.readTime}</span>
                </div>
            </div>
            <h4 class="guide-title">${guide.title}</h4>
            <div class="guide-author">
                <i data-lucide="user" class="user-icon"></i>
                <span>${guide.author}</span>
            </div>
            <p class="guide-snippet">${guide.snippet}</p>
            <button class="read-more-btn regular">
                Read More
                <i data-lucide="arrow-right" class="arrow-icon"></i>
            </button>
        `;
        regularGuidesContainer.appendChild(guideCard);
    });

    lucide.createIcons();
}