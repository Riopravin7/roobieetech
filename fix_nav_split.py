import os
import re

# Navigation Bar Centering Strategy (Split)
nav_css_split = """        .nav-container {
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
            gap: 15px;
        }

        .nav-links-left, .nav-links-right {
            display: flex;
            align-items: center;
            gap: 25px;
            flex: 1;
        }

        .nav-links-right {
            justify-content: flex-end;
        }

        .nav-links-left a, .nav-links-right a {
            color: white;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.95rem;
            opacity: 0.8;
            transition: all 0.3s ease;
            white-space: nowrap;
        }

        .nav-links-left a:hover, .nav-links-right a:hover {
            opacity: 1;
            transform: translateY(-2px);
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        .nav-logo {
            flex: 0 0 auto;
            color: white;
            font-weight: 700;
            font-size: 1.5rem;
            text-decoration: none;
            letter-spacing: -1px;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: all 0.3s ease;
        }

        .nav-logo-img {
            height: 48px; /* High quality size */
            width: auto;
            border-radius: 10px;
            filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.2));
            transition: all 0.3s ease;
            margin-top: 8px; /* Slightly down */
        }

        .nav-logo:hover .nav-logo-img {
            transform: scale(1.1) rotate(-3deg);
            filter: drop-shadow(0 0 18px rgba(18, 194, 233, 0.4));
        }

        .nav-auth {
            display: flex;
            gap: 12px;
            align-items: center;
            margin-left: 10px;
        }"""

nav_html_split = """                <div class="nav-links-left">
                    <a href="index.html">Home</a>
                    <a href="index.html#about">About</a>
                </div>
                <a href="index.html" class="nav-logo">
                    <img src="logo.jpg" alt="Roobiee Tech Logo" class="nav-logo-img">
                    Roobiee Tech
                </a>
                <div class="nav-links-right">
                    <a href="index.html#servicesTimeline">Capabilities</a>
                    <a href="index.html#contact">Contact</a>
                    <div class="nav-auth">"""

auth_css_centered = """        .auth-logo-header {
            position: fixed;
            top: 40px; /* Slightly down */
            left: 50%;
            transform: translateX(-50%);
            z-index: 1000;
            text-align: center;
        }

        .auth-logo {
            display: flex;
            flex-direction: column; /* stacked look for auth pages */
            align-items: center;
            gap: 8px;
            text-decoration: none;
            color: white;
            font-weight: 700;
            font-size: 1.6rem;
            letter-spacing: -0.5px;
            transition: all 0.3s ease;
        }

        .nav-logo-img {
            height: 55px; /* larger for auth focus */
            width: auto;
            border-radius: 12px;
            filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.3));
            transition: all 0.3s ease;
            margin-bottom: 5px;
        }

        body.light-mode .auth-logo {
            color: #333;
        }"""

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

auth_pages = [
    "login.html",
    "signup.html",
    "forgot-password.html",
    "reset-password.html"
]

# Process Main Pages
for filename in main_pages:
    if not os.path.exists(filename): continue
    with open(filename, 'r', encoding='utf-8') as f: content = f.read()
    
    # Update CSS
    content = re.sub(r'\.nav-container \{.*?\.nav-auth \{.*?\}', nav_css_split, content, flags=re.DOTALL)
    # Update HTML
    content = re.sub(r'<div class="nav-container">.*?<div class="nav-auth">', '<div class="nav-container">\n' + nav_html_split, content, flags=re.DOTALL)
    
    with open(filename, 'w', encoding='utf-8') as f: f.write(content)
    print(f"Fixed split nav in {filename}")

# Process Auth Pages
for filename in auth_pages:
    if not os.path.exists(filename): continue
    with open(filename, 'r', encoding='utf-8') as f: content = f.read()
    
    # Update CSS
    content = re.sub(r'\.auth-logo-header \{.*?\}', auth_css_centered, content, flags=re.DOTALL)
    content = re.sub(r'\.nav-logo-img \{.*?\}', '', content, flags=re.DOTALL) # remove duplicate img class

    with open(filename, 'w', encoding='utf-8') as f: f.write(content)
    print(f"Centered logo auth in {filename}")

print("Split Navigation Fix Complete.")
