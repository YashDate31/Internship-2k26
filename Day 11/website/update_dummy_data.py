import os
import re

base_dir = r"c:\Users\Yash\OneDrive\Desktop\Internship 2026\website"

data = {
    "assignments.html": [
        {"branch": "Computer Engg (CO)", "sem": "Sem 4", "sub": "Java Programming", "title": "Assignment 1: Multithreading", "desc": "Implement a traffic light simulation using Thread.sleep().", "result": "View Assignment", "icon": "file-text", "color": "blue"},
        {"branch": "Information Tech (IT)", "sem": "Sem 5", "sub": "Operating Systems", "title": "Assignment 3: CPU Scheduling", "desc": "Write a C program for FCFS scheduling.", "result": "View Assignment", "icon": "file-text", "color": "blue"},
        {"branch": "Civil Engg (CE)", "sem": "Sem 4", "sub": "Fluid Mechanics", "title": "Assignment 2: Bernoulli's Theorem", "desc": "Solve numericals based on Bernoulli's equation.", "result": "View Assignment", "icon": "file-text", "color": "blue"},
        {"branch": "Mechanical Engg (ME)", "sem": "Sem 3", "sub": "Strength of Materials", "title": "Assignment 4: Shear Force", "desc": "Draw SFD and BMD for given cantilever beams.", "result": "View Assignment", "icon": "file-text", "color": "blue"},
        {"branch": "Electrical Engg (EE)", "sem": "Sem 6", "sub": "Power Systems", "title": "Assignment 1: Fault Analysis", "desc": "Calculate symmetrical fault currents.", "result": "View Assignment", "icon": "file-text", "color": "blue"}
    ],
    "lab-manuals.html": [
        {"branch": "Computer Engg (CO)", "sem": "Sem 2", "sub": "C Programming", "title": "Lab Manual: C Programming", "desc": "Complete manual with 15 practicals.", "result": "Download PDF", "icon": "book", "color": "green"},
        {"branch": "Information Tech (IT)", "sem": "Sem 4", "sub": "Database Management", "title": "Lab Manual: DBMS", "desc": "SQL queries and normalization practicals.", "result": "Download PDF", "icon": "book", "color": "green"},
        {"branch": "Electrical Engg (EE)", "sem": "Sem 3", "sub": "Electrical Circuits", "title": "Lab Manual: Circuits", "desc": "KVL, KCL, and Thevenin's theorem.", "result": "Download PDF", "icon": "book", "color": "green"},
        {"branch": "Mechanical Engg (ME)", "sem": "Sem 5", "sub": "CNC Machines", "title": "Lab Manual: CNC", "desc": "Part programming and simulation.", "result": "Download PDF", "icon": "book", "color": "green"},
        {"branch": "Civil Engg (CE)", "sem": "Sem 3", "sub": "Surveying", "title": "Lab Manual: Surveying", "desc": "Chain surveying, leveling, and compass.", "result": "Download PDF", "icon": "book", "color": "green"}
    ],
    "microprojects.html": [
        {"branch": "Computer Engg (CO)", "sem": "Sem 6", "sub": "Web Development", "title": "Microproject: E-Commerce Site", "desc": "Full-stack project using HTML, CSS, JS and PHP.", "result": "View Details", "icon": "briefcase", "color": "purple"},
        {"branch": "Information Tech (IT)", "sem": "Sem 5", "sub": "Software Engineering", "title": "Microproject: SRS Document", "desc": "IEEE format SRS for a Hospital Management System.", "result": "View Details", "icon": "briefcase", "color": "purple"},
        {"branch": "Civil Engg (CE)", "sem": "Sem 6", "sub": "Estimation & Costing", "title": "Microproject: Building Estimate", "desc": "Detailed estimate of a G+1 residential building.", "result": "View Details", "icon": "briefcase", "color": "purple"},
        {"branch": "Mechanical Engg (ME)", "sem": "Sem 4", "sub": "Thermal Engg", "title": "Microproject: Heat Exchanger", "desc": "Design and analysis of a double pipe heat exchanger.", "result": "View Details", "icon": "briefcase", "color": "purple"},
        {"branch": "Electronics (EJ)", "sem": "Sem 5", "sub": "Embedded Systems", "title": "Microproject: Smart Dustbin", "desc": "Arduino based smart dustbin using ultrasonic sensor.", "result": "View Details", "icon": "briefcase", "color": "purple"}
    ],
    "syllabus.html": [
        {"branch": "Computer Engg (CO)", "sem": "Sem 1", "sub": "Basic Science", "title": "Syllabus: Basic Physics & Chemistry", "desc": "I-Scheme Curriculum for Semester 1.", "result": "Download Syllabus", "icon": "file", "color": "orange"},
        {"branch": "Information Tech (IT)", "sem": "Sem 3", "sub": "Data Structures", "title": "Syllabus: Data Structures using C", "desc": "I-Scheme Curriculum for Semester 3.", "result": "Download Syllabus", "icon": "file", "color": "orange"},
        {"branch": "Electrical Engg (EE)", "sem": "Sem 5", "sub": "Power Systems", "title": "Syllabus: Switchgear & Protection", "desc": "I-Scheme Curriculum for Semester 5.", "result": "Download Syllabus", "icon": "file", "color": "orange"},
        {"branch": "Civil Engg (CE)", "sem": "Sem 2", "sub": "Applied Mechanics", "title": "Syllabus: Applied Mechanics", "desc": "I-Scheme Curriculum for Semester 2.", "result": "Download Syllabus", "icon": "file", "color": "orange"},
        {"branch": "Mechanical Engg (ME)", "sem": "Sem 6", "sub": "Automobile Engg", "title": "Syllabus: Automobile Engineering", "desc": "I-Scheme Curriculum for Semester 6.", "result": "Download Syllabus", "icon": "file", "color": "orange"}
    ]
}

def generate_html(items):
    html = '<ul class="divide-y divide-gray-100 space-y-4">\n'
    for item in items:
        color = item["color"]
        html += f'''
        <li class="p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-{color}-50/50 transition-colors border-l-4 border-l-{color}-500 bg-white rounded-xl shadow-sm border border-gray-100 mb-4">
            <div class="flex items-start space-x-4">
                <div class="w-12 h-12 rounded-lg bg-{color}-100 text-{color}-600 flex items-center justify-center shrink-0 shadow-inner">
                    <i data-lucide="{item['icon']}" class="w-6 h-6"></i>
                </div>
                <div>
                    <div class="flex flex-wrap items-center gap-2 mb-2">
                        <span class="px-2 py-0.5 bg-gray-100 text-gray-700 text-[11px] font-bold uppercase tracking-wider rounded shadow-sm border border-gray-200">Branch: {item['branch']}</span>
                        <span class="px-2 py-0.5 bg-gray-100 text-gray-700 text-[11px] font-bold uppercase tracking-wider rounded shadow-sm border border-gray-200">Sem: {item['sem']}</span>
                        <span class="px-2 py-0.5 bg-gray-100 text-gray-700 text-[11px] font-bold uppercase tracking-wider rounded shadow-sm border border-gray-200">Sub: {item['sub']}</span>
                    </div>
                    <h3 class="font-bold text-lg text-gray-900 leading-tight">{item['title']}</h3>
                    <p class="text-sm text-gray-500 mt-1">{item['desc']}</p>
                </div>
            </div>
            <div class="mt-4 md:mt-0 flex flex-col md:items-end w-full md:w-auto">
                <a href="#" class="w-full md:w-auto bg-{color}-600 hover:bg-{color}-700 text-white font-medium px-6 py-2 rounded-lg shadow-sm transition-colors text-center flex items-center justify-center">
                    <i data-lucide="download" class="w-4 h-4 mr-2"></i> {item['result']}
                </a>
            </div>
        </li>
        '''
    html += '</ul>\n'
    return html

for filename, items in data.items():
    filepath = os.path.join(base_dir, filename)
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_html = generate_html(items)
    
    if filename == "syllabus.html":
        # Syllabus uses a different structure
        pattern = r'<div class="space-y-6 relative before:absolute[^>]*>.*?</div>\s*</div>\s*</main>'
        replacement = f'<div class="w-full">\n{new_html}\n</div>\n</div>\n</main>'
        new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    else:
        # Others use ul divide-y
        pattern = r'<div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">\s*<ul class="divide-y divide-gray-100">.*?</ul>\s*</div>'
        replacement = f'<div class="bg-transparent overflow-hidden">\n{new_html}\n</div>'
        new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Updated {filename}")
