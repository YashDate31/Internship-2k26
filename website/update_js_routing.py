import re

file_path = r"c:\Users\Yash\Downloads\college_sahayak-main\website\static\js\const\script.js"

with open(file_path, "r", encoding="utf-8") as f:
    js = f.read()

# Update URLs in quickResources to point to resources.html
js = re.sub(r"url:\s*'#'", r"url: 'resources.html?type=materials'", js)
js = js.replace("url: '/syllabus/'", "url: 'resources.html?type=syllabus'")
js = js.replace("url: '/lab-manuals/'", "url: 'resources.html?type=lab-manuals'")
js = js.replace("url: '/assignments/'", "url: 'resources.html?type=assignments'")
js = js.replace("url: '/microprojects/'", "url: 'resources.html?type=microprojects'")
js = js.replace("url: '/question_papers/'", "url: 'resources.html?type=question_papers'")

# Remove the previously added demo alert script for "#" links since they are now real links
alert_script = """document.addEventListener('click', function(e) {
    // If clicking a link that is '#' and inside a resource card
    const link = e.target.closest('a[href="#"]');
    if (link && (link.closest('#quick-resources') || link.closest('#trending-materials') || link.closest('#official-updates'))) {
        e.preventDefault();
        alert('This is a static UI demo! Backend functionality (like downloading or viewing resources) is disabled.');
    }
});"""

if alert_script in js:
    js = js.replace(alert_script, "")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(js)

print("script.js updated to route to resources.html")
