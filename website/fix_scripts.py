import os
import re

base_dir = r"c:\Users\Yash\Downloads\college_sahayak-main\website"
html_files = [f for f in os.listdir(base_dir) if f.endswith('.html')]

auth_and_icons_script = """
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            if (window.lucide) {
                window.lucide.createIcons();
            }
            
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
            if (menu) {
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
        }
    </script>
"""

for file in html_files:
    filepath = os.path.join(base_dir, file)
    with open(filepath, "r", encoding="utf-8") as f:
        html = f.read()
        
    # Remove any existing toggleMobileMenu scripts so we don't duplicate
    html = re.sub(r"<script>\s*document\.addEventListener\('DOMContentLoaded'.*?function toggleMobileMenu.*?</script>", "", html, flags=re.DOTALL)
    
    # Also look for any partial ones
    html = re.sub(r"<script>.*?toggleMobileMenu.*?</script>", "", html, flags=re.DOTALL)
    
    # Now safely inject at the end of the body
    if "</body>" in html:
        html = html.replace("</body>", auth_and_icons_script + "</body>")
        
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(html)

print("Fixed scripts on all pages.")
