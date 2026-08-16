import re

file_path = r"c:\Users\Yash\Downloads\college_sahayak-main\website\static\js\const\script.js"

with open(file_path, "r", encoding="utf-8") as f:
    js = f.read()

# Replace URLs in quickResources to '#'
js = re.sub(r"url:\s*'/[^']+'", "url: '#'", js)

# Let's add an event listener for clicks on these resources to show a demo alert
demo_alert_script = """
document.addEventListener('click', function(e) {
    // If clicking a link that is '#' and inside a resource card
    const link = e.target.closest('a[href="#"]');
    if (link && (link.closest('#quick-resources') || link.closest('#trending-materials') || link.closest('#official-updates'))) {
        e.preventDefault();
        alert('This is a static UI demo! Backend functionality (like downloading or viewing resources) is disabled.');
    }
});
"""

if "This is a static UI demo" not in js:
    js += "\n" + demo_alert_script

with open(file_path, "w", encoding="utf-8") as f:
    f.write(js)

print("script.js updated successfully.")
