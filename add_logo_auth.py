import os
import re

auth_css = """        .auth-logo-header {
            position: fixed;
            top: 25px;
            left: 25px;
            z-index: 1000;
        }

        .auth-logo {
            display: flex;
            align-items: center;
            gap: 12px;
            text-decoration: none;
            color: white;
            font-weight: 700;
            font-size: 1.4rem;
            letter-spacing: -0.5px;
            transition: all 0.3s ease;
        }

        .nav-logo-img {
            height: 40px;
            width: auto;
            border-radius: 8px;
            filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.2));
            transition: all 0.3s ease;
        }

        .auth-logo:hover .nav-logo-img {
            transform: scale(1.1) rotate(-5deg);
            filter: drop-shadow(0 0 15px rgba(18, 194, 233, 0.4));
        }

        body.light-mode .auth-logo {
            color: #333;
        }"""

auth_html = """    <div class="auth-logo-header">
        <a href="index.html" class="auth-logo">
            <img src="logo.jpg" alt="Roobiee Tech Logo" class="nav-logo-img">
            <span>Roobiee Tech</span>
        </a>
    </div>"""

auth_files = [
    "login.html",
    "signup.html",
    "forgot-password.html",
    "reset-password.html"
]

for filename in auth_files:
    if not os.path.exists(filename):
        print(f"Skipping {filename} - not found.")
        continue
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Update CSS
    content = content.replace("</style>", auth_css + "\n    </style>")
    print(f"Updated CSS in {filename}")

    # Update HTML
    content = content.replace("<body>", "<body>\n" + auth_html)
    print(f"Updated HTML in {filename}")

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("Auth pages update complete.")
