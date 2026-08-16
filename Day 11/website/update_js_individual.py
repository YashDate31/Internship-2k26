import re
import os

file_path = r"c:\Users\Yash\Downloads\college_sahayak-main\website\static\js\const\script.js"

with open(file_path, "r", encoding="utf-8") as f:
    js = f.read()

# Update URLs in quickResources to point to individual UI pages
js = re.sub(r"url:\s*'resources.html\?type=materials'", r"url: 'syllabus.html'", js)
js = js.replace("url: 'resources.html?type=syllabus'", "url: 'syllabus.html'")
js = js.replace("url: 'resources.html?type=lab-manuals'", "url: 'lab-manuals.html'")
js = js.replace("url: 'resources.html?type=assignments'", "url: 'assignments.html'")
js = js.replace("url: 'resources.html?type=microprojects'", "url: 'microprojects.html'")
js = js.replace("url: 'resources.html?type=question_papers'", "url: 'question_papers.html'")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(js)

print("script.js updated to route to individual pages")
