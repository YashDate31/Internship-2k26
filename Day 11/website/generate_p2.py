import json
import os

base_dir = r"c:\Users\Yash\Downloads\college_sahayak-main\website"

with open(os.path.join(base_dir, "template_parts.json"), "r", encoding="utf-8") as f:
    parts = json.load(f)

head = parts["head"]

# The nav from template_parts.json might be old, let's load the generated nav from profile.html
# to ensure it has the new "Discover" and "Blog" links.
with open(os.path.join(base_dir, "profile.html"), "r", encoding="utf-8") as f:
    html = f.read()
    import re
    nav_match = re.search(r"(<nav.*?</nav>)", html, re.DOTALL)
    nav = nav_match.group(1) if nav_match else parts["nav"]
    
    # Extract auth script from head as well
    auth_script_match = re.search(r"(<script>.*?DOMContentLoaded.*?cs_user.*?</script>)", html, re.DOTALL)
    if auth_script_match:
        head = head.replace("</head>", auth_script_match.group(1) + "\n</head>")

footer = parts["footer"]

def wrap_html(content, title="College Sahayak"):
    custom_head = head.replace("<title>College Sahayak - Your Diploma Studies, Simplified</title>", f"<title>{title}</title>")
    return f"""<!DOCTYPE html>
<html lang="en">
{custom_head}
<body>
    <div class="min-h-screen bg-gray-50 flex flex-col">
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
# 5. syllabus.html (Accordion/Timeline UI)
# -----------------
syllabus_content = """
<div class="max-w-4xl mx-auto px-4 py-12">
    <div class="flex items-center space-x-4 mb-8">
        <div class="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg"><i data-lucide="book-open" class="w-8 h-8"></i></div>
        <div>
            <h1 class="text-3xl font-bold text-gray-900">Computer Engineering Syllabus</h1>
            <p class="text-gray-500">Semester 4 • 2025 Revised Curriculum</p>
        </div>
    </div>
    
    <!-- Timeline / Accordion UI -->
    <div class="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
        
        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div class="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-100 text-blue-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <i data-lucide="code" class="w-5 h-5"></i>
            </div>
            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 class="font-bold text-lg text-gray-900">Data Structures in C++</h3>
                <p class="text-gray-600 text-sm mt-2">Pointers, Linked Lists, Stacks, Queues, and Tree traversing algorithms.</p>
                <div class="mt-4 flex gap-2">
                    <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded font-medium">Credits: 4</span>
                    <button onclick="alert('Downloading DS Syllabus...')" class="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded font-bold hover:bg-blue-100">Download PDF</button>
                </div>
            </div>
        </div>

        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div class="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-green-100 text-green-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <i data-lucide="database" class="w-5 h-5"></i>
            </div>
            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 class="font-bold text-lg text-gray-900">Database Management</h3>
                <p class="text-gray-600 text-sm mt-2">ER Models, Relational Algebra, SQL queries, and Normalization techniques.</p>
                <div class="mt-4 flex gap-2">
                    <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded font-medium">Credits: 4</span>
                    <button onclick="alert('Downloading DBMS Syllabus...')" class="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded font-bold hover:bg-blue-100">Download PDF</button>
                </div>
            </div>
        </div>
        
    </div>
</div>
"""
with open(os.path.join(base_dir, "syllabus.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html(syllabus_content, "Syllabus"))

# -----------------
# 6. lab-manuals.html (Split Journal View)
# -----------------
lab_content = """
<div class="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8">
    <div class="w-full lg:w-1/3">
        <h1 class="text-2xl font-bold text-gray-900 mb-6"><i data-lucide="flask-conical" class="inline w-6 h-6 mr-2 text-green-600"></i>Lab Manuals</h1>
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-2 overflow-y-auto max-h-[70vh]">
            <button class="w-full text-left p-4 rounded-xl bg-green-50 border border-green-200 mb-2 hover:bg-green-100 transition-colors">
                <h3 class="font-bold text-green-900">Exp 1: Logic Gates</h3>
                <p class="text-xs text-green-700 mt-1">Digital Electronics • Completed</p>
            </button>
            <button class="w-full text-left p-4 rounded-xl bg-white border border-gray-100 mb-2 hover:bg-gray-50 transition-colors">
                <h3 class="font-bold text-gray-900">Exp 2: Multiplexers</h3>
                <p class="text-xs text-gray-500 mt-1">Digital Electronics • Pending</p>
            </button>
        </div>
    </div>
    <div class="w-full lg:w-2/3">
        <div class="bg-white rounded-2xl shadow-lg border border-gray-200 h-[80vh] flex flex-col overflow-hidden relative">
            <div class="bg-gray-900 text-white p-4 flex justify-between items-center">
                <span class="font-mono text-sm">journal_viewer.pdf</span>
                <div class="flex space-x-3 text-gray-400">
                    <i data-lucide="zoom-in" class="w-5 h-5 hover:text-white cursor-pointer"></i>
                    <i data-lucide="download" class="w-5 h-5 hover:text-white cursor-pointer" onclick="alert('Downloading manual...')"></i>
                </div>
            </div>
            <div class="flex-grow bg-gray-100 p-8 overflow-y-auto">
                <div class="bg-white shadow-md max-w-2xl mx-auto aspect-[1/1.4] p-12 relative">
                    <div class="border-b-2 border-black pb-4 mb-8 text-center">
                        <h2 class="text-xl font-bold uppercase tracking-widest">Experiment No. 1</h2>
                        <h1 class="text-3xl font-serif mt-2">Study of Basic Logic Gates</h1>
                    </div>
                    <h3 class="font-bold text-lg mb-2">1. Objective:</h3>
                    <p class="text-gray-700 mb-6 font-serif">To verify the truth tables of AND, OR, NOT, NAND, NOR, EX-OR, and EX-NOR gates.</p>
                    <h3 class="font-bold text-lg mb-2">2. Apparatus:</h3>
                    <ul class="list-disc list-inside text-gray-700 font-serif mb-6 space-y-1">
                        <li>Digital IC Trainer Kit</li>
                        <li>ICs: 7408, 7432, 7404, 7400, 7402, 7486</li>
                        <li>Connecting wires</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
"""
with open(os.path.join(base_dir, "lab-manuals.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html(lab_content, "Lab Manuals"))

# -----------------
# 7. assignments.html (Task List UI)
# -----------------
assign_content = """
<div class="max-w-5xl mx-auto px-4 py-12">
    <div class="flex justify-between items-end mb-8">
        <div>
            <h1 class="text-3xl font-bold text-gray-900">Assignments</h1>
            <p class="text-gray-500 mt-2">Manage your submissions and deadlines.</p>
        </div>
        <div class="flex gap-2">
            <select class="border border-gray-300 rounded-lg px-4 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"><option>All Subjects</option></select>
            <select class="border border-gray-300 rounded-lg px-4 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"><option>Pending First</option></select>
        </div>
    </div>
    
    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <ul class="divide-y divide-gray-100">
            <!-- Assignment Item -->
            <li class="p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-gray-50 transition-colors">
                <div class="flex items-start space-x-4">
                    <div class="w-12 h-12 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                        <i data-lucide="alert-circle" class="w-6 h-6"></i>
                    </div>
                    <div>
                        <h3 class="font-bold text-lg text-gray-900">DBMS Schema Design</h3>
                        <p class="text-sm text-gray-500 mt-1">Database Management • 20 Points</p>
                        <div class="flex items-center mt-2 text-xs font-semibold text-red-600">
                            <i data-lucide="clock" class="w-4 h-4 mr-1"></i> Due Tomorrow, 11:59 PM
                        </div>
                    </div>
                </div>
                <div class="mt-4 md:mt-0 flex flex-col md:items-end">
                    <button onclick="alert('Opening upload modal...')" class="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-lg shadow-sm transition-colors mb-2">Submit Work</button>
                    <a href="#" class="text-xs text-purple-600 font-semibold hover:underline">Download Question PDF</a>
                </div>
            </li>
            
            <!-- Assignment Item -->
            <li class="p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-gray-50 transition-colors opacity-75">
                <div class="flex items-start space-x-4">
                    <div class="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                        <i data-lucide="check-circle" class="w-6 h-6"></i>
                    </div>
                    <div>
                        <h3 class="font-bold text-lg text-gray-900">C++ Inheritance Programs</h3>
                        <p class="text-sm text-gray-500 mt-1">Data Structures • 15 Points</p>
                        <div class="flex items-center mt-2 text-xs font-semibold text-green-600">
                            Submitted on Feb 10, 2025
                        </div>
                    </div>
                </div>
                <div class="mt-4 md:mt-0 flex flex-col md:items-end">
                    <button disabled class="bg-gray-100 text-gray-400 font-medium px-6 py-2 rounded-lg shadow-sm cursor-not-allowed mb-2">Submitted</button>
                    <a href="#" class="text-xs text-gray-500 font-semibold hover:underline">View Submission</a>
                </div>
            </li>
        </ul>
    </div>
</div>
"""
with open(os.path.join(base_dir, "assignments.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html(assign_content, "Assignments"))

# -----------------
# 8. microprojects.html (Gallery)
# -----------------
micro_content = """
<div class="max-w-7xl mx-auto px-4 py-12">
    <div class="text-center mb-12">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-4">Micro-Project Gallery</h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">Explore top-rated diploma projects with source code and reports.</p>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Project Card -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
            <div class="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 relative overflow-hidden">
                <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                    <i data-lucide="cpu" class="w-20 h-20 text-white opacity-80 group-hover:scale-110 transition-transform"></i>
                </div>
                <span class="absolute top-4 right-4 bg-white/20 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-bold">Hard</span>
            </div>
            <div class="p-6">
                <div class="flex gap-2 mb-3">
                    <span class="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded font-bold">IoT</span>
                    <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded font-bold">C++</span>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Smart Weather Station</h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">An Arduino-based weather station measuring temp, humidity, and uploading to ThingSpeak.</p>
                <div class="flex gap-2">
                    <button onclick="alert('Downloading Code...')" class="flex-1 bg-gray-900 text-white py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors">Get Code</button>
                    <button onclick="alert('Downloading Report...')" class="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">Report</button>
                </div>
            </div>
        </div>
        
        <!-- Project Card -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
            <div class="h-48 bg-gradient-to-br from-teal-400 to-blue-500 relative overflow-hidden">
                <div class="absolute inset-0 flex items-center justify-center">
                    <i data-lucide="database" class="w-20 h-20 text-white opacity-80 group-hover:scale-110 transition-transform"></i>
                </div>
                <span class="absolute top-4 right-4 bg-white/20 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-bold">Medium</span>
            </div>
            <div class="p-6">
                <div class="flex gap-2 mb-3">
                    <span class="px-2 py-1 bg-orange-50 text-orange-600 text-xs rounded font-bold">Java</span>
                    <span class="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded font-bold">MySQL</span>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Library Management GUI</h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">A desktop Java application using Swing and MySQL for tracking book issues and returns.</p>
                <div class="flex gap-2">
                    <button onclick="alert('Downloading Code...')" class="flex-1 bg-gray-900 text-white py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors">Get Code</button>
                    <button onclick="alert('Downloading Report...')" class="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">Report</button>
                </div>
            </div>
        </div>
    </div>
</div>
"""
with open(os.path.join(base_dir, "microprojects.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html(micro_content, "Micro-Projects"))

# -----------------
# 9. question_papers.html (Data Table UI)
# -----------------
papers_content = """
<div class="max-w-6xl mx-auto px-4 py-12">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
            <h1 class="text-3xl font-bold text-gray-900">Question Papers Archives</h1>
            <p class="text-gray-500 mt-2">Filter and download previous MSBTE exam papers.</p>
        </div>
        <div class="mt-4 md:mt-0 flex bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
            <input type="text" placeholder="Search subject code..." class="px-4 py-2 border-none outline-none text-sm w-48">
            <button class="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"><i data-lucide="search" class="w-4 h-4"></i></button>
        </div>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider border-b border-gray-200">
                        <th class="px-6 py-4 font-semibold">Subject</th>
                        <th class="px-6 py-4 font-semibold">Code</th>
                        <th class="px-6 py-4 font-semibold">Season</th>
                        <th class="px-6 py-4 font-semibold text-right">Action</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    <tr class="hover:bg-blue-50/50 transition-colors group">
                        <td class="px-6 py-4 font-medium text-gray-900">Operating Systems</td>
                        <td class="px-6 py-4 text-gray-500 font-mono">22516</td>
                        <td class="px-6 py-4"><span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">Winter 2024</span></td>
                        <td class="px-6 py-4 text-right">
                            <button onclick="alert('Downloading W24 OS Paper...')" class="text-blue-600 hover:text-white border border-blue-600 hover:bg-blue-600 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all shadow-sm group-hover:shadow">Download</button>
                        </td>
                    </tr>
                    <tr class="hover:bg-blue-50/50 transition-colors group">
                        <td class="px-6 py-4 font-medium text-gray-900">Software Engineering</td>
                        <td class="px-6 py-4 text-gray-500 font-mono">22413</td>
                        <td class="px-6 py-4"><span class="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded">Summer 2024</span></td>
                        <td class="px-6 py-4 text-right">
                            <button onclick="alert('Downloading S24 SE Paper...')" class="text-blue-600 hover:text-white border border-blue-600 hover:bg-blue-600 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all shadow-sm group-hover:shadow">Download</button>
                        </td>
                    </tr>
                    <tr class="hover:bg-blue-50/50 transition-colors group">
                        <td class="px-6 py-4 font-medium text-gray-900">Java Programming</td>
                        <td class="px-6 py-4 text-gray-500 font-mono">22412</td>
                        <td class="px-6 py-4"><span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">Winter 2023</span></td>
                        <td class="px-6 py-4 text-right">
                            <button onclick="alert('Downloading W23 Java Paper...')" class="text-blue-600 hover:text-white border border-blue-600 hover:bg-blue-600 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all shadow-sm group-hover:shadow">Download</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
"""
with open(os.path.join(base_dir, "question_papers.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html(papers_content, "Question Papers"))

print("Generated individual UI pages: syllabus, lab-manuals, assignments, microprojects, question_papers")
