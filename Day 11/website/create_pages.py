import json
import os

base_dir = r"c:\Users\Yash\Downloads\college_sahayak-main\website"

with open(os.path.join(base_dir, "template_parts.json"), "r", encoding="utf-8") as f:
    parts = json.load(f)

head = parts["head"]
nav = parts["nav"]
footer = parts["footer"]

def wrap_html(content, title="College Sahayak"):
    custom_head = head.replace("<title>College Sahayak - Your Diploma Studies, Simplified</title>", f"<title>{title}</title>")
    return f"""<!DOCTYPE html>
<html lang="en">
{custom_head}
<body>
    <div class="min-h-screen bg-white flex flex-col">
        {nav}
        <main class="flex-grow">
            {content}
        </main>
        {footer}
    </div>
    <script>
        document.addEventListener('DOMContentLoaded', () => {{
            if (window.lucide) window.lucide.createIcons();
        }});
    </script>
</body>
</html>"""

# 1. create login.html
login_content = """
<section class="py-16 bg-gray-50 flex items-center justify-center min-h-[calc(100vh-4rem)]">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div class="text-center mb-8">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i data-lucide="user" class="w-8 h-8 text-blue-600"></i>
            </div>
            <h2 class="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p class="text-gray-600 mt-2">Login to access your study materials</p>
        </div>
        
        <form class="space-y-6" onsubmit="event.preventDefault(); alert('Standard login demo. Please use Google Login.');">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input type="email" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors" placeholder="student@example.com" required>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input type="password" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors" placeholder="••••••••" required>
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                Sign In
            </button>
        </form>
        
        <div class="mt-8 relative flex items-center justify-center">
            <div class="border-t border-gray-200 w-full absolute"></div>
            <div class="bg-white px-4 text-sm text-gray-500 relative z-10">Or continue with</div>
        </div>
        
        <div class="mt-8">
            <button id="google-login-btn" class="w-full flex items-center justify-center space-x-2 bg-white border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                <svg class="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span>Google</span>
            </button>
        </div>
    </div>
</section>

<script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
    import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

    const firebaseConfig = {
      apiKey: "AIzaSyAgdOizGoIbNBpJIz3_JDeRSXc3-oNAfZs",
      authDomain: "internship-d773f.firebaseapp.com",
      projectId: "internship-d773f",
      storageBucket: "internship-d773f.firebasestorage.app",
      messagingSenderId: "803795620520",
      appId: "1:803795620520:web:9ff3d253b709a24fa6289d"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    document.getElementById('google-login-btn').addEventListener('click', () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                alert("Successfully logged in! Redirecting to home...");
                window.location.href = "index.html";
            }).catch((error) => {
                alert("Error during login: " + error.message);
            });
    });
</script>
"""
with open(os.path.join(base_dir, "login.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html(login_content, "Login - College Sahayak"))

# 2. create resources.html
resources_content = """
<section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h1 class="text-3xl sm:text-4xl font-bold text-gray-900" id="resource-title">Study Materials</h1>
            <p class="mt-4 text-lg text-gray-600">Select your branch, semester, and subject to download resources.</p>
        </div>

        <div class="bg-white rounded-2xl shadow-lg p-8 lg:p-12 border border-gray-100">
            <!-- Step 1: Choose Branch -->
            <div class="mb-8">
                <h3 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <span class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                    Choose Your Branch
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" id="branches-grid">
                    <!-- Populated by script.js -->
                </div>
            </div>

            <!-- Step 2: Choose Semester -->
            <div class="mb-8" id="semester-section" style="display: none;">
                <h3 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <span class="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                    Choose Your Semester
                </h3>
                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3" id="semesters-grid">
                    <!-- Populated by script.js -->
                </div>
            </div>

            <!-- Step 3: Show Materials Button -->
            <div class="text-center" id="show-materials-section" style="display: none;">
                <button id="show-materials-btn"
                    class="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-12 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                    View Resources
                    <i data-lucide="chevron-down" class="w-5 h-5 ml-2 inline"></i>
                </button>
            </div>
        </div>

        <!-- Download Results Section -->
        <div id="results-section" class="mt-12" style="display: none;">
            <h2 class="text-2xl font-bold text-gray-900 mb-6" id="results-title">Available Downloads</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="results-grid">
                <!-- Populated dynamically via JS -->
            </div>
        </div>
    </div>
</section>

<!-- Include script to populate branches/semesters -->
<script src="./static/js/const/script.js"></script>
<script>
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type') || 'materials';
    
    const formatTitle = (str) => {
        if(str === 'question_papers') return 'Question Papers';
        return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };
    
    document.getElementById('resource-title').textContent = formatTitle(type);

    const dummyData = {
        'syllabus': [
            { title: 'Core Mathematics Syllabus', type: 'PDF Document', size: '1.2 MB', icon: 'book' },
            { title: 'Programming Fundamentals', type: 'PDF Document', size: '2.5 MB', icon: 'book' },
            { title: 'Engineering Graphics', type: 'PDF Document', size: '3.1 MB', icon: 'book' }
        ],
        'lab-manuals': [
            { title: 'Physics Lab Experiments', type: 'Lab Manual', size: '4.5 MB', icon: 'flask-conical' },
            { title: 'C Programming Lab', type: 'Lab Code', size: '1.8 MB', icon: 'code' },
            { title: 'Chemistry Practicals Journal', type: 'Lab Manual', size: '5.2 MB', icon: 'flask-round' }
        ],
        'assignments': [
            { title: 'Maths Assignment 1: Calculus', type: 'Worksheet', size: '500 KB', icon: 'edit' },
            { title: 'C++ OOP Concepts Tasks', type: 'Problem Set', size: '800 KB', icon: 'file-code' },
            { title: 'Thermodynamics Practice', type: 'Assignment', size: '1.1 MB', icon: 'file-text' }
        ],
        'microprojects': [
            { title: 'IoT Weather Station', type: 'Project Guide', size: '3.5 MB', icon: 'cpu' },
            { title: 'Library Management System', type: 'Source Code', size: '2.1 MB', icon: 'database' },
            { title: 'Smart Energy Meter', type: 'Project Report', size: '4.8 MB', icon: 'zap' }
        ],
        'question_papers': [
            { title: 'Winter 2024 Exam Paper', type: 'Previous Paper', size: '2.3 MB', icon: 'file-question' },
            { title: 'Summer 2024 Exam Paper', type: 'Previous Paper', size: '2.1 MB', icon: 'file-question' },
            { title: 'Winter 2023 Exam Paper', type: 'Previous Paper', size: '2.4 MB', icon: 'file-question' }
        ]
    };

    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            const btn = document.getElementById('show-materials-btn');
            if (btn) {
                const newBtn = btn.cloneNode(true);
                btn.parentNode.replaceChild(newBtn, btn);
                
                newBtn.addEventListener('click', () => {
                    const resultsSection = document.getElementById('results-section');
                    const resultsGrid = document.getElementById('results-grid');
                    
                    resultsSection.style.display = 'block';
                    
                    const data = dummyData[type] || dummyData['syllabus'];
                    
                    resultsGrid.innerHTML = data.map(item => `
                        <div class="bg-white rounded-xl shadow-sm hover:shadow-xl p-6 border border-gray-100 transition-all transform hover:-translate-y-1">
                            <div class="flex items-start space-x-4 mb-4">
                                <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <i data-lucide="${item.icon}" class="w-6 h-6"></i>
                                </div>
                                <div>
                                    <h4 class="font-bold text-gray-900 leading-tight">${item.title}</h4>
                                    <p class="text-xs text-gray-500 mt-1">${item.type} • ${item.size}</p>
                                </div>
                            </div>
                            <button onclick="alert('Starting secure download for: ${item.title}')" class="w-full mt-2 bg-white hover:bg-blue-600 text-blue-600 hover:text-white font-semibold py-2 rounded-lg border border-blue-200 hover:border-transparent transition-all flex justify-center items-center">
                                <i data-lucide="download" class="w-4 h-4 mr-2"></i> Download
                            </button>
                        </div>
                    `).join('');
                    
                    if (window.lucide) window.lucide.createIcons();
                    
                    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            }
        }, 500); 
    });
</script>
"""
with open(os.path.join(base_dir, "resources.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html(resources_content, "Resources - College Sahayak"))

# 3. create about.html
about_content = """
<section class="py-20 bg-white">
    <div class="max-w-3xl mx-auto px-4 text-center">
        <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i data-lucide="info" class="w-10 h-10 text-blue-600"></i>
        </div>
        <h1 class="text-4xl font-bold text-gray-900 mb-6">About College Sahayak</h1>
        <p class="text-lg text-gray-600 leading-relaxed mb-8">
            College Sahayak is your dedicated platform for discovering, downloading, and sharing polytechnic resources. 
            Our mission is to simplify diploma studies for students in Maharashtra by providing a centralized hub for all 
            curriculum needs, from syllabus and lab manuals to previous year question papers.
        </p>
        <div class="flex justify-center gap-4">
            <a href="resources.html" class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 shadow-md transition-colors">Explore Resources</a>
            <a href="feedback.html" class="bg-white text-blue-600 border border-blue-200 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">Contact Us</a>
        </div>
    </div>
</section>
"""
with open(os.path.join(base_dir, "about.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html(about_content, "About Us - College Sahayak"))

# 4. create feedback.html
feedback_content = """
<section class="py-16 bg-gray-50 flex items-center justify-center min-h-[calc(100vh-4rem)]">
    <div class="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-100">
        <div class="text-center mb-10">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i data-lucide="message-square" class="w-8 h-8 text-green-600"></i>
            </div>
            <h2 class="text-3xl font-bold text-gray-900">We Value Your Feedback</h2>
            <p class="text-gray-600 mt-2">Help us improve College Sahayak by sharing your thoughts or reporting issues.</p>
        </div>
        
        <form class="space-y-6" onsubmit="event.preventDefault(); alert('Thank you! Your feedback has been submitted successfully.'); window.location.href='index.html';">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input type="text" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-colors" placeholder="John Doe" required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input type="email" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-colors" placeholder="student@example.com" required>
                </div>
            </div>
            
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Feedback Type</label>
                <select class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-colors bg-white">
                    <option>General Suggestion</option>
                    <option>Report a Bug/Issue</option>
                    <option>Request Study Material</option>
                    <option>Other</option>
                </select>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                <textarea rows="5" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-colors resize-none" placeholder="Tell us what you think..." required></textarea>
            </div>
            
            <button type="submit" class="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Submit Feedback
            </button>
        </form>
    </div>
</section>
"""
with open(os.path.join(base_dir, "feedback.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html(feedback_content, "Feedback - College Sahayak"))

print("Created login.html, resources.html, about.html, feedback.html")
