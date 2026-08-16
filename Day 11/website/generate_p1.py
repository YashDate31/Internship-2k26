import json
import os
import re

base_dir = r"c:\Users\Yash\Downloads\college_sahayak-main\website"

with open(os.path.join(base_dir, "template_parts.json"), "r", encoding="utf-8") as f:
    parts = json.load(f)

head = parts["head"]
nav = parts["nav"]
footer = parts["footer"]

# 1. Update Nav with Discover, Blog, and Profile logic
new_nav_links = """
                        <a href="index.html" class="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center space-x-1"><span>Home</span></a>
                        <a href="discover.html" class="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center space-x-1"><i data-lucide="compass" class="w-4 h-4"></i><span>Discover</span></a>
                        <a href="resources.html" class="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center space-x-1"><i data-lucide="book-open" class="w-4 h-4"></i><span>Resources</span></a>
                        <a href="blog.html" class="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center space-x-1"><i data-lucide="pen-tool" class="w-4 h-4"></i><span>Blog</span></a>
                        <a href="login.html" id="nav-auth-btn" class="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center space-x-1"><i data-lucide="log-in" class="w-4 h-4"></i><span id="nav-auth-text">Login</span></a>
                        <a href="about.html" class="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center space-x-1"><i data-lucide="info" class="w-4 h-4"></i><span>About Us</span></a>
                        <a href="feedback.html" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-1"><i data-lucide="message-square" class="w-4 h-4"></i><span>Contact</span></a>
"""
# Replace the desktop links in nav
nav = re.sub(r'<div class="flex items-center space-x-6">.*?</div>', 
             f'<div class="flex items-center space-x-6">{new_nav_links}</div>', nav, flags=re.DOTALL)

# Add auth state script to head
auth_script = """
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const userStr = localStorage.getItem('cs_user');
            if (userStr) {
                const user = JSON.parse(userStr);
                const authBtns = document.querySelectorAll('#nav-auth-btn');
                authBtns.forEach(btn => {
                    btn.href = 'profile.html';
                    btn.innerHTML = `<img src="${user.photoURL || 'https://via.placeholder.com/32'}" class="w-6 h-6 rounded-full border border-gray-300"> <span class="ml-2 font-semibold text-blue-600">${user.displayName}</span>`;
                });
            }
        });
    </script>
"""
head = head.replace("</head>", auth_script + "\n</head>")

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

# -----------------
# Task 2: profile.html
# -----------------
profile_content = """
<section class="py-12 bg-gray-50 min-h-screen">
    <div class="max-w-5xl mx-auto px-4">
        <!-- Profile Header -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8 flex items-center space-x-6 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50"></div>
            <img id="prof-pic" src="https://via.placeholder.com/100" class="w-24 h-24 rounded-full shadow-md z-10 border-4 border-white">
            <div class="z-10">
                <h1 id="prof-name" class="text-3xl font-bold text-gray-900">Student Name</h1>
                <p id="prof-email" class="text-gray-500 mt-1">student@example.com</p>
                <div class="mt-3 flex space-x-2">
                    <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Computer Eng.</span>
                    <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Semester 4</span>
                </div>
            </div>
            <div class="ml-auto z-10">
                <button onclick="logout()" class="flex items-center space-x-2 px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg font-medium transition-colors">
                    <i data-lucide="log-out" class="w-4 h-4"></i>
                    <span>Sign Out</span>
                </button>
            </div>
        </div>

        <!-- Dashboard Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left col: Stats & Quick Links -->
            <div class="space-y-8">
                <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 class="font-bold text-gray-900 mb-4 flex items-center"><i data-lucide="bar-chart-2" class="w-5 h-5 text-blue-500 mr-2"></i> Your Stats</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="p-4 bg-gray-50 rounded-xl text-center">
                            <p class="text-2xl font-bold text-gray-900">12</p>
                            <p class="text-xs text-gray-500 uppercase font-semibold">Downloads</p>
                        </div>
                        <div class="p-4 bg-gray-50 rounded-xl text-center">
                            <p class="text-2xl font-bold text-gray-900">5</p>
                            <p class="text-xs text-gray-500 uppercase font-semibold">Saved Items</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right col: Saved & Recent -->
            <div class="lg:col-span-2 space-y-8">
                <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 class="font-bold text-gray-900 mb-6 flex items-center"><i data-lucide="bookmark" class="w-5 h-5 text-orange-500 mr-2"></i> Saved Materials</h3>
                    <div class="space-y-4">
                        <div class="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                            <div class="flex items-center space-x-4">
                                <div class="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center"><i data-lucide="file-text" class="w-5 h-5"></i></div>
                                <div>
                                    <h4 class="font-semibold text-gray-900">OOP with C++ Notes</h4>
                                    <p class="text-xs text-gray-500">Computer Eng. • Sem 3</p>
                                </div>
                            </div>
                            <button class="text-blue-600 hover:bg-blue-50 p-2 rounded-lg"><i data-lucide="download" class="w-5 h-5"></i></button>
                        </div>
                        <div class="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                            <div class="flex items-center space-x-4">
                                <div class="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center"><i data-lucide="flask-conical" class="w-5 h-5"></i></div>
                                <div>
                                    <h4 class="font-semibold text-gray-900">Database Management Lab Manual</h4>
                                    <p class="text-xs text-gray-500">Computer Eng. • Sem 4</p>
                                </div>
                            </div>
                            <button class="text-blue-600 hover:bg-blue-50 p-2 rounded-lg"><i data-lucide="download" class="w-5 h-5"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<script>
    document.addEventListener('DOMContentLoaded', () => {
        const userStr = localStorage.getItem('cs_user');
        if (!userStr) {
            window.location.href = 'login.html';
        } else {
            const user = JSON.parse(userStr);
            document.getElementById('prof-name').textContent = user.displayName || 'Student';
            document.getElementById('prof-email').textContent = user.email || '';
            if(user.photoURL) document.getElementById('prof-pic').src = user.photoURL;
        }
    });

    function logout() {
        localStorage.removeItem('cs_user');
        window.location.href = 'index.html';
    }
</script>
"""
with open(os.path.join(base_dir, "profile.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html(profile_content, "My Profile"))

# -----------------
# Task 3: blog.html
# -----------------
blog_content = """
<section class="py-16 bg-white min-h-screen">
    <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-16">
            <h1 class="text-4xl font-extrabold text-gray-900 mb-4">College Sahayak Blog</h1>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">Insights, study tips, and updates for polytechnic students.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Blog Card 1 -->
            <article class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div class="h-48 bg-blue-100 flex items-center justify-center">
                    <i data-lucide="book-open" class="w-16 h-16 text-blue-500 opacity-50"></i>
                </div>
                <div class="p-6">
                    <span class="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2 block">Study Tips</span>
                    <h2 class="text-xl font-bold text-gray-900 mb-3 leading-tight">How to Ace Your Final Semester Exams in 30 Days</h2>
                    <p class="text-gray-600 mb-4 line-clamp-3">A comprehensive guide on time management, priority subjects, and past paper analysis to ensure you score top marks.</p>
                    <div class="flex items-center text-sm text-gray-500 font-medium">
                        <i data-lucide="calendar" class="w-4 h-4 mr-2"></i> Feb 12, 2025
                    </div>
                </div>
            </article>
            
            <!-- Blog Card 2 -->
            <article class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div class="h-48 bg-purple-100 flex items-center justify-center">
                    <i data-lucide="briefcase" class="w-16 h-16 text-purple-500 opacity-50"></i>
                </div>
                <div class="p-6">
                    <span class="text-xs font-bold tracking-widest text-purple-600 uppercase mb-2 block">Career</span>
                    <h2 class="text-xl font-bold text-gray-900 mb-3 leading-tight">Top 5 Programming Languages to Learn After Polytechnic</h2>
                    <p class="text-gray-600 mb-4 line-clamp-3">Future-proof your career by picking up these highly demanded programming languages that tech companies are looking for.</p>
                    <div class="flex items-center text-sm text-gray-500 font-medium">
                        <i data-lucide="calendar" class="w-4 h-4 mr-2"></i> Feb 08, 2025
                    </div>
                </div>
            </article>
            
            <!-- Blog Card 3 -->
            <article class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div class="h-48 bg-green-100 flex items-center justify-center">
                    <i data-lucide="cpu" class="w-16 h-16 text-green-500 opacity-50"></i>
                </div>
                <div class="p-6">
                    <span class="text-xs font-bold tracking-widest text-green-600 uppercase mb-2 block">Projects</span>
                    <h2 class="text-xl font-bold text-gray-900 mb-3 leading-tight">10 Best Micro-Project Ideas for Computer Engineers</h2>
                    <p class="text-gray-600 mb-4 line-clamp-3">Stuck on what to build for your final semester? Here are 10 unique and impactful project ideas that will impress your professors.</p>
                    <div class="flex items-center text-sm text-gray-500 font-medium">
                        <i data-lucide="calendar" class="w-4 h-4 mr-2"></i> Jan 29, 2025
                    </div>
                </div>
            </article>
        </div>
    </div>
</section>
"""
with open(os.path.join(base_dir, "blog.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html(blog_content, "Blog"))

# -----------------
# Task 4: discover.html (Styled Wireframe)
# -----------------
discover_content = """
<section class="bg-white border-b border-gray-200 py-10">
    <div class="max-w-7xl mx-auto px-4 text-center">
        <h1 class="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Discover the Best Resources for Your <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Academic Success</span></h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-8">Access a curated collection of study materials, career guidance, and expert advice to excel in your academic journey.</p>
        
        <div class="max-w-xl mx-auto flex items-center bg-white border-2 border-gray-200 rounded-full p-1 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition-all mb-8">
            <i data-lucide="search" class="w-5 h-5 text-gray-400 ml-4"></i>
            <input type="text" class="flex-grow bg-transparent border-none focus:ring-0 px-4 py-2 outline-none text-gray-700" placeholder="Search for resources, guides...">
            <button class="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors">Search</button>
        </div>
        
        <div class="flex flex-wrap justify-center gap-3">
            <button class="px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold shadow-md">All Resources</button>
            <button class="px-5 py-2 bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600 rounded-full text-sm font-medium transition-colors">Education</button>
            <button class="px-5 py-2 bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600 rounded-full text-sm font-medium transition-colors">Tech Support</button>
            <button class="px-5 py-2 bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600 rounded-full text-sm font-medium transition-colors">Mentorship</button>
            <button class="px-5 py-2 bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600 rounded-full text-sm font-medium transition-colors">Tech</button>
            <button class="px-5 py-2 bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600 rounded-full text-sm font-medium transition-colors">Career</button>
        </div>
    </div>
</section>

<section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 space-y-16">
        
        <!-- Category: Best Colleges -->
        <div>
            <div class="flex items-center space-x-3 mb-6 border-l-4 border-blue-500 pl-4">
                <h2 class="text-2xl font-bold text-gray-900">Best Colleges</h2>
                <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold uppercase tracking-wider">Education</span>
            </div>
            <p class="text-gray-600 mb-6">Discover the best colleges tailored to your ambitions. Explore in-depth insights, rankings, and everything you need to make the right decision for your future.</p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all group">
                    <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><i data-lucide="building" class="w-6 h-6"></i></div>
                    <h3 class="font-bold text-lg text-gray-900 mb-2">Top Engineering Colleges in Pune</h3>
                    <a href="#" class="text-blue-600 font-semibold text-sm flex items-center mt-4">View Guide <i data-lucide="arrow-right" class="w-4 h-4 ml-1"></i></a>
                </div>
            </div>
        </div>

        <!-- Category: AI Generated Content -->
        <div>
            <div class="flex items-center space-x-3 mb-6 border-l-4 border-green-500 pl-4">
                <h2 class="text-2xl font-bold text-gray-900">AI Generated Content</h2>
                <span class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold uppercase tracking-wider">Tech Support</span>
            </div>
            <p class="text-gray-600 mb-6">Facing tech challenges? We've got you covered! From troubleshooting to tools, our support ensures a seamless learning experience.</p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all group">
                    <div class="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><i data-lucide="bot" class="w-6 h-6"></i></div>
                    <h3 class="font-bold text-lg text-gray-900 mb-2">Automated Code Debugging Tools</h3>
                    <a href="#" class="text-green-600 font-semibold text-sm flex items-center mt-4">Use Tools <i data-lucide="arrow-right" class="w-4 h-4 ml-1"></i></a>
                </div>
            </div>
        </div>

        <!-- Category: Expert Advice -->
        <div>
            <div class="flex items-center space-x-3 mb-6 border-l-4 border-purple-500 pl-4">
                <h2 class="text-2xl font-bold text-gray-900">Expert Advice</h2>
                <span class="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-bold uppercase tracking-wider">Mentorship</span>
            </div>
            <p class="text-gray-600 mb-6">Get guidance from seasoned professionals and alumni to navigate your academic journey. Your roadmap to success starts here.</p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all group">
                    <div class="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><i data-lucide="users" class="w-6 h-6"></i></div>
                    <h3 class="font-bold text-lg text-gray-900 mb-2">1-on-1 Alumni Mentorship Program</h3>
                    <a href="#" class="text-purple-600 font-semibold text-sm flex items-center mt-4">Book Session <i data-lucide="arrow-right" class="w-4 h-4 ml-1"></i></a>
                </div>
            </div>
        </div>

        <!-- Add more categories mirroring the wireframe ... -->
        <div class="text-center mt-12">
            <button class="bg-gray-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors shadow-lg">Load More Resources</button>
        </div>

    </div>
</section>
"""
with open(os.path.join(base_dir, "discover.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html(discover_content, "Discover"))
