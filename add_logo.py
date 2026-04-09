import os
import re

logo_css = """        .nav-logo {
            color: white;
            font-weight: 700;
            font-size: 1.6rem;
            text-decoration: none;
            letter-spacing: -1px;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .nav-logo-img {
            height: 45px;
            width: auto;
            border-radius: 8px;
            filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.2));
            transition: all 0.3s ease;
        }

        .nav-logo:hover .nav-logo-img {
            transform: scale(1.1) rotate(-5deg);
            filter: drop-shadow(0 0 15px rgba(18, 194, 233, 0.4));
        }"""

html_files = [
    "courses.html",
    "digital-marketing.html",
    "embedded-systems.html",
    "final-year-projects.html",
    "internship.html",
    "services.html",
    "website-design.html",
    "workshop.html"
]

for filename in html_files:
    if not os.path.exists(filename):
        print(f"Skipping {filename} - not found.")
        continue
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Update CSS
    # Look for .nav-logo { ... } and replace it
    css_pattern = re.compile(r'\.nav-logo\s*\{[^}]+\}', re.MULTILINE)
    if css_pattern.search(content):
        content = css_pattern.sub(logo_css, content)
        print(f"Updated CSS in {filename}")
    else:
        print(f"Warning: .nav-logo CSS not found in {filename}")

    # Update HTML
    # Look for <a href="..." class="nav-logo">Roobiee Tech</a>
    html_pattern = re.compile(r'<a href="[^"]*" class="nav-logo">Roobiee Tech</a>')
    if html_pattern.search(content):
        replacement = r'<a href="index.html" class="nav-logo">\n                    <img src="logo.jpg" alt="Roobiee Tech Logo" class="nav-logo-img">\n                    Roobiee Tech\n                </a>'
        content = html_pattern.sub(replacement, content)
        print(f"Updated HTML in {filename}")
    else:
        # Try a more generic version if Roobiee Tech isn't exact
        html_pattern2 = re.compile(r'<a[^>]+class="nav-logo">Roobiee Tech</a>')
        if html_pattern2.search(content):
            replacement = r'<a href="index.html" class="nav-logo">\n                    <img src="logo.jpg" alt="Roobiee Tech Logo" class="nav-logo-img">\n                    Roobiee Tech\n                </a>'
            content = html_pattern2.sub(replacement, content)
            print(f"Updated HTML (generic pattern) in {filename}")
        else:
             print(f"Warning: nav-logo HTML tag not found in {filename}")

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("Batch update complete.")
