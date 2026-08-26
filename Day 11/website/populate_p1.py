import re
import os

base_dir = r"c:\Users\Yash\Downloads\college_sahayak-main\website"

def inject_main_content(filename, new_content):
    filepath = os.path.join(base_dir, filename)
    with open(filepath, "r", encoding="utf-8") as f:
        html = f.read()
    
    # Replace everything inside <main class="flex-grow"> ... </main>
    # Note: re.DOTALL is needed so .* matches newlines
    new_html = re.sub(r'(<main class="flex-grow">)(.*?)(</main>)', rf'\1\n{new_content}\n\3', html, flags=re.DOTALL)
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_html)

# 1. Syllabus Dummy Data
syllabus_content = """
<div class="max-w-4xl mx-auto px-4 py-12">
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div class="flex items-center space-x-4">
            <div class="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg"><i data-lucide="book-open" class="w-8 h-8"></i></div>
            <div>
                <h1 class="text-3xl font-bold text-gray-900">Computer Engineering Syllabus</h1>
                <p class="text-gray-500">2025 Revised Curriculum (I-Scheme)</p>
            </div>
        </div>
        <select class="border border-gray-300 rounded-lg px-4 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold shadow-sm">
            <option>Semester 1</option>
            <option>Semester 2</option>
            <option>Semester 3</option>
            <option selected>Semester 4</option>
            <option>Semester 5</option>
            <option>Semester 6</option>
        </select>
    </div>
    
    <!-- Timeline / Accordion UI -->
    <div class="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
        
        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div class="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-100 text-blue-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <i data-lucide="code" class="w-5 h-5"></i>
            </div>
            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 class="font-bold text-lg text-gray-900">Java Programming (22412)</h3>
                <p class="text-gray-600 text-sm mt-2">Object-oriented concepts, exception handling, multithreading, and AWT/Swing basics.</p>
                <div class="mt-4 flex flex-wrap gap-2">
                    <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded font-medium">Credits: 4</span>
                    <span class="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded font-medium">Theory: 70 marks</span>
                    <button class="px-3 py-1 bg-gray-900 text-white text-xs rounded font-bold hover:bg-gray-800 transition">Download PDF</button>
                </div>
            </div>
        </div>

        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div class="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-green-100 text-green-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <i data-lucide="database" class="w-5 h-5"></i>
            </div>
            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 class="font-bold text-lg text-gray-900">Data Structures using C (22317)</h3>
                <p class="text-gray-600 text-sm mt-2">Pointers, Linked Lists, Stacks, Queues, and Tree traversing algorithms.</p>
                <div class="mt-4 flex flex-wrap gap-2">
                    <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded font-medium">Credits: 4</span>
                    <span class="px-2 py-1 bg-green-50 text-green-600 text-xs rounded font-medium">Theory: 70 marks</span>
                    <button class="px-3 py-1 bg-gray-900 text-white text-xs rounded font-bold hover:bg-gray-800 transition">Download PDF</button>
                </div>
            </div>
        </div>

        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div class="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-purple-100 text-purple-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <i data-lucide="monitor" class="w-5 h-5"></i>
            </div>
            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 class="font-bold text-lg text-gray-900">Operating System (22516)</h3>
                <p class="text-gray-600 text-sm mt-2">Process management, memory management, file systems, and scheduling algorithms.</p>
                <div class="mt-4 flex flex-wrap gap-2">
                    <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded font-medium">Credits: 4</span>
                    <span class="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded font-medium">Theory: 70 marks</span>
                    <button class="px-3 py-1 bg-gray-900 text-white text-xs rounded font-bold hover:bg-gray-800 transition">Download PDF</button>
                </div>
            </div>
        </div>

        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div class="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-red-100 text-red-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <i data-lucide="server" class="w-5 h-5"></i>
            </div>
            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 class="font-bold text-lg text-gray-900">Computer Networks (22417)</h3>
                <p class="text-gray-600 text-sm mt-2">OSI model, TCP/IP, IP addressing, subnetting, and routing protocols.</p>
                <div class="mt-4 flex flex-wrap gap-2">
                    <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded font-medium">Credits: 4</span>
                    <span class="px-2 py-1 bg-red-50 text-red-600 text-xs rounded font-medium">Theory: 70 marks</span>
                    <button class="px-3 py-1 bg-gray-900 text-white text-xs rounded font-bold hover:bg-gray-800 transition">Download PDF</button>
                </div>
            </div>
        </div>

        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div class="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-yellow-100 text-yellow-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <i data-lucide="layers" class="w-5 h-5"></i>
            </div>
            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 class="font-bold text-lg text-gray-900">Software Engineering (22413)</h3>
                <p class="text-gray-600 text-sm mt-2">SDLC models, agile methodology, requirement engineering, and software testing.</p>
                <div class="mt-4 flex flex-wrap gap-2">
                    <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded font-medium">Credits: 3</span>
                    <span class="px-2 py-1 bg-yellow-50 text-yellow-600 text-xs rounded font-medium">Theory: 70 marks</span>
                    <button class="px-3 py-1 bg-gray-900 text-white text-xs rounded font-bold hover:bg-gray-800 transition">Download PDF</button>
                </div>
            </div>
        </div>
        
    </div>
</div>
"""
inject_main_content('syllabus.html', syllabus_content)

# 2. Lab Manuals Dummy Data
lab_content = """
<div class="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8">
    <!-- Left Sidebar: Experiments List -->
    <div class="w-full lg:w-1/3">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-gray-900"><i data-lucide="flask-conical" class="inline w-6 h-6 mr-2 text-green-600"></i>Lab Manuals</h1>
            <select class="border border-gray-300 rounded text-xs px-2 py-1 bg-white font-semibold outline-none"><option>Java (22412)</option><option>Data Structures (22317)</option></select>
        </div>
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-2 overflow-y-auto max-h-[75vh] custom-scrollbar">
            <button class="w-full text-left p-4 rounded-xl bg-green-50 border border-green-200 mb-2 hover:bg-green-100 transition-colors">
                <div class="flex justify-between items-start">
                    <h3 class="font-bold text-green-900 text-sm">Exp 1: Install JDK & Write First Java Program</h3>
                    <i data-lucide="check-circle" class="w-4 h-4 text-green-600"></i>
                </div>
                <p class="text-xs text-green-700 mt-1">Java Programming • Completed</p>
            </button>
            <button class="w-full text-left p-4 rounded-xl bg-green-50 border border-green-200 mb-2 hover:bg-green-100 transition-colors">
                <div class="flex justify-between items-start">
                    <h3 class="font-bold text-green-900 text-sm">Exp 2: Implement Classes and Objects</h3>
                    <i data-lucide="check-circle" class="w-4 h-4 text-green-600"></i>
                </div>
                <p class="text-xs text-green-700 mt-1">Java Programming • Completed</p>
            </button>
            <button class="w-full text-left p-4 rounded-xl bg-blue-50 border border-blue-200 mb-2 shadow-sm transition-colors relative overflow-hidden">
                <div class="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                <div class="flex justify-between items-start">
                    <h3 class="font-bold text-blue-900 text-sm">Exp 3: Constructor Overloading</h3>
                    <i data-lucide="clock" class="w-4 h-4 text-blue-600"></i>
                </div>
                <p class="text-xs text-blue-700 mt-1">Java Programming • In Progress</p>
            </button>
            <button class="w-full text-left p-4 rounded-xl bg-white border border-gray-100 mb-2 hover:bg-gray-50 transition-colors">
                <h3 class="font-bold text-gray-900 text-sm">Exp 4: Single Inheritance in Java</h3>
                <p class="text-xs text-gray-500 mt-1">Java Programming • Pending</p>
            </button>
            <button class="w-full text-left p-4 rounded-xl bg-white border border-gray-100 mb-2 hover:bg-gray-50 transition-colors">
                <h3 class="font-bold text-gray-900 text-sm">Exp 5: Multilevel & Hierarchical Inheritance</h3>
                <p class="text-xs text-gray-500 mt-1">Java Programming • Pending</p>
            </button>
            <button class="w-full text-left p-4 rounded-xl bg-white border border-gray-100 mb-2 hover:bg-gray-50 transition-colors">
                <h3 class="font-bold text-gray-900 text-sm">Exp 6: Interfaces and Packages</h3>
                <p class="text-xs text-gray-500 mt-1">Java Programming • Pending</p>
            </button>
            <button class="w-full text-left p-4 rounded-xl bg-white border border-gray-100 mb-2 hover:bg-gray-50 transition-colors">
                <h3 class="font-bold text-gray-900 text-sm">Exp 7: Exception Handling (Try, Catch, Finally)</h3>
                <p class="text-xs text-gray-500 mt-1">Java Programming • Pending</p>
            </button>
            <button class="w-full text-left p-4 rounded-xl bg-white border border-gray-100 mb-2 hover:bg-gray-50 transition-colors">
                <h3 class="font-bold text-gray-900 text-sm">Exp 8: Multithreading (Thread Class)</h3>
                <p class="text-xs text-gray-500 mt-1">Java Programming • Pending</p>
            </button>
            <button class="w-full text-left p-4 rounded-xl bg-white border border-gray-100 mb-2 hover:bg-gray-50 transition-colors">
                <h3 class="font-bold text-gray-900 text-sm">Exp 9: Applet Lifecycle</h3>
                <p class="text-xs text-gray-500 mt-1">Java Programming • Pending</p>
            </button>
            <button class="w-full text-left p-4 rounded-xl bg-white border border-gray-100 mb-2 hover:bg-gray-50 transition-colors">
                <h3 class="font-bold text-gray-900 text-sm">Exp 10: Simple AWT Application</h3>
                <p class="text-xs text-gray-500 mt-1">Java Programming • Pending</p>
            </button>
        </div>
    </div>
    
    <!-- Right Sidebar: Journal Viewer -->
    <div class="w-full lg:w-2/3">
        <div class="bg-white rounded-2xl shadow-lg border border-gray-200 h-[80vh] flex flex-col overflow-hidden relative">
            <div class="bg-gray-900 text-white p-4 flex justify-between items-center">
                <div class="flex items-center space-x-2">
                    <i data-lucide="file-text" class="w-4 h-4 text-gray-400"></i>
                    <span class="font-mono text-sm tracking-wider">java_exp3_constructors.pdf</span>
                </div>
                <div class="flex space-x-4 text-gray-400">
                    <button class="hover:text-white transition"><i data-lucide="zoom-out" class="w-5 h-5"></i></button>
                    <span class="text-sm font-mono">100%</span>
                    <button class="hover:text-white transition"><i data-lucide="zoom-in" class="w-5 h-5"></i></button>
                    <div class="w-px h-5 bg-gray-700 mx-2"></div>
                    <button class="hover:text-white transition flex items-center"><i data-lucide="download" class="w-5 h-5 mr-1"></i> <span class="text-xs font-bold uppercase tracking-wider">Download</span></button>
                </div>
            </div>
            
            <div class="flex-grow bg-gray-200 p-8 overflow-y-auto">
                <div class="bg-white shadow-xl max-w-3xl mx-auto min-h-full p-12 relative font-serif text-gray-900 border border-gray-100">
                    <div class="border-b-2 border-black pb-4 mb-8 text-center">
                        <h2 class="text-lg font-bold uppercase tracking-widest text-gray-500">Experiment No. 3</h2>
                        <h1 class="text-3xl font-bold mt-2">Constructor Overloading in Java</h1>
                    </div>
                    
                    <h3 class="font-bold text-xl mb-3 text-blue-900 border-l-4 border-blue-600 pl-3 bg-blue-50 py-1">1. Practical Significance:</h3>
                    <p class="text-gray-700 mb-6 leading-relaxed">Constructor overloading is a concept of having more than one constructor with different parameter lists, in such a way so that each constructor performs a different task. They are differentiated by the compiler by the number of parameters in the list and their types.</p>
                    
                    <h3 class="font-bold text-xl mb-3 text-blue-900 border-l-4 border-blue-600 pl-3 bg-blue-50 py-1">2. Relevant Program Outcomes (POs):</h3>
                    <ul class="list-disc list-inside text-gray-700 mb-6 space-y-2">
                        <li><strong>PO1:</strong> Basic knowledge of Object-Oriented paradigms.</li>
                        <li><strong>PO2:</strong> Discipline knowledge of classes, objects, and memory allocation.</li>
                        <li><strong>PO3:</strong> Experiments and practice in writing Java code.</li>
                    </ul>

                    <h3 class="font-bold text-xl mb-3 text-blue-900 border-l-4 border-blue-600 pl-3 bg-blue-50 py-1">3. Source Code:</h3>
                    <div class="bg-gray-900 text-green-400 p-4 rounded-lg mb-6 overflow-x-auto font-mono text-sm shadow-inner border border-gray-800">
<pre><code>class Student {
    int id;
    String name;
    int age;
    
    // Default Constructor
    Student() {
        System.out.println("Default Constructor Called.");
    }
    
    // Parameterized Constructor 1
    Student(int i, String n) {
        id = i;
        name = n;
    }
    
    // Parameterized Constructor 2
    Student(int i, String n, int a) {
        id = i;
        name = n;
        age = a;
    }
    
    void display() {
        System.out.println(id + " " + name + " " + age);
    }
    
    public static void main(String args[]) {
        Student s1 = new Student(111, "Karan");
        Student s2 = new Student(222, "Aryan", 25);
        s1.display();
        s2.display();
    }
}</code></pre>
                    </div>

                    <h3 class="font-bold text-xl mb-3 text-blue-900 border-l-4 border-blue-600 pl-3 bg-blue-50 py-1">4. Output:</h3>
                    <div class="bg-black text-white p-4 rounded-lg mb-6 font-mono text-sm border border-gray-800 shadow-inner">
<pre><code>Default Constructor Called.
111 Karan 0
222 Aryan 25
Process finished with exit code 0</code></pre>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
"""
inject_main_content('lab-manuals.html', lab_content)
