import os
import re

base_dir = r"c:\Users\Yash\Downloads\college_sahayak-main\website"
html_files = [f for f in os.listdir(base_dir) if f.endswith('.html')]

# The new nav and script from profile.html
with open(os.path.join(base_dir, "profile.html"), "r", encoding="utf-8") as f:
    prof_html = f.read()
    nav_match = re.search(r"(<nav.*?</nav>)", prof_html, re.DOTALL)
    new_nav = nav_match.group(1) if nav_match else ""
    
    script_match = re.search(r"(<script>.*?DOMContentLoaded.*?cs_user.*?</script>)", prof_html, re.DOTALL)
    new_script = script_match.group(1) if script_match else ""

for file in html_files:
    if file == "profile.html": continue # Already correct
    
    filepath = os.path.join(base_dir, file)
    with open(filepath, "r", encoding="utf-8") as f:
        html = f.read()
    
    # Replace nav
    html = re.sub(r"<nav.*?</nav>", new_nav, html, flags=re.DOTALL)
    
    # Inject script if not present
    if "cs_user" not in html and new_script:
        html = html.replace("</head>", new_script + "\n</head>")
        
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(html)

print("Updated nav across all HTML files")
