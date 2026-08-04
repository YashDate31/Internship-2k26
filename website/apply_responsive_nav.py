import os
import re

base_dir = r"c:\Users\Yash\Downloads\college_sahayak-main\website"
html_files = [f for f in os.listdir(base_dir) if f.endswith('.html')]

new_nav = """<nav class="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center space-x-2">
                        <div class="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                            <i data-lucide="book-open" class="w-5 h-5 text-white"></i>
                        </div>
                        <span class="text-xl font-bold text-gray-900">College Sahayak</span>
                    </div>
                    
                    <!-- Desktop Menu -->
                    <div class="hidden md:flex items-center space-x-6">
                        <a href="index.html" class="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center space-x-1"><span>Home</span></a>
                        <a href="discover.html" class="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center space-x-1"><i data-lucide="compass" class="w-4 h-4"></i><span>Discover</span></a>
                        <a href="resources.html" class="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center space-x-1"><i data-lucide="book-open" class="w-4 h-4"></i><span>Resources</span></a>
                        <a href="blog.html" class="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center space-x-1"><i data-lucide="pen-tool" class="w-4 h-4"></i><span>Blog</span></a>
                        <a href="login.html" id="nav-auth-btn" class="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center space-x-1"><i data-lucide="log-in" class="w-4 h-4"></i><span id="nav-auth-text">Login</span></a>
                        <a href="about.html" class="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center space-x-1"><i data-lucide="info" class="w-4 h-4"></i><span>About Us</span></a>
                        <a href="feedback.html" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-1"><i data-lucide="message-square" class="w-4 h-4"></i><span>Contact</span></a>
                    </div>

                    <!-- Mobile menu button -->
                    <div class="md:hidden flex items-center">
                        <button type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none" onclick="toggleMobileMenu()">
                            <i data-lucide="menu" class="block h-6 w-6"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Full-Screen Mobile Menu (Responsive Overlay) -->
            <div class="md:hidden hidden fixed inset-0 bg-white z-[9998] flex-col justify-center items-center" id="mobile-menu">
                <button onclick="toggleMobileMenu()" class="absolute top-6 right-6 text-gray-500 hover:text-gray-900 focus:outline-none p-2 bg-gray-100 rounded-full">
                    <i data-lucide="x" class="w-6 h-6"></i>
                </button>
                <div class="flex flex-col space-y-8 text-center w-full px-8">
                    <a href="index.html" class="block text-2xl font-semibold text-gray-800 hover:text-blue-600">Home</a>
                    <a href="discover.html" class="block text-2xl font-semibold text-gray-800 hover:text-blue-600">Discover</a>
                    <a href="resources.html" class="block text-2xl font-semibold text-gray-800 hover:text-blue-600">Resources</a>
                    <a href="blog.html" class="block text-2xl font-semibold text-gray-800 hover:text-blue-600">Blog</a>
                    <a href="login.html" id="mobile-auth-btn" class="block text-2xl font-semibold text-gray-800 hover:text-blue-600">Login / Profile</a>
                    <a href="about.html" class="block text-2xl font-semibold text-gray-800 hover:text-blue-600">About Us</a>
                    <a href="feedback.html" class="block text-xl font-semibold text-white bg-blue-600 rounded-full py-4 mt-4 shadow-lg">Contact Us</a>
                </div>
            </div>
        </nav>"""

new_script = """<script>
        document.addEventListener('DOMContentLoaded', () => {
            if (window.lucide) window.lucide.createIcons();
            
            // Auth State Logic
            const userStr = localStorage.getItem('cs_user');
            if (userStr) {
                const user = JSON.parse(userStr);
                
                // Desktop Auth Button
                const authBtn = document.getElementById('nav-auth-btn');
                if (authBtn) {
                    authBtn.href = 'profile.html';
                    authBtn.innerHTML = `<img src="${user.photoURL || 'https://via.placeholder.com/32'}" class="w-6 h-6 rounded-full border border-gray-300"> <span class="ml-2 font-semibold text-blue-600">${user.displayName}</span>`;
                }
                
                // Mobile Auth Button
                const mobileAuthBtn = document.getElementById('mobile-auth-btn');
                if (mobileAuthBtn) {
                    mobileAuthBtn.href = 'profile.html';
                    mobileAuthBtn.innerText = 'My Profile';
                }
            }
        });

        function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            if (menu.classList.contains('hidden')) {
                menu.classList.remove('hidden');
                menu.classList.add('flex');
                document.body.style.overflow = 'hidden';
                if (window.lucide) window.lucide.createIcons();
            } else {
                menu.classList.add('hidden');
                menu.classList.remove('flex');
                document.body.style.overflow = 'auto';
            }
        }
    </script>"""

for file in html_files:
    filepath = os.path.join(base_dir, file)
    with open(filepath, "r", encoding="utf-8") as f:
        html = f.read()
    
    # 1. Replace the entire <nav> block
    html = re.sub(r"<nav.*?</nav>", new_nav, html, flags=re.DOTALL)
    
    # 2. Replace the old scripts with the unified new script block
    # Remove the old DOMContentLoaded script if it exists
    html = re.sub(r"<script>\s*document\.addEventListener\('DOMContentLoaded'.*?</script>", "", html, flags=re.DOTALL)
    
    # Insert new script right before </body>
    if "toggleMobileMenu" not in html:
        html = html.replace("</body>", new_script + "\n</body>")
        
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(html)

print("Applied responsive full-screen mobile nav and fixed toggle behavior across all pages.")
