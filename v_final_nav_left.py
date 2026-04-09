import os
import re

# Navigation Bar: Logo Left, Links Unified
nav_css_unified = """        .nav-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 95%;
            max-width: 1200px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            border-radius: 50px;
            padding: 10px 30px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            gap: 20px;
        }

        .nav-logo {
            display: flex;
            align-items: center;
            gap: 12px;
            text-decoration: none;
            color: white;
            font-weight: 700;
            font-size: 1.6rem;
            letter-spacing: -1px;
            transition: all 0.3s ease;
            flex-shrink: 0;
        }

        .nav-logo-img {
            height: 48px; /* High quality size */
            width: auto;
            border-radius: 10px;
            filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.2));
            transition: all 0.3s ease;
            margin-top: 6px; /* Slightly down */
        }

        .nav-logo:hover .nav-logo-img {
            transform: scale(1.1) rotate(-3deg);
            filter: drop-shadow(0 0 18px rgba(18, 194, 233, 0.4));
        }

        .nav-links {
            display: flex;
            align-items: center;
            gap: 25px;
            margin-left: 20px;
            flex-grow: 1;
        }

        .nav-links a {
            color: white;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.95rem;
            opacity: 0.8;
            transition: all 0.3s ease;
            white-space: nowrap;
        }

        .nav-links a:hover {
            opacity: 1;
            transform: translateY(-2px);
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        .nav-auth {
            display: flex;
            gap: 12px;
            align-items: center;
            flex-shrink: 0;
        }"""

nav_html_unified = """                <a href="index.html" class="nav-logo">
                    <img src="logo.jpg" alt="Roobiee Tech Logo" class="nav-logo-img">
                    Roobiee Tech
                </a>
                <div class="nav-links">
                    <a href="index.html">Home</a>
                    <a href="index.html#about">About</a>
                    <a href="index.html#servicesTimeline">Capabilities</a>
                    <a href="index.html#contact">Contact</a>
                </div>
                <div class="nav-auth">"""

main_pages = [
    "index.html",
    "courses.html",
    "digital-marketing.html",
    "embedded-systems.html",
    "final-year-projects.html",
    "internship.html",
    "services.html",
    "website-design.html",
    "workshop.html"
]

for filename in main_pages:
    if not os.path.exists(filename): continue
    with open(filename, 'r', encoding='utf-8') as f: content = f.read()
    
    # Re-apply CSS: Match the entire custom block we created earlier
    # We look for the start of the nav container styling and replace it with our unified version.
    # Note: Using simpler regex for better matching against various states
    content = re.sub(r'\.nav-container \{.*?\.nav-auth \{.*?\}', nav_css_unified, content, flags=re.DOTALL)
    # Re-apply HTML: Replace the entire nav contents
    content = re.sub(r'<div class="nav-container">.*?<div class="nav-auth">', '<div class="nav-container">\n' + nav_html_unified, content, flags=re.DOTALL)
    
    with open(filename, 'w', encoding='utf-8') as f: f.write(content)
    print(f"Re-unified nav in {filename}")

print("Final Logo Left Layout Fix Complete.")
