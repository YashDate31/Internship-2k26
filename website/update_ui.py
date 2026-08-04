import re

file_path = r"c:\Users\Yash\Downloads\college_sahayak-main\website\index.html"

with open(file_path, "r", encoding="utf-8") as f:
    html = f.read()

# Remove Django debug toolbar
# It starts around <link rel="stylesheet" href="./static/debug_toolbar/css/print.css"
start_str = '<link rel="stylesheet" href="./static/debug_toolbar/css/print.css"'
if start_str in html:
    html = html[:html.find(start_str)] + "</body>\n</html>"

# Replace login links
html = html.replace('href="/auth/register/"', 'href="#" id="login-btn"')
html = html.replace('href="/auth/register/"', 'href="#" id="mobile-login-btn"')

# Append Firebase script
firebase_script = """
<!-- Firebase Auth Script -->
<script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
    import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

    const firebaseConfig = {
      apiKey: "AIzaSyAgdOizGoIbNBpJIz3_JDeRSXc3-oNAfZs",
      authDomain: "internship-d773f.firebaseapp.com",
      projectId: "internship-d773f",
      storageBucket: "internship-d773f.firebasestorage.app",
      messagingSenderId: "803795620520",
      appId: "1:803795620520:web:9ff3d253b709a24fa6289d",
      measurementId: "G-YEBBCKNPPV"
    };

    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    function handleLogin(e) {
        if(e) e.preventDefault();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                alert("Successfully logged in as " + user.displayName + "!");
                // Optionally update UI here
                document.querySelectorAll('a[href="#"]').forEach(el => {
                    if(el.id === 'login-btn' || el.id === 'mobile-login-btn') {
                        el.innerHTML = '<i data-lucide="user" class="w-4 h-4"></i><span>' + user.displayName + '</span>';
                        if (window.lucide) window.lucide.createIcons();
                    }
                });
            }).catch((error) => {
                alert("Error during login: " + error.message);
            });
    }

    document.addEventListener("DOMContentLoaded", () => {
        const loginBtn = document.getElementById('login-btn');
        if(loginBtn) loginBtn.addEventListener('click', handleLogin);
        
        const mobileLoginBtn = document.getElementById('mobile-login-btn');
        if(mobileLoginBtn) mobileLoginBtn.addEventListener('click', handleLogin);
    });
</script>
</body>
</html>
"""

html = html.replace('</body>\n</html>', firebase_script)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(html)

print("index.html updated successfully.")
