import re

file_path = r"c:\Users\Yash\Downloads\college_sahayak-main\website\index.html"

with open(file_path, "r", encoding="utf-8") as f:
    html = f.read()

# Remove the Firebase auth script I appended earlier
firebase_str = "<!-- Firebase Auth Script -->"
if firebase_str in html:
    html = html[:html.find(firebase_str)] + "</body>\n</html>"

# Fix navigation links in both desktop and mobile nav
html = html.replace('href="#" id="login-btn"', 'href="login.html" id="login-btn"')
html = html.replace('href="#" id="mobile-login-btn"', 'href="login.html" id="mobile-login-btn"')
html = html.replace('href="/resources/"', 'href="resources.html"')
html = html.replace('href="/about/"', 'href="about.html"')
html = html.replace('href="/auth/register/"', 'href="login.html"')
html = html.replace('href="https://forms.gle/HF3F7P3pX3hvGSX4A"', 'href="feedback.html"')

# We also need to extract the base head, nav, and footer to use in other pages
head_match = re.search(r"(<head>.*?</head>)", html, re.DOTALL)
head_content = head_match.group(1) if head_match else ""

nav_match = re.search(r"(<nav.*?</nav>)", html, re.DOTALL)
nav_content = nav_match.group(1) if nav_match else ""

footer_match = re.search(r"(<footer.*?</footer>)", html, re.DOTALL)
footer_content = footer_match.group(1) if footer_match else ""

with open(file_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Updated index.html")

# Write template parts to a temporary file for the next script to use
with open(r"c:\Users\Yash\Downloads\college_sahayak-main\website\template_parts.json", "w", encoding="utf-8") as f:
    import json
    json.dump({
        "head": head_content,
        "nav": nav_content,
        "footer": footer_content
    }, f)
