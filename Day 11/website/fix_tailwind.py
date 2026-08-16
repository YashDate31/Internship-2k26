import os
import glob

base_dir = r"c:\Users\Yash\Downloads\college_sahayak-main\website"
html_files = glob.glob(os.path.join(base_dir, "*.html"))

tailwind_script = '<script src="https://cdn.tailwindcss.com"></script>\n'

for file_path in html_files:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    if "cdn.tailwindcss.com" not in content:
        # Insert before </head>
        content = content.replace("</head>", tailwind_script + "</head>")
        
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Added Tailwind CDN to {os.path.basename(file_path)}")
    else:
        print(f"Tailwind CDN already in {os.path.basename(file_path)}")
