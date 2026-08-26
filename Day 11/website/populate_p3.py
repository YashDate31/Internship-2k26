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

# 5. Question Papers Dummy Data
papers_content = """
<div class="max-w-6xl mx-auto px-4 py-12">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
            <h1 class="text-3xl font-bold text-gray-900">Question Papers Archives</h1>
            <p class="text-gray-500 mt-2">Filter and download previous MSBTE exam papers. (Data populated up to Winter 2024)</p>
        </div>
        <div class="mt-4 md:mt-0 flex flex-wrap gap-3">
            <select class="border border-gray-300 rounded-lg px-4 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium">
                <option>All Branches</option>
                <option selected>Computer Engineering</option>
                <option>Mechanical Engineering</option>
            </select>
            <div class="flex bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                <input type="text" placeholder="Search subject code (e.g. 22412)" class="px-4 py-2 border-none outline-none text-sm w-56">
                <button class="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"><i data-lucide="search" class="w-4 h-4"></i></button>
            </div>
        </div>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider border-b border-gray-200">
                        <th class="px-6 py-4 font-semibold">Subject</th>
                        <th class="px-6 py-4 font-semibold">Code</th>
                        <th class="px-6 py-4 font-semibold">Semester</th>
                        <th class="px-6 py-4 font-semibold">Season</th>
                        <th class="px-6 py-4 font-semibold text-right">Action</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    <tr class="hover:bg-blue-50/50 transition-colors group">
                        <td class="px-6 py-4 font-bold text-gray-900">Java Programming</td><td class="px-6 py-4 text-gray-500 font-mono">22412</td><td class="px-6 py-4 font-medium">Sem 4</td>
                        <td class="px-6 py-4"><span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">Winter 2024</span></td>
                        <td class="px-6 py-4 text-right"><button class="text-blue-600 hover:text-white border border-blue-600 hover:bg-blue-600 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all shadow-sm">Download</button></td>
                    </tr>
                    <tr class="hover:bg-blue-50/50 transition-colors group">
                        <td class="px-6 py-4 font-bold text-gray-900">Java Programming</td><td class="px-6 py-4 text-gray-500 font-mono">22412</td><td class="px-6 py-4 font-medium">Sem 4</td>
                        <td class="px-6 py-4"><span class="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded">Summer 2024</span></td>
                        <td class="px-6 py-4 text-right"><button class="text-blue-600 hover:text-white border border-blue-600 hover:bg-blue-600 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all shadow-sm">Download</button></td>
                    </tr>
                    <tr class="hover:bg-blue-50/50 transition-colors group">
                        <td class="px-6 py-4 font-bold text-gray-900">Operating Systems</td><td class="px-6 py-4 text-gray-500 font-mono">22516</td><td class="px-6 py-4 font-medium">Sem 5</td>
                        <td class="px-6 py-4"><span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">Winter 2024</span></td>
                        <td class="px-6 py-4 text-right"><button class="text-blue-600 hover:text-white border border-blue-600 hover:bg-blue-600 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all shadow-sm">Download</button></td>
                    </tr>
                    <tr class="hover:bg-blue-50/50 transition-colors group">
                        <td class="px-6 py-4 font-bold text-gray-900">Operating Systems</td><td class="px-6 py-4 text-gray-500 font-mono">22516</td><td class="px-6 py-4 font-medium">Sem 5</td>
                        <td class="px-6 py-4"><span class="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded">Summer 2024</span></td>
                        <td class="px-6 py-4 text-right"><button class="text-blue-600 hover:text-white border border-blue-600 hover:bg-blue-600 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all shadow-sm">Download</button></td>
                    </tr>
                    <tr class="hover:bg-blue-50/50 transition-colors group">
                        <td class="px-6 py-4 font-bold text-gray-900">Software Engineering</td><td class="px-6 py-4 text-gray-500 font-mono">22413</td><td class="px-6 py-4 font-medium">Sem 4</td>
                        <td class="px-6 py-4"><span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">Winter 2024</span></td>
                        <td class="px-6 py-4 text-right"><button class="text-blue-600 hover:text-white border border-blue-600 hover:bg-blue-600 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all shadow-sm">Download</button></td>
                    </tr>
                    <tr class="hover:bg-blue-50/50 transition-colors group">
                        <td class="px-6 py-4 font-bold text-gray-900">Software Engineering</td><td class="px-6 py-4 text-gray-500 font-mono">22413</td><td class="px-6 py-4 font-medium">Sem 4</td>
                        <td class="px-6 py-4"><span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded">Winter 2023</span></td>
                        <td class="px-6 py-4 text-right"><button class="text-blue-600 hover:text-white border border-blue-600 hover:bg-blue-600 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all shadow-sm">Download</button></td>
                    </tr>
                    <tr class="hover:bg-blue-50/50 transition-colors group">
                        <td class="px-6 py-4 font-bold text-gray-900">Data Structures</td><td class="px-6 py-4 text-gray-500 font-mono">22317</td><td class="px-6 py-4 font-medium">Sem 3</td>
                        <td class="px-6 py-4"><span class="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded">Summer 2024</span></td>
                        <td class="px-6 py-4 text-right"><button class="text-blue-600 hover:text-white border border-blue-600 hover:bg-blue-600 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all shadow-sm">Download</button></td>
                    </tr>
                    <tr class="hover:bg-blue-50/50 transition-colors group">
                        <td class="px-6 py-4 font-bold text-gray-900">Computer Networks</td><td class="px-6 py-4 text-gray-500 font-mono">22417</td><td class="px-6 py-4 font-medium">Sem 4</td>
                        <td class="px-6 py-4"><span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">Winter 2024</span></td>
                        <td class="px-6 py-4 text-right"><button class="text-blue-600 hover:text-white border border-blue-600 hover:bg-blue-600 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all shadow-sm">Download</button></td>
                    </tr>
                    <tr class="hover:bg-blue-50/50 transition-colors group">
                        <td class="px-6 py-4 font-bold text-gray-900">Computer Networks</td><td class="px-6 py-4 text-gray-500 font-mono">22417</td><td class="px-6 py-4 font-medium">Sem 4</td>
                        <td class="px-6 py-4"><span class="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded">Summer 2024</span></td>
                        <td class="px-6 py-4 text-right"><button class="text-blue-600 hover:text-white border border-blue-600 hover:bg-blue-600 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all shadow-sm">Download</button></td>
                    </tr>
                    <tr class="hover:bg-blue-50/50 transition-colors group">
                        <td class="px-6 py-4 font-bold text-gray-900">Client Side Scripting</td><td class="px-6 py-4 text-gray-500 font-mono">22519</td><td class="px-6 py-4 font-medium">Sem 5</td>
                        <td class="px-6 py-4"><span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">Winter 2024</span></td>
                        <td class="px-6 py-4 text-right"><button class="text-blue-600 hover:text-white border border-blue-600 hover:bg-blue-600 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all shadow-sm">Download</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            <span class="text-sm text-gray-600">Showing 10 of 145 question papers</span>
            <div class="flex space-x-2">
                <button class="px-3 py-1 bg-white border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">Previous</button>
                <button class="px-3 py-1 bg-blue-600 text-white rounded text-sm font-bold shadow-sm">1</button>
                <button class="px-3 py-1 bg-white border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">2</button>
                <button class="px-3 py-1 bg-white border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">3</button>
                <span class="px-2 text-gray-500">...</span>
                <button class="px-3 py-1 bg-white border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">Next</button>
            </div>
        </div>
    </div>
</div>
"""
inject_main_content('question_papers.html', papers_content)

print("Populated papers")
