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

# 6. Blog Dummy Data
blog_content = """
<section class="py-16 bg-white min-h-screen">
    <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-16">
            <h1 class="text-4xl font-extrabold text-gray-900 mb-4">College Sahayak Blog</h1>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">Insights, study tips, internships, and updates for diploma students.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Blog Card 1 -->
            <article class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div class="h-48 bg-blue-100 flex items-center justify-center">
                    <i data-lucide="book-open" class="w-16 h-16 text-blue-500 opacity-50"></i>
                </div>
                <div class="p-6">
                    <span class="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2 block">Study Tips</span>
                    <h2 class="text-xl font-bold text-gray-900 mb-3 leading-tight">How to Score 90%+ in MSBTE Board Exams</h2>
                    <p class="text-gray-600 mb-4 line-clamp-3">A comprehensive guide on time management, priority subjects, and past paper analysis to ensure you score top marks in MSBTE.</p>
                    <div class="flex items-center text-sm text-gray-500 font-medium">
                        <i data-lucide="calendar" class="w-4 h-4 mr-2"></i> Feb 12, 2025
                    </div>
                </div>
            </article>
            
            <!-- Blog Card 2 -->
            <article class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div class="h-48 bg-purple-100 flex items-center justify-center">
                    <i data-lucide="briefcase" class="w-16 h-16 text-purple-500 opacity-50"></i>
                </div>
                <div class="p-6">
                    <span class="text-xs font-bold tracking-widest text-purple-600 uppercase mb-2 block">Career</span>
                    <h2 class="text-xl font-bold text-gray-900 mb-3 leading-tight">Top 5 Programming Languages to Learn After Polytechnic</h2>
                    <p class="text-gray-600 mb-4 line-clamp-3">Future-proof your career by picking up these highly demanded programming languages that tech companies are actively looking for.</p>
                    <div class="flex items-center text-sm text-gray-500 font-medium">
                        <i data-lucide="calendar" class="w-4 h-4 mr-2"></i> Feb 08, 2025
                    </div>
                </div>
            </article>
            
            <!-- Blog Card 3 -->
            <article class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div class="h-48 bg-green-100 flex items-center justify-center">
                    <i data-lucide="cpu" class="w-16 h-16 text-green-500 opacity-50"></i>
                </div>
                <div class="p-6">
                    <span class="text-xs font-bold tracking-widest text-green-600 uppercase mb-2 block">Projects</span>
                    <h2 class="text-xl font-bold text-gray-900 mb-3 leading-tight">10 Best Micro-Project Ideas for Computer Engineers</h2>
                    <p class="text-gray-600 mb-4 line-clamp-3">Stuck on what to build for your final semester? Here are 10 unique and impactful project ideas that will impress your professors.</p>
                    <div class="flex items-center text-sm text-gray-500 font-medium">
                        <i data-lucide="calendar" class="w-4 h-4 mr-2"></i> Jan 29, 2025
                    </div>
                </div>
            </article>
            
            <!-- Blog Card 4 -->
            <article class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div class="h-48 bg-orange-100 flex items-center justify-center">
                    <i data-lucide="file-text" class="w-16 h-16 text-orange-500 opacity-50"></i>
                </div>
                <div class="p-6">
                    <span class="text-xs font-bold tracking-widest text-orange-600 uppercase mb-2 block">Resume</span>
                    <h2 class="text-xl font-bold text-gray-900 mb-3 leading-tight">Resume Mistakes Diploma Students Make</h2>
                    <p class="text-gray-600 mb-4 line-clamp-3">Avoid these common resume pitfalls when applying for jobs or Direct Second Year (DSE) engineering admissions.</p>
                    <div class="flex items-center text-sm text-gray-500 font-medium">
                        <i data-lucide="calendar" class="w-4 h-4 mr-2"></i> Jan 15, 2025
                    </div>
                </div>
            </article>

            <!-- Blog Card 5 -->
            <article class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div class="h-48 bg-pink-100 flex items-center justify-center">
                    <i data-lucide="building" class="w-16 h-16 text-pink-500 opacity-50"></i>
                </div>
                <div class="p-6">
                    <span class="text-xs font-bold tracking-widest text-pink-600 uppercase mb-2 block">Internships</span>
                    <h2 class="text-xl font-bold text-gray-900 mb-3 leading-tight">How to Get a Paid Internship in 2nd Year</h2>
                    <p class="text-gray-600 mb-4 line-clamp-3">A step-by-step guide to securing paid internships while still completing your diploma. Build your experience early!</p>
                    <div class="flex items-center text-sm text-gray-500 font-medium">
                        <i data-lucide="calendar" class="w-4 h-4 mr-2"></i> Jan 02, 2025
                    </div>
                </div>
            </article>
        </div>
    </div>
</section>
"""
inject_main_content('blog.html', blog_content)

print("Populated blog")
