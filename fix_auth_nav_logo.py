import os
import re

auth_pages = [
    "login.html",
    "signup.html",
    "forgot-password.html",
    "reset-password.html"
]

auth_css_internal = """        .auth-logo-internal {
            display: block;
            text-align: center;
            margin-bottom: 30px;
            text-decoration: none;
            transition: transform 0.3s ease;
        }

        .auth-logo-internal:hover {
            transform: scale(1.05);
        }

        .auth-logo-img {
            height: 90px;
            width: auto;
            border-radius: 15px;
            filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2));
            background: white; /* ensures the logo background looks like a clean card element */
            padding: 8px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        body.light-mode .auth-logo-img {
            filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.1));
            border-color: rgba(0, 0, 0, 0.05);
        }"""

for filename in auth_pages:
    if not os.path.exists(filename): continue
    with open(filename, 'r', encoding='utf-8') as f: content = f.read()
    
    # 1. Remove old auth logo from body
    content = re.sub(r'<div class="auth-logo-header">.*?</div>', '', content, flags=re.DOTALL)
    
    # 2. Add new CSS
    content = re.sub(r'\.auth-logo-header \{.*?\}', auth_css_internal, content, flags=re.DOTALL)
    # Remove older leftover .auth-logo or .nav-logo-img if they are standalone
    content = re.sub(r'\.auth-logo \{.*?\}', '', content, flags=re.DOTALL)

    # 3. Insert logo inside the card
    # For login: <div class="login-card"> <h1>Login</h1>
    # For signup: <div class="signup-card"> <h1>Create Account</h1>
    # For forgot: <div class="forgot-card"> <h1>Reset Password</h1> (or similar)
    card_pattern = r'(<div class="[^"]*-card">)'
    logo_html = r'\1\n            <a href="index.html" class="auth-logo-internal">\n                <img src="logo.jpg" alt="Roobiee Tech Logo" class="auth-logo-img">\n            </a>'
    
    if re.search(card_pattern, content):
        content = re.sub(card_pattern, logo_html, content)
    
    with open(filename, 'w', encoding='utf-8') as f: f.write(content)
    print(f"Polished auth layout in {filename}")

print("Auth Page Polish Complete.")
