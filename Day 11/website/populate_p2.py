import re
import os

base_dir = r"c:\Users\Yash\Downloads\college_sahayak-main\website"

def inject_main_content(filename, new_content):
    filepath = os.path.join(base_dir, filename)
    with open(filepath, "r", encoding="utf-8") as f:
        html = f.read()
    new_html = re.sub(r'(<main class="flex-grow">)(.*?)(</main>)', rf'\1\n{new_content}\n\3', html, flags=re.DOTALL)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_html)

# 3. Assignments Dummy Data
assign_content = """
<div class="max-w-5xl mx-auto px-4 py-12">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
            <h1 class="text-3xl font-bold text-gray-900">Assignments Dashboard</h1>
            <p class="text-gray-500 mt-2">Manage your submissions, track deadlines, and view grades.</p>
        </div>
        <div class="flex flex-wrap gap-2">
            <select class="border border-gray-300 rounded-lg px-4 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm font-medium">
                <option>All Subjects</option>
                <option>Java Programming</option>
                <option>Database Management</option>
                <option>Operating System</option>
            </select>
            <select class="border border-gray-300 rounded-lg px-4 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm font-medium">
                <option>Pending First</option>
                <option>Due Date</option>
                <option>Completed</option>
            </select>
        </div>
    </div>
    
    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <ul class="divide-y divide-gray-100">
            
            <!-- Assignment Item: Overdue -->
            <li class="p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-red-50/30 transition-colors border-l-4 border-l-red-500">
                <div class="flex items-start space-x-4">
                    <div class="w-12 h-12 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0 shadow-inner">
                        <i data-lucide="alert-triangle" class="w-6 h-6"></i>
                    </div>
                    <div>
                        <div class="flex items-center gap-2 mb-1">
                            <span class="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] uppercase font-bold tracking-wider rounded">Operating System</span>
                            <span class="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] uppercase font-bold tracking-wider rounded">Overdue</span>
                        </div>
                        <h3 class="font-bold text-lg text-gray-900 leading-tight">CPU Scheduling Algorithms Code</h3>
                        <p class="text-sm text-gray-500 mt-1">Implement FCFS and SJF in C++.</p>
                        <div class="flex items-center mt-2 text-xs font-bold text-red-600">
                            <i data-lucide="clock" class="w-4 h-4 mr-1"></i> Due Yesterday, 11:59 PM • 20 Points
                        </div>
                    </div>
                </div>
                <div class="mt-4 md:mt-0 flex flex-col md:items-end w-full md:w-auto">
                    <button class="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-lg shadow-sm transition-colors mb-2">Submit Late</button>
                    <a href="#" class="text-xs text-purple-600 font-bold hover:underline flex items-center"><i data-lucide="download" class="w-3 h-3 mr-1"></i> Download PDF</a>
                </div>
            </li>

            <!-- Assignment Item: Pending/Due Soon -->
            <li class="p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-gray-50 transition-colors border-l-4 border-l-orange-500">
                <div class="flex items-start space-x-4">
                    <div class="w-12 h-12 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 shadow-inner">
                        <i data-lucide="clock" class="w-6 h-6"></i>
                    </div>
                    <div>
                        <div class="flex items-center gap-2 mb-1">
                            <span class="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] uppercase font-bold tracking-wider rounded">Database Management</span>
                            <span class="px-2 py-0.5 bg-orange-100 text-orange-700 text-[10px] uppercase font-bold tracking-wider rounded">Pending</span>
                        </div>
                        <h3 class="font-bold text-lg text-gray-900 leading-tight">ER Model & Normalization Forms</h3>
                        <p class="text-sm text-gray-500 mt-1">Draw ER diagram for Library System and normalize to 3NF.</p>
                        <div class="flex items-center mt-2 text-xs font-bold text-orange-600">
                            <i data-lucide="clock" class="w-4 h-4 mr-1"></i> Due Today, 5:00 PM • 15 Points
                        </div>
                    </div>
                </div>
                <div class="mt-4 md:mt-0 flex flex-col md:items-end w-full md:w-auto">
                    <button class="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-lg shadow-sm transition-colors mb-2">Submit Work</button>
                    <a href="#" class="text-xs text-purple-600 font-bold hover:underline flex items-center"><i data-lucide="download" class="w-3 h-3 mr-1"></i> Download PDF</a>
                </div>
            </li>

            <!-- Assignment Item: Pending -->
            <li class="p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-gray-50 transition-colors border-l-4 border-l-blue-500">
                <div class="flex items-start space-x-4">
                    <div class="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-inner">
                        <i data-lucide="file-text" class="w-6 h-6"></i>
                    </div>
                    <div>
                        <div class="flex items-center gap-2 mb-1">
                            <span class="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] uppercase font-bold tracking-wider rounded">Java Programming</span>
                            <span class="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] uppercase font-bold tracking-wider rounded">Pending</span>
                        </div>
                        <h3 class="font-bold text-lg text-gray-900 leading-tight">Multithreading Mini-Project</h3>
                        <p class="text-sm text-gray-500 mt-1">Implement a traffic light simulation using Thread.sleep().</p>
                        <div class="flex items-center mt-2 text-xs font-bold text-blue-600">
                            <i data-lucide="calendar" class="w-4 h-4 mr-1"></i> Due Next Monday, 11:59 PM • 25 Points
                        </div>
                    </div>
                </div>
                <div class="mt-4 md:mt-0 flex flex-col md:items-end w-full md:w-auto">
                    <button class="w-full md:w-auto border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-medium px-6 py-2 rounded-lg transition-colors mb-2 bg-white">Upload Code</button>
                    <a href="#" class="text-xs text-purple-600 font-bold hover:underline flex items-center"><i data-lucide="download" class="w-3 h-3 mr-1"></i> Question File</a>
                </div>
            </li>

            <!-- Assignment Item: Submitted/Graded -->
            <li class="p-6 flex flex-col md:flex-row md:items-center justify-between bg-gray-50/50 hover:bg-gray-50 transition-colors border-l-4 border-l-green-500 opacity-80">
                <div class="flex items-start space-x-4">
                    <div class="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center shrink-0 shadow-inner">
                        <i data-lucide="check-circle" class="w-6 h-6"></i>
                    </div>
                    <div>
                        <div class="flex items-center gap-2 mb-1">
                            <span class="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] uppercase font-bold tracking-wider rounded">Software Engineering</span>
                            <span class="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] uppercase font-bold tracking-wider rounded">Graded</span>
                        </div>
                        <h3 class="font-bold text-lg text-gray-900 leading-tight">Write SRS Document</h3>
                        <p class="text-sm text-gray-500 mt-1">Write an IEEE format SRS for a Hospital Management System.</p>
                        <div class="flex items-center mt-2 text-xs font-bold text-green-600">
                            Submitted on Feb 10 • Grade: 18/20
                        </div>
                    </div>
                </div>
                <div class="mt-4 md:mt-0 flex flex-col md:items-end w-full md:w-auto">
                    <button disabled class="w-full md:w-auto bg-gray-200 text-gray-500 font-medium px-6 py-2 rounded-lg cursor-not-allowed mb-2">Graded</button>
                    <a href="#" class="text-xs text-gray-500 font-bold hover:underline flex items-center"><i data-lucide="eye" class="w-3 h-3 mr-1"></i> View Submission</a>
                </div>
            </li>

            <!-- Assignment Item: Submitted/Pending Grade -->
            <li class="p-6 flex flex-col md:flex-row md:items-center justify-between bg-gray-50/50 hover:bg-gray-50 transition-colors border-l-4 border-l-teal-500 opacity-90">
                <div class="flex items-start space-x-4">
                    <div class="w-12 h-12 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center shrink-0 shadow-inner">
                        <i data-lucide="upload-cloud" class="w-6 h-6"></i>
                    </div>
                    <div>
                        <div class="flex items-center gap-2 mb-1">
                            <span class="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] uppercase font-bold tracking-wider rounded">Computer Networks</span>
                            <span class="px-2 py-0.5 bg-teal-100 text-teal-700 text-[10px] uppercase font-bold tracking-wider rounded">Turned In</span>
                        </div>
                        <h3 class="font-bold text-lg text-gray-900 leading-tight">Cisco Packet Tracer Topology</h3>
                        <p class="text-sm text-gray-500 mt-1">Design a LAN network connecting 3 departments using switches.</p>
                        <div class="flex items-center mt-2 text-xs font-bold text-teal-600">
                            Submitted on Feb 14 • Pending Review
                        </div>
                    </div>
                </div>
                <div class="mt-4 md:mt-0 flex flex-col md:items-end w-full md:w-auto">
                    <button class="w-full md:w-auto border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium px-6 py-2 rounded-lg shadow-sm transition-colors mb-2">Unsubmit</button>
                    <a href="#" class="text-xs text-teal-600 font-bold hover:underline flex items-center"><i data-lucide="eye" class="w-3 h-3 mr-1"></i> View File</a>
                </div>
            </li>
        </ul>
    </div>
</div>
"""
inject_main_content('assignments.html', assign_content)

# 4. Micro-Projects Dummy Data
micro_content = """
<div class="max-w-7xl mx-auto px-4 py-12">
    <div class="text-center mb-12">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Micro-Project Gallery</h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">Explore high-scoring diploma projects with full source code, reports, and PPTs.</p>
        
        <div class="mt-8 flex flex-wrap justify-center gap-2">
            <span class="px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-bold shadow cursor-pointer">All Domains</span>
            <span class="px-4 py-2 bg-white border border-gray-200 text-gray-600 hover:border-gray-400 rounded-full text-sm font-medium cursor-pointer transition">Java</span>
            <span class="px-4 py-2 bg-white border border-gray-200 text-gray-600 hover:border-gray-400 rounded-full text-sm font-medium cursor-pointer transition">Python</span>
            <span class="px-4 py-2 bg-white border border-gray-200 text-gray-600 hover:border-gray-400 rounded-full text-sm font-medium cursor-pointer transition">Web Dev</span>
            <span class="px-4 py-2 bg-white border border-gray-200 text-gray-600 hover:border-gray-400 rounded-full text-sm font-medium cursor-pointer transition">IoT / Hardware</span>
        </div>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        <!-- Project 1 -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group flex flex-col">
            <div class="h-40 bg-gradient-to-br from-indigo-500 to-purple-600 relative overflow-hidden flex-shrink-0">
                <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                    <i data-lucide="cpu" class="w-16 h-16 text-white opacity-90 group-hover:scale-110 transition-transform"></i>
                </div>
                <span class="absolute top-3 right-3 bg-red-500 text-white px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow">Hard</span>
            </div>
            <div class="p-5 flex flex-col flex-grow">
                <div class="flex gap-1.5 mb-3">
                    <span class="px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 text-[10px] rounded uppercase font-bold tracking-wide">IoT</span>
                    <span class="px-2 py-0.5 bg-gray-100 text-gray-700 border border-gray-200 text-[10px] rounded uppercase font-bold tracking-wide">C++ / Arduino</span>
                </div>
                <h3 class="text-lg font-bold text-gray-900 mb-2 leading-tight">Smart Weather Station</h3>
                <p class="text-gray-600 text-sm mb-5 flex-grow">Arduino-based weather station measuring temp & humidity. Uploads live data to ThingSpeak cloud dashboard.</p>
                <div class="flex flex-col gap-2 mt-auto">
                    <button class="w-full bg-gray-900 text-white py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors shadow">Download Source Code</button>
                    <div class="flex gap-2">
                        <button class="flex-1 border border-gray-300 text-gray-700 py-1.5 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors">📄 Report</button>
                        <button class="flex-1 border border-gray-300 text-gray-700 py-1.5 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors">📊 PPT</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Project 2 -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group flex flex-col">
            <div class="h-40 bg-gradient-to-br from-teal-400 to-emerald-500 relative overflow-hidden flex-shrink-0">
                <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-20"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                    <i data-lucide="database" class="w-16 h-16 text-white opacity-90 group-hover:scale-110 transition-transform"></i>
                </div>
                <span class="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow">Medium</span>
            </div>
            <div class="p-5 flex flex-col flex-grow">
                <div class="flex gap-1.5 mb-3">
                    <span class="px-2 py-0.5 bg-orange-50 text-orange-700 border border-orange-100 text-[10px] rounded uppercase font-bold tracking-wide">Java GUI</span>
                    <span class="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 text-[10px] rounded uppercase font-bold tracking-wide">MySQL</span>
                </div>
                <h3 class="text-lg font-bold text-gray-900 mb-2 leading-tight">Library Management System</h3>
                <p class="text-gray-600 text-sm mb-5 flex-grow">Desktop Java application using Swing and JDBC to track book issues, returns, and student records.</p>
                <div class="flex flex-col gap-2 mt-auto">
                    <button class="w-full bg-gray-900 text-white py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors shadow">Download Source Code</button>
                    <div class="flex gap-2">
                        <button class="flex-1 border border-gray-300 text-gray-700 py-1.5 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors">📄 Report</button>
                        <button class="flex-1 border border-gray-300 text-gray-700 py-1.5 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors">📊 PPT</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Project 3 -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group flex flex-col">
            <div class="h-40 bg-gradient-to-br from-pink-500 to-rose-500 relative overflow-hidden flex-shrink-0">
                <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                    <i data-lucide="layout" class="w-16 h-16 text-white opacity-90 group-hover:scale-110 transition-transform"></i>
                </div>
                <span class="absolute top-3 right-3 bg-green-500 text-white px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow">Easy</span>
            </div>
            <div class="p-5 flex flex-col flex-grow">
                <div class="flex gap-1.5 mb-3">
                    <span class="px-2 py-0.5 bg-pink-50 text-pink-700 border border-pink-100 text-[10px] rounded uppercase font-bold tracking-wide">Web Dev</span>
                    <span class="px-2 py-0.5 bg-purple-50 text-purple-700 border border-purple-100 text-[10px] rounded uppercase font-bold tracking-wide">HTML/CSS</span>
                </div>
                <h3 class="text-lg font-bold text-gray-900 mb-2 leading-tight">College Fest Portfolio Website</h3>
                <p class="text-gray-600 text-sm mb-5 flex-grow">A responsive static landing page for a college tech-fest with smooth scrolling and animations.</p>
                <div class="flex flex-col gap-2 mt-auto">
                    <button class="w-full bg-gray-900 text-white py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors shadow">Download Source Code</button>
                    <div class="flex gap-2">
                        <button class="flex-1 border border-gray-300 text-gray-700 py-1.5 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors">📄 Report</button>
                        <button class="flex-1 border border-gray-300 text-gray-700 py-1.5 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors">📊 PPT</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Project 4 -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group flex flex-col">
            <div class="h-40 bg-gradient-to-br from-blue-600 to-cyan-500 relative overflow-hidden flex-shrink-0">
                <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/axiom-pattern.png')] opacity-30"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                    <i data-lucide="shield" class="w-16 h-16 text-white opacity-90 group-hover:scale-110 transition-transform"></i>
                </div>
                <span class="absolute top-3 right-3 bg-red-500 text-white px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow">Hard</span>
            </div>
            <div class="p-5 flex flex-col flex-grow">
                <div class="flex gap-1.5 mb-3">
                    <span class="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 text-[10px] rounded uppercase font-bold tracking-wide">Python</span>
                    <span class="px-2 py-0.5 bg-gray-100 text-gray-700 border border-gray-200 text-[10px] rounded uppercase font-bold tracking-wide">AI/ML</span>
                </div>
                <h3 class="text-lg font-bold text-gray-900 mb-2 leading-tight">Face Recognition Attendance</h3>
                <p class="text-gray-600 text-sm mb-5 flex-grow">Python script using OpenCV and face_recognition to mark attendance in an Excel sheet automatically.</p>
                <div class="flex flex-col gap-2 mt-auto">
                    <button class="w-full bg-gray-900 text-white py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors shadow">Download Source Code</button>
                    <div class="flex gap-2">
                        <button class="flex-1 border border-gray-300 text-gray-700 py-1.5 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors">📄 Report</button>
                        <button class="flex-1 border border-gray-300 text-gray-700 py-1.5 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors">📊 PPT</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
"""
inject_main_content('microprojects.html', micro_content)
