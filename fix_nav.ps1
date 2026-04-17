$files = @("embedded-systems.html","workshop.html","digital-marketing.html","final-year-projects.html","internship.html","website-design.html","courses.html")

# Exact nav HTML from index.html (links all point back to index.html)
$newNav = @'
        <!-- Navigation Header -->
        <nav>
            <div class="nav-container">
                <a href="index.html" class="nav-logo">Roobiee Tech</a>
                <div class="nav-links">
                    <a href="index.html">Home</a>
                    <a href="index.html#about">About</a>
                    <a href="index.html#servicesTimeline">Capabilities</a>
                    <a href="index.html#contact">Contact</a>
                </div>
                <div class="nav-auth" id="navAuth">
                    <button class="theme-toggle" id="themeToggle" title="Switch theme">
                        <svg id="themeIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                    </button>
                    <a href="#" class="auth-btn login-btn" id="navLoginBtn">Login</a>
                    <a href="#" class="auth-btn signup-btn" id="navSignupBtn">Sign Up</a>
                </div>
            </div>
        </nav>
'@

# Nav CSS copied exactly from index.html
$navCSS = @'
        /* Navigation Header */
        nav { position: fixed; top: 0; left: 0; width: 100%; padding: 25px 0; display: flex; justify-content: center; z-index: 10; }
        .nav-container { display: flex; justify-content: space-between; align-items: center; width: 90%; max-width: 1200px; background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); border-radius: 50px; padding: 12px 35px; border: 1px solid rgba(255, 255, 255, 0.2); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); }
        .nav-logo { color: white; font-weight: 700; font-size: 1.6rem; text-decoration: none; letter-spacing: -1px; }
        .nav-links { display: flex; gap: 35px; }
        .nav-links a { color: white; text-decoration: none; font-weight: 600; font-size: 1rem; opacity: 0.8; transition: all 0.3s ease; }
        .nav-links a:hover { opacity: 1; transform: translateY(-2px); text-shadow: 0 0 10px rgba(255, 255, 255, 0.5); }
        .nav-auth { display: flex; gap: 15px; align-items: center; }
        .auth-btn { color: white; text-decoration: none; font-weight: 600; font-size: 0.95rem; padding: 10px 24px; border-radius: 30px; transition: all 0.3s ease; }
        .login-btn { border: 1px solid rgba(255, 255, 255, 0.4); background: none; cursor: pointer; font-family: inherit; }
        .login-btn:hover { background: rgba(255, 255, 255, 0.1); border-color: white; }
        .signup-btn { background: white; color: #12c2e9; box-shadow: 0 4px 15px rgba(255, 255, 255, 0.25); border: none; cursor: pointer; font-family: inherit; }
        .signup-btn:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(255, 255, 255, 0.4); }
        .theme-toggle { background: none; border: 1px solid rgba(255, 255, 255, 0.35); border-radius: 50%; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s ease; color: white; flex-shrink: 0; }
        .theme-toggle:hover { background: rgba(255, 255, 255, 0.15); transform: rotate(20deg) scale(1.1); }

        /* Light mode nav overrides */
        body.light-mode .nav-container { background: rgba(255,255,255,0.72); backdrop-filter: blur(24px); border-color: rgba(255,255,255,0.9); box-shadow: 0 4px 24px rgba(100,120,200,0.12); }
        body.light-mode .nav-logo { color: #000; }
        body.light-mode .nav-links a { color: #111; }
        body.light-mode .login-btn { border-color: rgba(0,0,0,0.3); color: #111; }
        body.light-mode .signup-btn { background: #12c2e9; color: #fff; }
        body.light-mode .theme-toggle { border-color: rgba(0,0,0,0.3); color: #111; }
'@

# Theme toggle JS (index-style: updates icon + saves to localStorage)
$themeJS = @'
        // ======= THEME TOGGLE (index-style) =======
        const moonSVG = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
        const sunSVG = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
        let isDark = localStorage.getItem('theme') !== 'light';
        function applyTheme() {
            document.body.classList.toggle('light-mode', !isDark);
            const icon = document.getElementById('themeIcon');
            if (icon) icon.innerHTML = isDark ? moonSVG : sunSVG;
        }
        applyTheme();
        document.addEventListener('click', function(e) {
            if (e.target.closest && e.target.closest('#themeToggle')) {
                isDark = !isDark;
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
                applyTheme();
            }
        });
'@

foreach ($file in $files) {
    $path = "d:\trial web\$file"
    $content = Get-Content -Path $path -Raw -Encoding UTF8

    # 1. Replace entire <nav>...</nav> block
    $content = $content -replace '(?s)<nav>.*?</nav>', $newNav.Trim()

    # 2. Remove old nav CSS blocks (nav, nav-container, nav-logo, nav-links, nav-auth, auth-btn, login-btn, signup-btn, theme-toggle)
    $content = $content -replace '(?s)/\* ={3,} NAV ={3,} \*\/.*?\n\n', ''
    $content = $content -replace '(?m)^\s*(nav|\.nav-container|\.nav-logo|\.nav-links|\.nav-auth|\.auth-btn|\.login-btn|\.signup-btn|\.theme-toggle)\s*\{[^}]+\}\r?\n', ''
    $content = $content -replace '(?m)^\s*(\.nav-links a|\.nav-links a:hover|\.login-btn:hover|\.signup-btn:hover|\.theme-toggle:hover)\s*\{[^}]+\}\r?\n', ''
    $content = $content -replace '(?m)^\s*body\.light-mode\s*(\.nav-container|\.nav-logo|\.nav-links a|\.login-btn|\.signup-btn|\.theme-toggle)\s*\{[^}]+\}\r?\n', ''
    # Remove the themeToggleWrapper div if present
    $content = $content -replace '(?s)<div id="themeToggleWrapper"[^>]*>.*?</div>\s*\r?\n\s*(<div class="nav-auth")', '$1'

    # 3. Inject new nav CSS right before </style>
    $content = $content -replace '(</style>)', $navCSS + "`r`n        `$1"

    # 4. Remove old theme JS (isDark / applyTheme / attachThemeToggle blocks + document delegation)
    $content = $content -replace '(?s)// ={3,} THEME TOGGLE.*?applyTheme\(\);\r?\n', ''
    $content = $content -replace '(?s)// Theme toggle via document delegation.*?function attachThemeToggle\(\) \{[^}]*\}\r?\n', ''
    $content = $content -replace '(?m)^\s*let isDark = .*\r?\n', ''
    $content = $content -replace '(?m)^\s*const applyTheme = .*\r?\n', ''
    $content = $content -replace '(?m)^\s*applyTheme\(\);\r?\n', ''
    $content = $content -replace '(?m)^\s*themeToggle\.addEventListener.*\r?\n', ''
    $content = $content -replace '(?m)^\s*function attachThemeToggle.*\r?\n', ''

    # 5. Also remove themeToggleHTML capture line
    $content = $content -replace '(?m)^\s*const themeToggleHTML = .*\r?\n', ''

    # 6. Update onAuthStateChanged to NOT include themeToggleHTML and properly wire login/logout buttons
    $content = $content -replace '\$\{themeToggleHTML\}\r?\n\s*', ''
    $content = $content -replace '\$\{themeToggleHTML\}', ''

    # 7. Inject theme JS just before </script> at end
    $content = $content -replace '(// ={3,} SCROLL REVEAL)', $themeJS + "`r`n`r`n        `$1"

    Set-Content -Path $path -Value $content -Encoding UTF8
    Write-Host "Done: $file"
}
Write-Host "All complete!"
